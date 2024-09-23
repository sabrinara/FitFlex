import Footer from "@/pages/shared/Footer";
import Loading from "@/pages/shared/Loading";
import Navbar from "@/pages/shared/Navbar";
import { useGetProductsQuery } from "@/redux/api/api";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const { isLoading} = useGetProductsQuery({});

  return (
    <div className="bg-black">
       {isLoading ? (
          <>
            <Loading />
          </>
        ) : (
      <div>
        <Navbar />
      <Outlet ></Outlet>
      <Footer></Footer>
      </div>
        )}
    </div>
  );
};
export default MainLayout;
