import Loading from "@/pages/shared/Loading";
import { useGetProductsByCategoryQuery } from "@/redux/api/api";
import { TProduct } from "@/types";
import { Link } from "react-router-dom";

const ProductCategory = ({ category }: { category: string }) => {
    console.log('Category received:', category); // Log category for debugging
    const { data, isLoading } = useGetProductsByCategoryQuery(category);
    console.log(data);
    
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen mt-10">
                <Loading />
            </div>
        );
    }



    if (!data || data.length === 0) {
        return <div>No products found in this category.</div>; // Handle no data case
    }

    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="mx-10 my-10 grid grid-cols-1 md:grid-cols-4 gap-4">
            {data.map((product: TProduct) => (
                <div key={product._id} className="flex flex-col items-center justify-center">
                    <Link to={`/products/${product._id}`} onClick={handleScrollToTop}>
                        <div className="w-72 h-72 rounded-3xl bg-slate-200 my-5 relative group">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover rounded-3xl"
                            />
                            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h3 className="text-lg font-bold text-white bg-neutral-900 bg-opacity-50 px-2 py-1 rounded">
                                    {product.name}
                                </h3>
                                <h3 className="text-sm font-bold text-white bg-neutral-900 bg-opacity-50 px-2 py-1 rounded">
                                    {product.category[1]}, {product.category[2]}
                                </h3>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default ProductCategory;
