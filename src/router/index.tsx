import MainLayout from "@/components/Layouts/MainLayouts";
import ProductDetail from "@/components/Products/ProductDetail";
import About from "@/pages/About/About";
import Carts from "@/pages/Carts/Carts";
// import FrequentlyAskQus from "@/pages/FAQ/FrequentlyAskQus";
import Home from "@/pages/Home/Home";
import Payment from "@/pages/Payment/Payment";
import Allproducts from "@/pages/Products/Allproducts";
import AddProducts from "@/pages/ProductTable/AddProducts";
import ProductTable from "@/pages/ProductTable/ProductTable";
import NotFound from "@/pages/shared/NotFound";
import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/addproduct",
        element: <AddProducts />,
      },
      {
        path: "/products",
        element: <Allproducts/>,
      },
      {
        path: "/products/:id",
        element: <ProductDetail />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/more",
        element: <ProductTable />,
      },
      // {
      //   path: "/faq",
      //   element: <FrequentlyAskQus />,
      // },
      {
        path: "/cart",
        element: <Carts />,
      },
      {
        path:"/payment",
        element:<Payment/>
      }
    
     
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);

export default router;
