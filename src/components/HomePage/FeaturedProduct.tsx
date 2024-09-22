import { useGetProductsQuery } from "@/redux/api/api";
import { TProduct } from "@/types";
import { Link } from "react-router-dom";


const FeaturedProduct = () => {
    const { data, isLoading } = useGetProductsQuery({});

    if (isLoading) {
        return (
          <div className="flex justify-center items-center h-screen mt-10">
            <p className="text-4xl text-orange-500">Loading...</p>
          </div>
        );
      }
    
    return (
        <div>
            <div className="my-10">
                <div className="md:my-10 md:ml-3 bg-gradient-to-b from-orange-100 via-orange-500 to-orange-700 bg-clip-text text-transparent">
                    <h1 className=" text-3xl md:text-5xl font-bold  ">Featured Products</h1>
                    <hr className="my-4 h-1 bg-orange-600 w-6/12 md:w-3/12" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:px-2 gap-10 rounded items-center ">
                    {data?.slice(0, 4).map((product : TProduct) => (
                        <div key={product._id} className="flex flex-col rounded  bg-neutral-900 hover:transform hover:scale-105 duration-300">
                            <div className="relative">
                                <img src={product.image} alt={product.name} className="h-72 w-full rounded-t-md " />
                                <div className="absolute bottom-0 right-0 px-4 py-2 bg-orange-600  text-white">
                                    {product.category[2]}
                                </ div>
                                <div className="absolute top-0 right-0 px-4 py-2 backdrop-blur-md bg-white/10 rounded-tr-md">
                                    <p className="font-bold  text-orange-600">{product.price}$</p>
                                </div>
                            </div>
                            <div className="text-xl py-6 px-6 ">
                                <h1 className="font-bold text-2xl text-orange-600"> {product.name}</h1>

                                {/* <p className="text-white overflow-hidden text-base ">{product.description.slice(0, 100)}</p> */}
                                {/* {item.stock_quantity} */}
                                {/* <p className="font-bold  text-orange-600"><span className="text-2xl text-white ">Price:</span> {item.price}$</p> */}
                            </div>
                            <div className="flex justify-center md:justify-start items-center md:items-start px-6 pb-6">
                               <Link to={`/products/${product._id}`}>
                               <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-sm">Explore More</button>
                               </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedProduct;