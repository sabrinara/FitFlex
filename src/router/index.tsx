import MainLayout from "@/components/Layouts/MainLayouts";
import Products from "@/components/Products/Products";
import FrequentlyAskQus from "@/pages/FAQ/FrequentlyAskQus";
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
        path: "/products",
        element: <Products />,
      },
      {
        path: "/products/:id",
        element: <Products />,
      },
      {
        path: "/allcategories",
        element: <Products />,
      },
      {
        path: "/faq",
        element: <FrequentlyAskQus />,
      },
      {
        path: "/about",
        element: <Products />,
      },
     
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);

export default router;
