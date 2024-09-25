import { IoStorefrontSharp } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { LuGift } from "react-icons/lu";
const ExtraSection = () => {
    const data = [
        {
            id : 1,
            icon: <TbTruckDelivery />,
            title: "Fast Delivery"
        },
        {
            id : 2,
            icon: <IoStorefrontSharp />,
            title: "Free in-store pickup"
        },
        {
            id : 3,
            icon: <MdOutlineVerifiedUser />,
            title: "Trusted Company"
        },
        {
            id : 4,
            icon: <LuGift />,
            title: "Gift Cards"
        },
    ]
    return (
      <div className="my-10 md:my-32">
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center text-orange-500 md:gap-40">
            {data.map((item) => (
                <div key={item.id} className="flex  items-center justify-between gap-4">
                    <div className="flex flex-col items-center ">
                        <div className="text-6xl md:text-8xl  flex items-center justify-center">
                            {item.icon}
                        </div>
                        <div className="flex flex-col mt-4">
                            <h1 className="text-xl font-semibold">{item.title}</h1>
                        </div>
                    </div>
                </div>
            ))}
      </div>
        </div>
    );
};

export default ExtraSection;