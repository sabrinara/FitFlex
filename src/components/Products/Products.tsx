import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useGetProductsQuery } from "@/redux/api/api";
import { TProduct } from "@/types";
import { Link, useNavigate } from "react-router-dom";
import Loading from "@/pages/shared/Loading";
import { FaCartPlus, FaSearch } from "react-icons/fa";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "sonner";

const Products = () => {
  const { data, isLoading } = useGetProductsQuery({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortByPrice, setSortByPrice] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [cart, setCart] = useState<TProduct[]>([]);
  const navigate = useNavigate();
  console.log(cart)

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen mt-10">
        <Loading />
      </div>
    );
  }

  // Toggle selected categories
  const toggleCategory = (category: string) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((cat) => cat !== category)
        : [...prevCategories, category]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchTerm("");
    setSortByPrice(false);
  };

  // Filter by search and categories
  const filteredProducts = data?.filter((product: TProduct) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      product.category.some((cat) => selectedCategories.includes(cat));
    return matchesSearch && matchesCategory;
  });

  // Sort functionality (ascending/descending by price)
  const sortedProducts = filteredProducts?.sort((a: TProduct, b: TProduct) => {
    if (sortByPrice) {
      return a.price - b.price;
    }
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil((sortedProducts?.length || 0) / itemsPerPage);

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const toggleSortByPrice = () => {
    setSortByPrice(!sortByPrice);
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
        toast.success("Product added to cart");
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
  return (
    <div>
      <div className="my-10 mx-10 flex flex-col md:flex-row-reverse">
        {/* Search and Sort */}
        <div className="w-full md:w-1/5 flex flex-col justify-start items-center md:items-start gap-2 mx-2 md:my-10">
          <div className="flex relative bg-neutral-900 hover:bg-orange-600 hover:text-white">
            <input
              type="text"
              placeholder="Search name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-orange-600 px-3 py-2 rounded-md bg-neutral-900 pl-10"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-700" />
          </div>
          <button
            onClick={toggleSortByPrice}
            className={`border border-orange-600 bg-white text-orange-700 px-3 py-2 rounded-md font-semibold ${sortByPrice ? "" : ""
              }`}
          >
            Sort by Price
          </button>

          {/* Category Filters */}
          <div className="my-4 text-orange-600 flex flex-col">
            {data &&
              Array.from(
                new Set(
                  data.flatMap((product: TProduct) =>
                    Array.isArray(product.category) ? product.category : []
                  )
                )
              ).map((category) => (
                <label key={category as string} className="mr-4">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category as string)}
                    onChange={() => toggleCategory(category as string)}
                  />
                  {` ${category}`}
                </label>
              ))
            }
          </div>

          {/* Clear Filter Button */}
          <button
            onClick={clearFilters}
            className="border border-orange-600 bg-white text-orange-700 px-3 py-2 rounded-md font-semibold"
          >
            Clear Filters
          </button>
        </div>
        {/* Product Listing */}
        <div className="w-full md:w-4/5 my-10">
          {sortedProducts?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:px-2 gap-4 rounded items-center">
              {currentItems?.map((product: TProduct) => (
                <div
                  key={product._id}
                  className="flex flex-col rounded bg-neutral-900 hover:transform hover:scale-105 duration-300"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-72 w-full rounded-t-md"
                    />
                    <div className="absolute bottom-0 right-0 px-4 py-2 bg-orange-600 text-white">
                      {product.category[0]}
                    </div>
                    <div className="absolute top-0 right-0 px-4 py-2 backdrop-blur-md bg-white/10 rounded-tr-md">
                      <p className="font-bold text-orange-600">{product.price}$</p>
                    </div>
                  
                  </div>

                  <div className="text-xl py-6 px-6 md:h-40">
                  <div className=" text-orange-600 flex justify-between">
                  {product.quantity > 0 && (
                      <div className="px-2 py-1 backdrop-blur-md bg-orange-600 hover:bg-orange-700 rounded-full">
                        <p className="font-bold text-white text-sm">{product.quantity}</p>
                      </div>
                    )}
                      <FaCartPlus onClick={() => handleAddToCart(product)} className="text-xl cursor-pointer"/>
                    </ div>
                    <h1 className="font-bold text-2xl text-orange-600 mt-2">
                      {product.name}
                    </h1>
                    <p className="text-white overflow-hidden text-base">
                      {product.description.slice(0, 98) + "..."}
                    </p>
                  </div>
                  <div className="flex justify-end mt-4 px-6 py-6">
                   
                    <Link to={`/products/${product._id}`}>
                      <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-sm">
                        Explore More
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:px-2 gap-4 rounded items-center">
              <p className="text-white text-3xl font-bold">No products found</p>
            </div>
          )}

        </div>

      </div>
      {/* Pagination */}
      {sortedProducts?.length > 0 && (
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
      )}
    </div>
  );
};

export default Products;
