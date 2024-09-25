import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactInfo = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <div className="py-16 px-6  text-white">
            <div className="flex flex-col items-center text-center">
                <h3 className="text-3xl md:text-5xl font-bold pb-8 text-orange-600">Get In Touch</h3>
                <p className="text-lg text-gray-200 mb-10">
                    Have questions or need assistance? Feel free to reach out to us! Our team is always here to help you with any inquiries or feedback.
                </p>
            </div>
            
            <div className="flex flex-col md:flex-row justify-evenly items-center gap-8">
                <div className="flex items-center bg-neutral-950 p-6 rounded-lg shadow-lg" data-aos="fade-up">
                    <FaPhoneAlt className="text-3xl text-orange-600 mr-4" />
                    <div>
                        <h4 className="text-xl font-semibold">Call Us</h4>
                        <p className="text-gray-600">+1 (800) 123-4567</p>
                    </div>
                </div>
                <div className="flex items-center bg-neutral-950 p-6 rounded-lg shadow-lg" data-aos="fade-up">
                    <FaEnvelope className="text-3xl text-orange-600 mr-4" />
                    <div>
                        <h4 className="text-xl font-semibold">Email Us</h4>
                        <p className="text-gray-600">support@flexfit.com</p>
                    </div>
                </div>
                <div className="flex items-center bg-neutral-950 p-6 rounded-lg shadow-lg" data-aos="fade-up">
                    <FaMapMarkerAlt className="text-3xl text-orange-600 mr-4" />
                    <div>
                        <h4 className="text-xl font-semibold">Visit Us</h4>
                        <p className="text-gray-600">123 Fitness St., Wellness City, USA</p>
                    </div>
                </div>
            </div>
            
            <div className="flex flex-col items-center text-center mt-10">
                <h4 className="text-xl font-bold">We’d Love to Hear From You!</h4>
                <p className="text-gray-200 mt-2">
                    Whether you have questions, feedback, or need support, don't hesitate to contact us.
                </p>
            </div>
        </div>
    );
};

export default ContactInfo;
