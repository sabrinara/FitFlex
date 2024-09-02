import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";


export default function NotFound() {
  return (
    <div
      className="flex justify-center items-center relative bg-black"
      style={{
        backgroundImage: `url('https://seahawkmedia.com/wp-content/uploads/2023/02/How-to-redirect-your-404-page-to-the-home-page-in-WordPress-01-1.jpg')`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className="pt-96 rounded-lg   absolute ">
        <Link to="/">
          <Button className="border-2 border-emerald-400 px-6 py-5 rounded-none bg-transparent text-emerald-200 mt-4 hover:bg-emerald-400 hover:text-green-950">
            Back To Home</Button>
        </Link>
        {/* <h1 className="text-4xl font-bold text-green-800">404 - Not Found</h1>
        <p className="mt-4 text-lg text-green-600">
          Sorry, the page you are looking for does not exist.
        </p> */}
      </div>
    </div>
  );
}