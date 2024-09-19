import MainLayout from "@/components/Layouts/MainLayouts";
import Products from "@/components/Products/Products";
import Home from "@/pages/Home/Home";
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
        path: "/allproducts",
        element: <Products />,
      }
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);

export default router;
