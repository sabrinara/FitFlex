import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import { Link } from "react-router-dom";

export function HeroSection() {
  const sliderData = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
   
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
     
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1375&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1590239926044-4131f5d0654d?q=80&w=1391&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
     
    },
  ];

  return (
    <div className="relative w-full h-full md:h-[500px] mt-6">
      <Carousel
        className="overflow-hidden rounded-lg shadow-lg"
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent className="flex ">
          {sliderData.map((slider) => (
            <CarouselItem key={slider.id} className="min-w-full">
              <Card className="rounded-none bg-black">
                <CardContent
                  className="flex  h-[250px] w-full  md:h-[500px] p-0"
                  style={{
                    backgroundImage: `url(${slider.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    transition: "transform 0.5s ease",
                    transform: "scale(1)",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                   <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-lato text-orange-600">
                            <h1 className="font-extrabold text-5xl md:text-7xl bg-gradient-to-r from-orange-700 to-orange-500 bg-clip-text text-transparent pb-1 md:pb-5">FiTFlex </h1>
                            <p className='hidden md:flex md:text-4xl text-orange-500 font-bold mx-10 py-2'>We provide fitness equipment and accessories like you desire.</p>
                            <Link to='/products'>
                                <button className="px-3 md:px-6 py-1 md:py-3 bg-gradient-to-r from-orange-800 to-orange-600 text-white font-bold rounded text-xl mt-2 md:mt-10">
                                    All Products
                                </button>
                            </Link>
                        </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-1 md:left-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-1 md:p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300">
          &#9664;
        </CarouselPrevious>
        <CarouselNext className="absolute right-1 md:right-4 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-1 md:p-2 rounded-full cursor-pointer hover:bg-opacity-75 transition-opacity duration-300">
          &#9654;
        </CarouselNext>
      </Carousel>
    </div>
  );
}