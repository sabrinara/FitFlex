

const EasyStep = () => {
    const data = [
        {
            id: 1,
            name: "Gym Movement",
            title2: "Many gyms offer tools and resources to track progress, such as fitness apps, workout logs, or integrated gym software.",
            image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            step: "Step 1"
        },
        {
            id: 2,
            name: "Fitness Practice",
            title2: "Gyms are adaptable to various fitness levels and preferences, catering to beginners and advanced individuals alike.",
            image: "https://images.unsplash.com/photo-1616279969856-759f316a5ac1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTk5fHxmaXRuZXNzJTIwZ3ltfGVufDB8fDB8fHww",
            step: "Step 2"
        },
        {
            id: 3,
            name: "Achievement",
            title2: "Group fitness classes led by instructors offer structured workouts in a motivating group setting the development.",
            image: "https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTJ8fGZpdG5lc3MlMjBneW18ZW58MHx8MHx8fDA%3DD",
            step: "Step 3"
        }
    ]
    return (
        <div className="pt-10 md:pb-10">
            <div className="md:my-8 md:ml-2 bg-gradient-to-b from-orange-100 via-orange-500 to-orange-700 bg-clip-text text-transparent">
                <h1 className=" text-3xl md:text-5xl font-bold  ">Work Process</h1>
                <hr className="my-4 h-1 bg-orange-600 w-6/12 md:w-2/12" />
            </div>

            <div className="text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {
                    data.map((item) => (
                        <div key={item.id} className="flex flex-col justify-center items-center">
                            <div className="px-3 bg-neutral-900 h-[18rem] rounded-full w-72 hover:bg-orange-800">
                                <div className="relative">
                                    <img src={item.image} className="rounded-full h-[17rem] w-72" />
                                    <div className="absolute top-64 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        <h1 className="text-xl font-bold text-white " >{item.step}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4 px-10 text-center">

                                <h1 className="text-3xl font-bold text-orange-600">{item.name}</h1>
                                <p>{item.title2}</p>
                            </div>

                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default EasyStep;