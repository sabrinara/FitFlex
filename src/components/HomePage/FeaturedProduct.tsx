import Loading from "@/pages/shared/Loading";
import { useGetProductsQuery } from "@/redux/api/api";
import { TProduct } from "@/types";
import { useState } from "react";
import { FaArrowRight, FaCartPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";


const FeaturedProduct = () => {
    const { data, isLoading } = useGetProductsQuery({});
    const [cart, setCart] = useState<TProduct[]>([]);
    const navigate = useNavigate();
    console.log(cart)

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen mt-10">
               <Loading />
            </div>
        );
    }
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
            <div className="my-10">
                <div className="md:my-10 md:ml-3 bg-gradient-to-b from-orange-100 via-orange-500 to-orange-700 bg-clip-text text-transparent">
                    <h1 className=" text-3xl md:text-4xl font-bold  ">Featured Products</h1>
                    <hr className="my-4 h-1 bg-orange-600 w-6/12 md:w-2/12" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:px-2 gap-10 rounded items-center ">
                    {data?.slice(0, 7).map((product: TProduct) => (
                        <div key={product._id} className="flex flex-col rounded  bg-neutral-900 hover:transform hover:scale-105 duration-300">
                            <div className="relative">
                                <img src={product.image} alt={product.name} className="h-72 w-full rounded-t-md " />
                                <div className="absolute bottom-0 right-0 px-2 py-1 bg-orange-700 rounded-tl-sm  text-white">
                                    {product.category[2]}
                                </ div>
                                <div className="absolute bottom-0 left-0 px-4 py-2  bg-white rounded-tr-sm  text-orange-600">
                                 <FaCartPlus onClick={() => handleAddToCart(product)} />
                                </ div>
                                <div className="absolute top-0 right-0 px-4 py-2 backdrop-blur-md bg-white/10 rounded-tr-md">
                                    <p className="font-bold  text-orange-600">{product.price}$</p>
                                </div>
                            </div>
                            <div className="text-xl py-4 px-6 h-24">
                                <h1 className="font-bold text-2xl text-orange-600"> {product.name}</h1>

                                {/* <p className="text-white overflow-hidden text-base ">{product.description.slice(0, 100)}</p> */}
                                {/* {item.stock_quantity} */}
                                {/* <p className="font-bold  text-orange-600"><span className="text-2xl text-white ">Price:</span> {item.price}$</p> */}
                            </div>
                            <div className="flex justify-between items-center md:items-start px-6 pb-6 ">
                                {data?.quantity !== 0 &&
                                    <div className="px-3 py-2 backdrop-blur-md bg-orange-600 hover:bg-orange-700 rounded-full">
                                        <p className="font-bold  text-white">{product.quantity}</p>
                                    </div>
                                }
                                <Link to={`/products/${product._id}`}>
                                    <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-sm">Explore More</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                    <div className="flex justify-center md:justify-normal items-center md:items-start">
                        <Link to={"/products"}>
                            <div className="flex justify-center items-center gap-1 2 transform hover:scale-105 transition-transform duration-300 px-3 bg-neutral-900 h-[70vh] rounded-md w-72 hover:" title="View more">
                                <h1 className="text-xl md:text-2xl font-bold text-orange-600 text-center border-b-8 border-l-8 border-orange-700 pl-4 py-6">View More</h1>
                                <FaArrowRight className="text-xl text-orange-600 mt-1 hover:animate-wobble" />
                            </div>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeaturedProduct;