
import { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";


const MosaicImageGallery = () => {

    // const { data, isLoading } = useGetOrdersQuery({});
    const [view, setView] = useState(null);
    const data = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1616279967983-ec413476e824?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTF8fGd5bSUyMGVxdWlwbWVudHxlbnwwfHwwfHx8MA%3D%3D",
            name: "image 1"
        },
        {
            id: 2,
            name: "image 2",
            image: "https://images.unsplash.com/photo-1590487988357-5233b152a9b7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODZ8fGd5bSUyMGVxdWlwbWVudHxlbnwwfHwwfHx8MA%3D%3D"
        },
        {
            id: 3,
            name: "image 3",
            image: "https://images.unsplash.com/photo-1616279967983-ec413476e824?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTF8fGd5bSUyMGVxdWlwbWVudHxlbnwwfHwwfHx8MA%3D%3D"
        },
        {
            id: 4,
            name: "image 4",
            image: "https://images.unsplash.com/photo-1591940808747-05d59b31a299?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 5,
            name: "image 5",
            image: "https://images.unsplash.com/photo-1591940808747-05d59b31a299?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 6,
            name: "image 6",
            image: "https://images.unsplash.com/photo-1591940808747-05d59b31a299?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 7,
            name: "image 7",
            image: "https://images.unsplash.com/photo-1616279967983-ec413476e824?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTF8fGd5bSUyMGVxdWlwbWVudHxlbnwwfHwwfHx8MA%3D%3D"
        },
    ];

    // if (isLoading) {
    //     return (
    //         <div className="flex justify-center items-center h-screen mt-10">
    //             <p className="text-4xl text-orange-500">Loading...</p>
    //         </div>
    //     );
    // }
    // const { data: orders } = data;
    // console.log(orders);


    const viewImage = (img : any) => {
        setView(img);
    };

    const closeModal = () => {
        setView(null);
    };

    return (
        <div className="my-4 md:my-10">
             <div className="md:my-10 md:ml-5 bg-gradient-to-b from-orange-100 via-orange-500 to-orange-700 bg-clip-text text-transparent">
                    <h1 className=" text-3xl md:text-5xl font-bold  ">Happy Users</h1>
                    <hr className="my-4 h-1 bg-orange-600 w-6/12 md:w-2/12" />
                </div>

            {view && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={closeModal}>
                    <div className="relative">
                        <img src={view} alt="Full view" className="max-h-screen max-w-screen rounded-xl" />
                        <button className="absolute top-0 right-2 m-4 font-bold text-orange-50" onClick={closeModal}>X</button>
                    </div>
                </div>
            )}
            <div className="py-10">
                <ResponsiveMasonry
                    columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4, 1500: 5 }}
                >
                    <Masonry gutter="24px" className="">
                        {data?.slice(0, 8)?.map((item, index: number) => {

                            if (index % 2 === 0) {
                                return (
                                    <div key={item.id} className="flex flex-col space-y-2 ">
                                        <div className="relative">
                                            <img
                                                src={item.image}
                                                alt=""
                                                style={{
                                                    width: "100%",
                                                    display: "block",
                                                    height: index % 4 === 0 ? "300px" : "200px",
                                                    objectFit: "cover",
                                                    margin: "10px 0",
                                                }}
                                                onClick={() => viewImage(item.image)}
                                            />
                                            <div className="absolute bottom-3 left-0 right-0 bg-orange-900 bg-opacity-20 p-4 text-center">
                                                <p className="text-white text-lg font-bold">{item.name}</p>
                                            </div>
                                        </div>
                                        {data[index + 1] && (
                                            <div className="relative">
                                                <img
                                                    src={data[index + 1].image}
                                                    alt=""
                                                    style={{
                                                        width: "100%",
                                                        display: "block",
                                                        height: index % 4 === 0 ? "200px" : "300px",
                                                        objectFit: "cover",
                                                    }}
                                                    onClick={() => viewImage(data[index + 1].image)}
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 bg-orange-900 bg-opacity-20 p-4 text-center">
                                                    <p className="text-white text-lg font-bold">{data[index + 1].name}</p>
                                                </div>
                                            </div>
                                        )}

                                    </div>
                                );
                            }
                            return null;
                        })}
                    </Masonry>

                </ResponsiveMasonry>
            </div>
        
        </div>
    );
};

export default MosaicImageGallery;