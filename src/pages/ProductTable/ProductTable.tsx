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
    const [deleteProduct] = useDeleteProductMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sortByPrice, setSortByPrice] = useState<boolean>(false);
    const [cart, setCart] = useState<TProduct[]>([]);
    const navigate = useNavigate();
    console.log(cart);

    const [editFormData, setEditFormData] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
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
            item.category.some((cat) => cat.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const itemsPerPage = 5;

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.id === "category") {
            setEditFormData({
                ...editFormData,
                category: e.target.value.split(",").map(cat => cat.trim()),
            });
        } else {
            setEditFormData({
                ...editFormData,
                [e.target.id]: e.target.value,
            });
        }
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

        let image = "";
        if (editFormData.imageFile) {
            image = await uploadImageToImgbb(editFormData.imageFile);
        }

        if (!image && editFormData.imageFile) {
            setUploading(false);
            return;
        }

        const updatedProductData = {
            name: editFormData.name,
            description: editFormData.description,
            price: Number(editFormData.price),
            quantity: Number(editFormData.quantity),
            category: editFormData.category,
            image: image || editFormData.imageFile,
        };
        

        try {
            if (selectedProductId) {
                const res = await updateProduct({
                    id: selectedProductId,
                    data: updatedProductData
                }).unwrap();
                console.log("Update response:", res);
                toast.success("Product updated successfully");
                setSelectedProductId(null);
            }
        } catch (error) {
            console.error("Error updating product,all fields required:", error);
            toast.error(`Failed to update product,all page required: ${error.message}`);
        }
         finally {
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
        if (sortByPrice) {
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

    const toggleSortByPrice = () => {
        setSortByPrice((prev) => !prev);
    };

    const handleDeleteProduct = (_id: string) => {
        Swal.fire({
            title: "Are you sure?",
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
                    console.log(response);
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your product has been deleted.",
                        icon: "success",
                        background: "black",
                        confirmButtonColor: "#d33",
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
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
                    <TableRow className="bg-neutral-950 hover:bg-neutral-900">
                        <TableHead className="text-orange-600 hover:text-orange-500">
                            Product Image
                        </TableHead>
                        <TableHead className="text-orange-600 hover:text-orange-500">
                            Product Name
                        </TableHead>
                        <TableHead className="text-orange-600 hover:text-orange-500">
                            Category
                        </TableHead>
                        <TableHead className="text-orange-600 hover:text-orange-500">
                            Price
                        </TableHead>
                        <TableHead className="text-orange-600 hover:text-orange-500">
                            Quantity
                        </TableHead>
                        <TableHead className="text-orange-600 hover:text-orange-500">
                            Actions
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentData.map((product: TProduct) => (
                        <TableRow key={product._id} className="hover:bg-neutral-950">
                            <TableCell>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-16 h-16 object-cover rounded"
                                />
                            </TableCell>
                            <TableCell>{product.name}</TableCell>
                            <TableCell>{product.category.join(", ")}</TableCell>
                            <TableCell>{product.price}</TableCell>
                            <TableCell>{product.quantity}</TableCell>
                            <TableCell className="space-x-2">
                                <Dialog>
                                    <DialogTrigger>
                                        <Button
                                            onClick={() => {
                                                setSelectedProductId(product._id);
                                                setEditFormData({
                                                    name: product.name,
                                                    description: product.description,
                                                    price: String(product.price),
                                                    quantity: String(product.quantity),
                                                    category: product.category,
                                                    imageFile: null,
                                                });
                                            }}
                                            className="bg-black text-orange-500 hover:bg-orange-500 hover:text-black p-2"
                                        >
                                            <CiEdit />
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="bg-black border border-orange-500 text-orange-500">
                                        <DialogHeader>
                                            <h2>Edit Product</h2>
                                        </DialogHeader>
                                        <form>
                                            <Label htmlFor="name">Name</Label>
                                            <Input
                                                type="text"
                                                id="name"
                                                value={editFormData.name}
                                                onChange={handleEditInputChange}
                                                className="w-full mb-2"
                                            />
                                            <Label htmlFor="description">Description</Label>
                                            <Input
                                                type="text"
                                                id="description"
                                                value={editFormData.description}
                                                onChange={handleEditInputChange}
                                                className="w-full mb-2"
                                            />
                                            <Label htmlFor="price">Price</Label>
                                            <Input
                                                type="number"
                                                id="price"
                                                value={editFormData.price}
                                                onChange={handleEditInputChange}
                                                className="w-full mb-2"
                                            />
                                            <Label htmlFor="quantity">Quantity</Label>
                                            <Input
                                                type="number"
                                                id="quantity"
                                                value={editFormData.quantity}
                                                onChange={handleEditInputChange}
                                                className="w-full mb-2"
                                            />
                                            <Label htmlFor="category">Categories (comma-separated)</Label>
                                            <Input
                                                type="text"
                                                id="category"
                                                value={editFormData.category.join(", ")}
                                                onChange={handleEditInputChange}
                                                className="w-full mb-2"
                                            />
                                            <Label htmlFor="image">Image</Label>
                                            <Input
                                                type="file"
                                                id="image"
                                                onChange={handleFileChange}
                                                className="w-full mb-2"
                                            />
                                        </form>
                                        <DialogFooter>
                                            <DialogClose>
                                                <Button
                                                    onClick={handleUpdateProduct}
                                                    className="bg-black text-orange-500 hover:bg-orange-500 hover:text-black"
                                                >
                                                    {uploading ? "Updating..." : "Update Product"}
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <Button
                                    onClick={() => handleDeleteProduct(product._id)}
                                    className="bg-black text-orange-500 hover:bg-orange-500 hover:text-black p-2"
                                >
                                    <AiFillDelete />
                                </Button>
                                <Button
                                    onClick={() => handleAddToCart(product)}
                                    className="bg-black text-orange-500 hover:bg-orange-500 hover:text-black p-2"
                                >
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
