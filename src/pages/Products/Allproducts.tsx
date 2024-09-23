// import AllProductsTable from "@/components/AllTable/AllProductsTable";
// import ScrollToTopButton from "../Home/ScrollToTopButton";

import Products from "@/components/Products/Products";

const AllProducts = () => {
  return (
 <div className="">
     <div className="flex flex-col items-center justify-center">
      <div className="relative w-full h-[50vh] md:h-[72vh] bg-no-repeat bg-center bg-cover" 
    style={{ 
        backgroundImage: `url("https://images.unsplash.com/photo-1597075941308-6215ddcf6c39?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")` ,
     
        }}>
      <div className="absolute flex flex-col items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  ">
       
        <h2 className="text-3xl md:text-5xl font-bold md:mb-2 text-orange-600">
        All Products
        </h2>
        {/* <h5 className="font-jost text-sm md:text-lg font-medium md:pb-2 tracking-widest text-orange-600 mt-2">That Helps to heal life.</h5> */}
       
      </div>
    </div>
    <Products />
    
    {/* <AllProductsTable />
    <ScrollToTopButton /> */}
  </div>
 </div>
  );
};

export default AllProducts;