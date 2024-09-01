

const FeaturedProduct = () => {
    const data = [
        {
            id: 1,
            name: "Product 1",
            price: 100,
            description: "Product 1 description lorem ipsambd shfgs ahkdf hkjsadh fsadbvhs dvhbsdbv  dsfbasd hvbfs dhbfjs asdfbsdhfj",
            stock_quantity: 10,
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category_id: "dumbble"
        },
        {
            id: 2,
            name: "Product 2",
            price: 200,
            description: "Product 2 description lorem ipsam bdshfgs ahkdf hkjsad hfsadbvhsdv hbsdbv dsfbasdhvbfsdhbfjs asdfbsdhfj",
            stock_quantity: 10,
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category_id: "yoga mate"
        },
        {
            id: 3,
            name: "Product 3",
            price: 300,
            description: "Product 3 description lorem ipsam bdshf gsahkdf  hkjsadhfsadbvhs sdvhbsdbv dsfbasdhv fsadbvhsd vhbsdbv dsfb asdhv bfsdhbfjs asdf bsdhfj",
            stock_quantity: 10,
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category_id: "yoga mate"
        },
        {
            id: 4,
            name: "Product 4",
            price: 400,
            description: "Product 4 description lorem ipsambds hfgsahkdf hkjsadhfsadbvhs  hkjsadhfs adbvhs  hkjsadhfsadbvhs sdvhbsdbv dsfbasdhv bfsdhbfjs asdfbsdhfj",
            stock_quantity: 10,
            image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            category_id: "dumbble"

        },
    ]
    return (
        <div>
            <div className="my-10 mx-4 md:mx-4 ">
                <div className="md:my-10 md:ml-5 bg-gradient-to-b from-orange-100 via-orange-500 to-orange-700 bg-clip-text text-transparent">
                    <h1 className=" text-3xl md:text-5xl font-bold  ">Featured Products</h1>
                    <hr className="my-4 h-1 bg-orange-600 w-6/12 md:w-3/12" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:px-4 gap-10 rounded items-center">
                    {data.map((item) => (
                        <div key={item.id} className="flex flex-col rounded  bg-neutral-900 hover:transform hover:scale-105 duration-300">
                            <div className="relative">
                                <img src={item.image} alt={item.name} className="h-72 w-full rounded-t-md" />
                                <div className="absolute bottom-0 right-0 px-4 py-2 bg-orange-600  text-white">
                                    {item.category_id}
                                </ div>
                                <div className="absolute top-0 right-0 px-4 py-2 backdrop-blur-md bg-white/10 rounded-tr-md">
                                    <p className="font-bold  text-orange-600">{item.price}$</p>
                                </div>
                            </div>
                            <div className="text-xl py-6 px-6 h-48 md:h-40">
                                <h1 className="font-bold text-2xl text-orange-600"> {item.name}</h1>

                                <p className="text-white overflow-hidden text-base ">{item.description.slice(0, 100)}</p>
                                {/* {item.stock_quantity} */}
                                {/* <p className="font-bold  text-orange-600"><span className="text-2xl text-white ">Price:</span> {item.price}$</p> */}
                            </div>
                            <div className="flex justify-center md:justify-start items-center md:items-start px-6 pb-6">
                                <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-sm">Explore More</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturedProduct;