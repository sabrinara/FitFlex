import CategoryCard from "../CardPart/CategoryCard";


const CategorySection = () => {
    const category = [
        {
            id: 1,
            name: "Dumbbells",
            image: "https://www.northernfitness.ca/cdn/shop/collections/91df73e111b2f9a1_large_64586c96-752e-439b-9d2f-6983a6a2d196_360x.png?v=1680118778",

        },
        {
            id: 2,
            name: "Exercise Bikes",
            image: "https://www.northernfitness.ca/cdn/shop/collections/KeiserM3i-side_540x.jpg?v=1680109943",

        },
        {
            id: 3,
            name: "Weight Plates",
            image: "https://www.northernfitness.ca/cdn/shop/collections/PLATES_540x.jpg?v=1680047265",

        },
        {
            id: 4,
            name: "Rope workouts",
            image: "https://www.northernfitness.ca/cdn/shop/collections/14714969_1188687531169651_4680838168080452277_o_540x.jpg?v=1680047727",

        },
    ]
    return (
        <div>
             <div className="my-8 md:ml-2 bg-gradient-to-b from-orange-100 via-orange-500 to-orange-700 bg-clip-text text-transparent">
                <h1 className=" text-3xl md:text-5xl font-bold ">Desired Categories</h1>
                <hr className="my-4 h-1 bg-orange-600 w-6/12 md:w-3/12" />
            </div>
            <CategoryCard category={category} />
        </div>
    );
};

export default CategorySection;