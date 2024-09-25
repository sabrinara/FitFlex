import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Scroller from "../shared/Scroller";
import Typewriter from 'typewriter-effect';
import './About.css';
import TeamIntroduction from "./TeamIntroduction";
import ContactInfo from "./ContactInfo";

const About = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            {/* Hero Section */}
            <div className="relative w-full h-[50vh] md:h-[72vh] bg-no-repeat bg-center bg-cover"
                style={{
                    backgroundImage: `url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
                }}>
                <div className="absolute flex flex-col items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-300 px-4 py-4 opacity-80 rounded">
                    <h2 className="text-2xl md:text-5xl font-bold md:mb-2 text-orange-600">
                        About FlexFit
                    </h2>
                 
                </div>
            </div>

            {/*  Our Vision */}
            <div className="flex flex-col md:flex-row items-center justify-between px-6 md:mx-28 py-10 " data-aos="fade-right">
                <div className="w-full md:w-1/2">
                    <h3 className="text-3xl md:text-5xl font-bold text-orange-600 pb-4">Our Vision</h3>
                    <div className="text-xl md:text-2xl font-medium text-gray-400 mb-2">
                        <Typewriter
                            options={{
                                strings: ["Your Journey to Peak Fitness Starts Here!", "Quality Equipment for Every Fitness Enthusiast", "Building Strength, One Machine at a Time!"],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </div>
                    <p className="text-lg text-gray-500">
                        At FlexFit, we envision a world where fitness is accessible to everyone. We aim to provide high-quality fitness equipment that helps individuals achieve their health goals, whether they’re at home or in the gym. Our innovative designs, top-tier materials, and customer-focused service will transform the way you exercise.
                    </p>
                </div>
                <div className="w-full md:w-1/2 box" data-aos="fade-left">
                   <div className="content">
                   <img src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&q=80&w=600" alt="Our Vision" className=" w-full  h-[50vh] md:h-[70vh] object-cover rounded-lg" />
                   </div>
                </div>
            </div>

            {/* Our Mission */}
            <div className="flex flex-col md:flex-row-reverse items-center justify-between px-6 md:mx-28 py-10 gap-10" data-aos="fade-left">
                <div className="w-full md:w-1/2">
                    <h3 className="text-3xl md:text-5xl font-bold text-orange-600 pb-4">Our Mission</h3>
                    <div className="text-xl md:text-2xl font-medium text-gray-400 mb-2">
                        <Typewriter
                            options={{
                                strings: ["Grab the Best Equipment for Your Needs", "Quality Equipment for Every Fitness Enthusiast", "Building Strength, One Machine at a Time!"],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </div>
                    <p className="text-lg text-gray-500">
                        Our mission is to empower fitness enthusiasts by offering premium equipment at affordable prices. We work closely with manufacturers to ensure every product meets rigorous quality standards. Whether you’re a beginner or a seasoned athlete, we are committed to delivering equipment that supports your fitness journey.
                    </p>
                </div>
                <div className="w-full md:w-1/2 box" data-aos="fade-right">
                  <div className="content">
                  <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGd5bSUyMGVxdWlwbWVudCUyMHN0b3JlfGVufDB8fDB8fHww" alt="Our Mission" className="w-full  h-[40vh] md:h-[55vh] object-cover rounded-lg" />
                  </div>
                </div>
            </div>

            {/* Why Choose Us */}
            <div className="flex flex-col md:flex-row items-center justify-between px-6 md:mx-28 py-10 " data-aos="fade-right">
                <div className="w-full md:w-1/2 md:mr-10">
                    <h3 className="text-3xl md:text-5xl font-bold text-orange-600 pb-4">Why Choose FlexFit?</h3>
                    <div className="text-xl md:text-2xl font-medium text-gray-400 mb-2">
                        <Typewriter
                            options={{
                                strings: ["We provide high-quality fitness equipment", "Quality Equipment for Every Fitness Enthusiast", "Building Strength, One Machine at a Time!"],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </div>
                    <p className="text-lg text-gray-500">
                        We understand that choosing the right equipment can be daunting. At FlexFit, we take the guesswork out by offering expert advice, detailed product descriptions, and a comprehensive range of equipment suited for every fitness level. Our customer service is second to none, ensuring a seamless shopping experience.
                    </p>
                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0" data-aos="fade-left">
                    <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&q=80&w=600" alt="Why Choose Us" className="w-full h-[40vh] md:h-[60vh] object-cover rounded-lg" />
                </div>
            </div>

            {/* Customer Reviews */}
            <div className="py-10 md:py-20 w-full" data-aos="fade-up">
                <div className="flex flex-col items-center mx-4 text-center">
                    <h3 className="text-3xl md:text-5xl font-bold text-orange-600 pb-4">What Our Customers Say</h3>
                    <p className="text-lg text-gray-300 max-w-2xl text-center">
                        Don’t just take our word for it. Hear from the customers who trust FlexFit for all their fitness equipment needs.
                    </p>
                </div>
                <div className="flex flex-col md:flex-row justify-evenly items-center gap-8 mt-8">
                    <div className="bg-neutral-950 p-6 rounded-lg shadow-lg w-80" data-aos="fade-right">
                        <p className="text-lg text-gray-400 italic">"The best equipment I've ever purchased. The quality is unmatched!"</p>
                        <p className="text-orange-600 font-semibold mt-4">- John Doe</p>
                    </div>
                    <div className="bg-neutral-950 p-6 rounded-lg shadow-lg w-80" data-aos="fade-left">
                        <p className="text-lg text-gray-400 italic">"Excellent customer service and fast delivery. Highly recommend!"</p>
                        <p className="text-orange-600 font-semibold mt-4">- Jane Smith</p>
                    </div>
                </div>
            </div>

            <div className="py-10 md:py-20 w-full" data-aos="fade-up">
                <div className="flex flex-col items-center mx-4 text-center">
                    <h3 className="text-3xl md:text-5xl font-bold text-orange-600 pb-4">Our Products</h3>
                    <p className="text-lg text-gray-300 max-w-2xl text-center">
                        Take a look at some of the high-quality equipment we offer to meet your fitness needs.
                    </p>
                </div>

                <div className="flex flex-col md:flex-row justify-evenly items-center gap-8 mt-8">
                    <div className="image-container" data-aos="fade-right">
                        <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&q=80&w=600" alt="Product 1" className="product-image" />
                    </div>
                    <div className="image-container" data-aos="fade-left">
                        <img src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&auto=format&fit=crop&q=60" alt="Product 2" className="product-image" />
                    </div>
                    <div className="image-container" data-aos="fade-up">
                        <img src="https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&q=80&w=600" alt="Product 3" className="product-image" />
                    </div>
                </div>
            </div>
            <TeamIntroduction />
            <ContactInfo />
            <Scroller />
        </div>
    );
};

export default About;
