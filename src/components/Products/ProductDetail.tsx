import { useGetSingleProductQuery } from "@/redux/api/api";
import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { FaHeart } from "react-icons/fa";
import { TProduct } from "@/types";

const ProductDetail = () => {
    const { id: _id } = useParams();

    const { data, isLoading } = useGetSingleProductQuery({ id: _id });
    console.log(data);
    const [cart, setCart] = useState<TProduct[]>([]);
    const navigate = useNavigate();
    console.log(cart)
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen mt-10">
                <p className="text-4xl text-green-500">Loading...</p>
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
        <div className="flex flex-col items-center p-4 text-orange-600   min-h-screen">
            <div className="max-w-6xl w-full  rounded-lg shadow-lg p-10 animate__animated animate__fadeIn bg-neutral-950">
                <h1 className="block md:hidden text-4xl font-bold mb-4">{data?.name}</h1>
                <div className="flex flex-col md:flex-row-reverse md:gap-20 ">
                    <div>
                    <img
                        src={data?.image}
                        alt="data image"
                        className="w-full md:w-[200vh] h-[60vh] md:h-[78vh] rounded-lg shadow-lg md:mr-6 transform hover:scale-105 transition-transform duration-300"
                    />
                    </div>
                    <div className="flex flex-col md:mt-10 md:ml-6">
                        <div className="text-white mb-1 md:mb-4">
                            <div className="hidden md:flex  justify-between items-center">
                                <h1 className="text-4xl font-extrabold mb-4">{data?.name}</h1>
                                <div className="flex items-center gap-2">
                                    <FaHeart className="text-2xl font-bold mb-2 text-orange-600" />
                                    <h1 className="text-2xl font-bold mb-2 "> {data?.rating}</h1>
                                </div>
                            </div>
                            <div className="flex md:hidden justify-between items-center gap-2">
                                <p className="text-2xl font-bold mb-2">Price: <span className="text-orange-600 font-bold">${data?.price}</span></p>
                                <div className="flex items-center gap-2">
                                    <FaHeart className="text-2xl font-bold mb-2 text-orange-600" />
                                    <h1 className="text-2xl font-bold mb-2 text-orange-600"> {data?.rating}</h1>
                                </div>
                            </div>
                            <p className="hidden md:block text-xl font-bold mb-2">Price: <span className="text-orange-600 font-bold">${data?.price}</span></p>
                            <p className="text-xl  font-bold mb-2">Quantity: <span className="text-orange-600 font-semibold">{data?.quantity}</span></p>
                            <p className="text-xl font-bold md:mb-2">Category: <span className="text-orange-600 font-medium">{data?.category?.join(', ')} </span></p>


                        </div>
                        <p className="text-justify mb-2 text-white">{data?.description.slice(0, 300)}</p>
                        <div className="flex justify-end animate-bounce md:mt-10">
                            <button
                                onClick={() => handleAddToCart(data)}
                                className="bg-orange-700 text-white px-6 py-2 rounded shadow hover:bg-orange-500 text-3xl "
                                title="Add To Cart"
                            >
                                <IoCartOutline />
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetail;