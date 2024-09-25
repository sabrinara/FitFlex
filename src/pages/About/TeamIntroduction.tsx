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
            img: "https://images.unsplash.com/photo-1603415526960-f0b8a3a4b8c2?w=500&q=80"
        },
        {
            name: "Emily Davis",
            role: "Customer Support Manager",
            bio: "Emily leads our customer service team, ensuring that every customer has a positive experience with FlexFit.",
            img: "https://images.unsplash.com/photo-1532074205216-d0e1f1d47f51?w=500&q=80"
        }
    ];

    return (
        <div className="py-16 px-6  flex flex-col items-center">
            <h3 className="text-3xl md:text-5xl font-bold text-orange-600 pb-8">Meet Our Team</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {teamMembers.map((member, index) => (
                    <div className="flex flex-col items-center bg-neutral-950 p-10 mx-10 rounded-lg shadow-lg" data-aos="fade-up" key={index}>
                        <img src={member.img} alt={member.name} className="w-32 h-32 rounded-full mb-4 object-cover" />
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
