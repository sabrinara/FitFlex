import { useGetProductsQuery } from "@/redux/api/api";
import CategoryCard from "../CardPart/CategoryCard";


const CategorySection = () => {
  const {data} = useGetProductsQuery({});
    return (
        <div className="md:my-10">
             <div className="my-8 md:ml-2 bg-gradient-to-b from-orange-100 via-orange-500 to-orange-700 bg-clip-text text-transparent">
                <h1 className=" text-3xl md:text-4xl font-bold ">Desired Categories</h1>
                <hr className="my-4 h-1 bg-orange-600 w-6/12 md:w-2/12" />
            </div>
            <CategoryCard category={data} />
        </div>
    );
};

export default CategorySection;