import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const BenefitsSections = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);
    return (
        <div className="px-4  md:px-20  md:py-10 py-2">
            <div className="hidden md:flex flex-col md:flex-row-reverse justify-between items-center gap-10 my-10 ">
                <div className="w-full md:w-1/2 " data-aos="fade-left">
                    <img src="https://gymtek-store-demo.myshopify.com/cdn/shop/files/banner-v9-1.jpg?v=1614293410" className="h-[80vh]" />
                </div>
                <div className="w-full md:w-1/2 text-white text-start md:text-right" data-aos="fade-right">
                    <h5 className="text-slate-400 text-xl font-semibold">
                        HANDPICK COLLECTION
                    </h5>
                    <h1 className="text-4xl md:text-6xl font-extrabold pt-4 pb-4 md:pb-10">
                        Gym Machine
                    </h1>
                    <p className="text-xl font-thin md:ml-20 pb-10 text-slate-400">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio cupiditate recusandae rerum excepturi sequi sint inventore voluptate ipsa aliquam. Deleniti quas repellat provident sunt odio beatae expedita hic sapiente dolore?

                    </p>
                   <div className="flex justify-center md:justify-end">
                   <button className="text-2xl border border-slate-800 hover:bg-orange-700 text-orange-600 hover:text-white font-bold py-2 px-4 md:py-4 md:px-8 rounded ">View Collection</button>
                   </div>
                </div>
            </div>
            <div className="hidden md:flex flex-col md:flex-row justify-between items-center gap-10 my-10">
                <div className="w-full md:w-1/2 " data-aos="fade-right">
                    <img src="https://images.unsplash.com/photo-1616279967983-ec413476e824?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTF8fGd5bSUyMGVxdWlwbWVudHxlbnwwfHwwfHx8MA%3D%3D" className="w-full md:h-[80vh]" alt="" />
                </div>
                <div className="w-full md:w-1/2 text-white text-start md:text-left " data-aos="fade-left">
                    <h5 className="text-slate-400 text-xl font-semibold">
                        HANDPICK COLLECTION
                    </h5>
                    <h1 className="text-4xl md:text-6xl font-extrabold pt-4 pb-4 md:pb-10">
                    Exercise Machine
                    </h1>
                    <p className="text-xl font-thin md:mr-20 pb-10 text-slate-400">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio cupiditate recusandae rerum excepturi sequi sint inventore voluptate ipsa aliquam. Deleniti quas repellat provident sunt odio beatae expedita hic sapiente dolore?

                    </p>
                   <div className="flex justify-center md:justify-start">
                   <button className="text-2xl border border-slate-800 hover:bg-orange-700 text-orange-600 hover:text-white font-bold py-2 px-4 md:py-4 md:px-8 rounded ">View Collection</button>
                   </div>
                </div>
            </div>
            {/* mobile */}
            <div className="flex md:hidden flex-col md:flex-row-reverse justify-between items-center gap-10 my-10 ">
                <div className="w-full md:w-1/2 " >
                    <img src="https://gymtek-store-demo.myshopify.com/cdn/shop/files/banner-v9-1.jpg?v=1614293410" className="h-[80vh]" />
                </div>
                <div className="w-full md:w-1/2 text-white text-start md:text-right" >
                    <h5 className="text-slate-400 text-xl font-semibold">
                        HANDPICK COLLECTION
                    </h5>
                    <h1 className="text-4xl md:text-6xl font-extrabold pt-4 pb-4 md:pb-10">
                        Gym Machine
                    </h1>
                    <p className="text-xl font-thin md:ml-20 pb-10 text-slate-400">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio cupiditate recusandae rerum excepturi sequi sint inventore voluptate ipsa aliquam. Deleniti quas repellat provident sunt odio beatae expedita hic sapiente dolore?

                    </p>
                   <div className="flex justify-center md:justify-end">
                   <button className="text-2xl border border-slate-800 hover:bg-orange-700 text-orange-600 hover:text-white font-bold py-2 px-4 md:py-4 md:px-8 rounded ">View Collection</button>
                   </div>
                </div>
            </div>
           
        </div>
    );
};

export default BenefitsSections;