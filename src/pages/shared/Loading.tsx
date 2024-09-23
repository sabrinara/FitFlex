

const Loading = () => {
    return (
        <div>
             <div className="flex flex-col justify-center items-center h-screen">

            <div className="flex md:ml-5 items-center animate-wobble">
            <img src="./logo.png" className="h-8 md:h-16 mr-2" alt="" />
            <h1  className=" text-3xl md:text-6xl font-bold bg-gradient-to-r from-orange-200 via-orange-500 to-orange-600 bg-clip-text text-transparent  ">FiTFlex</h1 >
          </div>
          <p className="text-3xl text-orange-500 mt-10">Loading...</p>
            </div>
        
        </div>
    );
};

export default Loading;