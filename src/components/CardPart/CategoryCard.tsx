
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";


const CategoryCard = ({ category }) => {

    return (
        <div className="my-10 md:mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
                {category?.slice(0, 4)?.map((item) => (
                    <div key={item.id} className="flex flex-col justify-center items-center 2 transform hover:scale-105 transition-transform duration-30">
                        <div className="px-3 bg-neutral-900 h-[15rem] rounded-full md:w-60 hover:bg-orange-800">
                            <div className="relative">
                                <img src={item.image} className="rounded-full h-[14rem] w-60" />

                            </div>
                        </div>
                        <div className="pt-4 px-10 text-center">

                            <h1 className="text-3xl font-bold text-orange-600">{item.name}</h1>
                            <p>{item.title2}</p>
                        </div>

                    </div>
                ))}
              <div className="flex justify-center md:justify-normal items-center md:items-start">
              <Link to={"/allcategories"}>
                    <div className="flex justify-center items-center gap-1 2 transform hover:scale-105 transition-transform duration-300 px-3 bg-neutral-900 h-[15rem] rounded-full w-60 hover:" title="View more">
                        <h1 className="text-xl font-bold text-orange-600 text-center">View More</h1>
                        <FaArrowRight className="text-xl text-orange-600 mt-1 hover:animate-wobble" />
                    </div>
                </Link>

              </div>
            </div>
        </div>



    );
};

export default CategoryCard;