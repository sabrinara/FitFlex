import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useGetProductsQuery } from "@/redux/api/api";
import { TProduct } from "@/types";
import { Link } from "react-router-dom";
import Loading from "@/pages/shared/Loading";
import { FaSearch } from "react-icons/fa";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Products = () => {
  const { data, isLoading } = useGetProductsQuery({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortByPrice, setSortByPrice] = useState<boolean>(false);

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

  // Search and Sort Logic
  const filteredProducts = data?.filter((product: TProduct) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedProducts = filteredProducts?.sort((a: TProduct, b: TProduct) => {
    if (sortByPrice) {
      return a.price - b.price;
    }
    return 0; // No sorting
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

  return (
    <div>
      <div className="my-10">
        {/* Sort Select */}
        <div className="flex my-2 md:my-10 md:ml-40 space-x-4 ">
          <button
            onClick={toggleSortByPrice}
            className={`border border-green-900 px-3 py-2 rounded-none font-semibold ${sortByPrice ? "bg-green-900 text-white" : ""}`}
          >
            In Budget
          </button>
        </div>

        <div className="flex relative hover:bg-green-900 hover:text-white">
          <input
            type="text"
            placeholder="Search by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-green-900 px-3 py-2 rounded-none hover:bg-green-900 hover:text-white pl-10"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 hover:bg-green-900 hover:text-white" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:px-2 gap-10 rounded items-center">
          {currentItems?.map((product: TProduct) => (
            <div key={product._id} className="flex flex-col rounded bg-neutral-900 hover:transform hover:scale-105 duration-300">
              <div className="relative">
                <img src={product.image} alt={product.name} className="h-72 w-full rounded-t-md" />
                <div className="absolute bottom-0 right-0 px-4 py-2 bg-orange-600 text-white">
                  {product.category[2]}
                </div>
                <div className="absolute top-0 right-0 px-4 py-2 backdrop-blur-md bg-white/10 rounded-tr-md">
                  <p className="font-bold text-orange-600">{product.price}$</p>
                </div>
              </div>
              <div className="text-xl py-6 px-6 md:h-44">
                <h1 className="font-bold text-2xl text-orange-600">{product.name}</h1>
                <p className="text-white overflow-hidden text-base">{product.description.slice(0, 95)}</p>
              </div>
              <div className="flex justify-center md:justify-between items-center md:items-start px-6 pb-6">
                {product.quantity > 0 && (
                  <div className="px-3 py-2 backdrop-blur-md bg-orange-600 hover:bg-orange-700 rounded-full">
                    <p className="font-bold text-white">{product.quantity}</p>
                  </div>
                )}
                <Link to={`/products/${product._id}`}>
                  <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-sm">Explore More</button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="my-6 md:my-10 text-orange-600 ">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious className="hover:bg-orange-600 hover:text-white">
                  {currentPage > 1 && (
                    <PaginationLink onClick={() => handleClick(currentPage - 1)} >
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
    </div>
  );
};

export default Products;
