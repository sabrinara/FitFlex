import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';

const TeamIntroduction = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const teamMembers = [
        {
            name: "John Doe",
            role: "CEO & Founder",
            bio: "John is the visionary behind FlexFit. With over 10 years of experience in the fitness industry, he leads the team with passion and innovation.",
            img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80"
        },
        {
            name: "Jane Smith",
            role: "Chief Marketing Officer",
            bio: "Jane is responsible for the brand's global presence. Her marketing strategies have made FlexFit a household name.",
            img: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=500&q=80"
        },
        {
            name: "Mike Johnson",
            role: "Head of Product Development",
            bio: "Mike ensures that all products meet the highest standards of quality and performance, with a focus on innovation.",
            img: "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHVzZXJ8ZW58MHx8MHx8fDA%3D"
        },
        {
            name: "Emily Davis",
            role: "Customer Support Manager",
            bio: "Emily leads our customer service team, ensuring that every customer has a positive experience with FlexFit.",
            img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    ];

    return (
        <div className="py-16 px-6 flex flex-col items-center mx-4 md:mx-10">
            <h3 className="text-3xl md:text-5xl font-bold text-orange-600 pb-8">Meet Our Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {teamMembers.map((member, index) => (
                    <div className="flex flex-col items-center bg-neutral-950 p-12  rounded-lg shadow-lg" data-aos="fade-up" key={index}>
                        <img src={member.img} alt={member.name} className="w-32 md:w-40 h-32 md:h-40 rounded-full mb-4 object-cover" />
                        <h4 className="text-xl font-bold text-orange-600">{member.name}</h4>
                        <p className="text-sm text-gray-300 italic">{member.role}</p>
                        <p className="text-gray-400 mt-2 text-center">{member.bio}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamIntroduction;
