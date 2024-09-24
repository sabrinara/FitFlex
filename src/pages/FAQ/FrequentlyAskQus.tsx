import React, { useState } from 'react';

const faqData = [
    {
        question: 'What is the delivery time for fitness equipment?',
        answer: 'Delivery typically takes 5-7 business days depending on your location. We offer expedited shipping options as well.'
    },
    {
        question: 'Do you offer warranties on your equipment?',
        answer: 'Yes, all our products come with a 1-year standard warranty. Extended warranties are available on select items.'
    },
    {
        question: 'How do I return or exchange an item?',
        answer: 'To return or exchange an item, please contact our support team within 30 days of purchase. We will guide you through the process.'
    },
    {
        question: 'Do you provide installation services?',
        answer: 'Yes, we offer professional installation services for large fitness equipment. You can select this option during checkout.'
    },
    {
        question: 'Are there financing options available?',
        answer: 'Yes, we offer flexible financing options through our partner program. You can apply for financing at checkout.'
    }
];

const FrequentlyAskQus = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="faq-container max-w-3xl mx-auto p-6 text-white my-10">
            <h1 className="text-4xl font-bold mb-6 text-center text-orange-600">Frequently Asked Questions</h1>
            <div className="faq-list">
                {faqData.map((item, index) => (
                    <div key={index} className="faq-item border-b py-4">
                        <h3 
                            className="text-xl font-semibold cursor-pointer flex justify-between items-center"
                            onClick={() => toggleFAQ(index)}
                        >
                            {item.question}
                            <span>{activeIndex === index ? '-' : '+'}</span>
                        </h3>
                        {activeIndex === index && (
                            <p className="mt-2 text-gray-400">{item.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FrequentlyAskQus;
