import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";  
import { useGetProductsQuery } from "@/redux/api/api";
import { TProduct } from "@/types";

const Products = () => {
  const { data, isLoading } = useGetProductsQuery({});
  // console.log(data);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen mt-10">
        <p className="text-4xl text-orange-500">Loading...</p>
      </div>
    );
  }


  return (
    <div className="text-center my-20">
      <h1 className="text-3xl font-bold text-orange-600">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 my-10">
        {data?.map((product: TProduct) => (
          <div
            key={product._id}
            className="my-10"
            data-aos="zoom-in" 
          >
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <img src={product.image} alt={product.name} />
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
