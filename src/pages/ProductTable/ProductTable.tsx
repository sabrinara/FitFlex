import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { VscOpenPreview } from "react-icons/vsc";
import { IoCartOutline } from "react-icons/io5";
import { useDeleteProductMutation, useGetProductsQuery, useUpdateProductMutation } from "@/redux/api/api";
import { TProduct } from "@/types";
import Swal from 'sweetalert2';
import { toast } from "sonner";
import Loading from "../shared/Loading";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_upload_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ProductTable = () => {
    const { data, isLoading } = useGetProductsQuery({});
    console.log(data);
    const [deleteProduct] = useDeleteProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortByRating, setSortByRating] = useState<boolean>(false);
    const [sortByPrice, setSortByPrice] = useState<boolean>(false);
    const [cart, setCart] = useState<TProduct[]>([]);
    const navigate = useNavigate();
    const [editFormData, setEditFormData] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        // category array 
        category: [] as string[],
        imageFile: "" || null as File | null,
    });
    const [uploading, setUploading] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen mt-10">
               <Loading />
            </div>
        );
    }

    

    const filteredData = data?.filter(
        (item: TProduct) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.includes(searchTerm.toLowerCase()) 
    );

  

    const itemsPerPage = 5;

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditFormData({
            ...editFormData,
            [e.target.id]: e.target.value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditFormData({
            ...editFormData,
            imageFile: e.target.files ? e.target.files[0] : "" || null as File | null,
        });
    };



    const uploadImageToImgbb = async (file: File) => {
        const imageFormData = new FormData();
        imageFormData.append("image", file);

        try {
            const response = await fetch(image_upload_api, {
                method: "POST",
                body: imageFormData,
            });
            const data = await response.json();
            if (data.success) {
                return data.data.url;
            }
            throw new Error("Image upload failed");
        } catch (error) {
            console.error("Error uploading image:", error);
            return null;
        }
    };

    const handleUpdateProduct = async () => {
        setUploading(true);

        let imageUrl = "";
        if (editFormData.imageFile) {
            imageUrl = await uploadImageToImgbb(editFormData.imageFile);
        }

        if (!imageUrl && editFormData.imageFile) {
            setUploading(false);
            return;
        }

        const updatedProductData = {
            name: editFormData.name,
            description: editFormData.description,
            price: Number(editFormData.price),
            quantity: Number(editFormData.quantity),
            category: editFormData.category,
            imageUrl: imageUrl || editFormData.imageFile,
        };

        try {
            if (selectedProductId) {
                const res = await updateProduct({
                    id: selectedProductId,
                    data: updatedProductData
                }).unwrap();
console.log("res",res)
                toast.success("Product updated successfully");
                setSelectedProductId(null);
            }
        } catch (error) {
            console.error("Error updating product:", error);
            toast.error("Failed to update product");
        } finally {
            setUploading(false);
        }
    };

    const handleAddToCart = (product: TProduct) => {
        const storedCart = localStorage.getItem("cart");
        const cart = storedCart ? JSON.parse(storedCart) : [];

        const existingItem = cart.find((item: TProduct) => item._id === product._id);

        if (existingItem) {
            if (existingItem.quantity < product.quantity) {
                const updatedCart = cart.map((item: TProduct) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                setCart(updatedCart);
            } else {
                toast.error("Maximum quantity reached");
            }
        } else {
            const updatedCart = [...cart, { ...product, quantity: 1 }];
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            setCart(updatedCart);
        }

        navigate("/cart");
    };

 

    const sortedData = [...filteredData].sort((a, b) => {
        if (sortByRating && sortByPrice) {
            return b.rating - a.rating || b.price - a.price;
        } else if (sortByRating) {
            return b.rating - a.rating;
        } else if (sortByPrice) {
            return a.price - b.price;
        }
        return 0;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const handleClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const toggleSortByRating = () => {
        setSortByRating((prev) => !prev);
    };

    const toggleSortByPrice = () => {
        setSortByPrice((prev) => !prev);
    };

    const handleDeleteProduct = (_id: string) => {
        Swal.fire({
            name: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#104229",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
            background: "black",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await deleteProduct(_id).unwrap();
                    Swal.fire({
                        name: "Deleted!",
                        text: "Your product has been deleted.",
                        icon: "success",
                        background: "black",
                    });
                } catch (error) {
                    console.error("Error deleting product:", error);
                    Swal.fire({
                        name: "Error!",
                        text: "There was an issue deleting your product.",
                        icon: "error",
                        background: "black",
                    });
                }
            }
        });
    };

    return (
        <div className="container w-full text-orange-600 ">
            <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 my-4">
                <Link to="/addproduct">
                    <div className="border border-orange-600 px-3 py-2 rounded-none font-semibold hover:bg-orange-600 hover:text-white">
                        <button>Add Products</button>
                    </div>
                </Link>

                <div className="flex my-2 md:my-10 md:ml-40 space-x-4 ">
                   
                    <button
                        onClick={toggleSortByPrice}
                        className={`border border-orange-600 px-3 py-2 rounded-none font-semibold ${sortByPrice ? "bg-orange-600 text-white" : ""}`}
                    >
                        Sort by Price
                    </button>
                </div>
                <div className="flex relative bg-neutral-900 hover:bg-orange-600 hover:text-white">
            <input
              type="text"
              placeholder="Search name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-orange-600 px-3 py-2 rounded-md bg-black pl-10"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-700" />
          </div>
            </div>

            <Table className="">
                <TableHeader className="hover:bg-neutral-950">
                    <TableRow className="bg-neutral-900 hover:bg-neutral-950">
                        <TableHead className="text-left">Name</TableHead>
                        {/* <TableHead className="text-left">Description</TableHead> */}
                        <TableHead className="text-left">Category</TableHead>
                        <TableHead className="text-left">Image</TableHead>
                        <TableHead className="text-left">Price</TableHead>
                        <TableHead className="text-left">Quantity</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentData.map((product: TProduct) => (
                        <TableRow key={product._id}  className="hover:bg-neutral-950">
                            <TableCell>{product.name}</TableCell>
                            {/* <TableCell>{product.description}</TableCell> */}
                            <TableCell>{product.category.join(", ")}</TableCell>
                            <TableCell>
                                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover" />
                            </TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            {/* <TableCell>{product.rating}</TableCell> */}
                            <TableCell className="flex space-x-2">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button
                                            onClick={() => {
                                                setEditFormData({
                                                    name: product.name,
                                                    description: product.description,
                                                    price: product.price.toString(),
                                                    quantity: product.quantity.toString(),
                                                    category: product.category,
                                                    imageFile: null,
                                                });
                                                setSelectedProductId(product._id);
                                            }}
                                        >
                                            <CiEdit />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <h3 className="font-bold">Edit Product</h3>
                                        </DialogHeader>
                                        <div className="space-y-4">
                                            <div>
                                                <Label htmlFor="name">Name</Label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    value={editFormData.name}
                                                    onChange={handleEditInputChange}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="description">Description</Label>
                                                <Input
                                                    id="description"
                                                    type="text"
                                                    value={editFormData.description}
                                                    onChange={handleEditInputChange}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="price">Price</Label>
                                                <Input
                                                    id="price"
                                                    type="number"
                                                    value={editFormData.price}
                                                    onChange={handleEditInputChange}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="quantity">Quantity</Label>
                                                <Input
                                                    id="quantity"
                                                    type="number"
                                                    value={editFormData.quantity}
                                                    onChange={handleEditInputChange}
                                                />
                                            </div>
                                        
                                            <div>
                                                <Label htmlFor="category">Category</Label>
                                                <Input
                                                    id="category"
                                                    type="text"
                                                    value={editFormData.category}
                                                    onChange={handleEditInputChange}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="imageFile">Image</Label>
                                                <Input
                                                    id="imageFile"
                                                    type="file"
                                                    onChange={handleFileChange}
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button onClick={handleUpdateProduct}>Save</Button>
                                            <DialogClose asChild>
                                                <Button variant="outline">Cancel</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <Button onClick={() => handleDeleteProduct(product._id)}>
                                    <AiFillDelete />
                                </Button>
                                <Button onClick={() => handleAddToCart(product)}>
                                    <IoCartOutline />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="my-6 md:my-10 text-orange-600">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious className="hover:bg-orange-600 hover:text-white">
                      {currentPage > 1 && (
                        <PaginationLink onClick={() => handleClick(currentPage - 1)}>
                          Previous
                        </PaginationLink>
                      )}
                    </PaginationPrevious>
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        isActive={currentPage === index + 1}
                        onClick={() => handleClick(index + 1)}
                        className="hover:bg-orange-600 hover:text-white"
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext className="hover:bg-orange-600 hover:text-white">
                      {currentPage < totalPages && (
                        <PaginationLink onClick={() => handleClick(currentPage + 1)}>
                          Next
                        </PaginationLink>
                      )}
                    </PaginationNext>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
        </div>
    );
};

export default ProductTable;
