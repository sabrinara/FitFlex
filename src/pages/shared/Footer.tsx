import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";



const Footer = () => {
    return (


        <footer className="w-full bg-neutral-900 py-16 px-16">

            <div className=" ">
                <div className="flex flex-col md:flex-row  justify-between md:mx-12 items-center   ">
                    <div className="flex flex-col">
                        <div className="flex items-center ">
                            <img src="logo.png" className="h-8 md:h-10 mr-1" alt="Logo" />
                            <Link to="/" className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-orange-200 via-orange-500 to-orange-600 bg-clip-text text-transparent">FiTFlex</Link>
                        </div>
                        <hr className="bg-gradient-to-b from-orange-200 via-orange-500 to-orange-600 h-1 my-2 " />
                    </div>

                    <div className="flex flex-col-reverse md:flex-col  justify-between text-orange-500">
                        <div className="flex gap-6  my-4 md:my-0 mx-6 justify-center ">
                            <a href="/products" className="underline underline-offset-4 ">Products</a>
                            <a href="/about" className="underline underline-offset-4 ">About</a>
                            <a href="/contact" className="underline underline-offset-4">Contact</a>

                        </div>
                        <div className="flex gap-6 mx-6 my-3 justify-center ">
                            <a href="https://www.facebook.com/" ><FaFacebook className="md:w-6 md:h-6"></FaFacebook></a>
                            <a href="https://www.instagram.com/"><FaInstagram className="md:w-6 md:h-6"></FaInstagram></a>
                            <a href="https://twitter.com/"><FaTwitter className="md:w-6 md:h-6"></FaTwitter></a>
                        </div>
                    </div>


                </div>
            </div>


            <p className="block text-orange-500 text-center font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
                <span className="underline underline-offset-4">© 2024 FitFlex  -<small>Fitness Equipment and Accessories Website</small></span>  <br /> <small> @Sabrina Rashid</small>
            </p>
        </footer >

    );
};

export default Footer;