import React, { useState } from "react";

const FaqSection = () => {
  const faqs = [
    {
      question: "How many assets can I track?",
      answer: "You can track unlimited assets depending on your subscription plan.",
    },
    {
      question: "Can multiple admins manage assets?",
      answer: "Yes, you can assign multiple admins with different access roles.",
    },
    {
      question: "Is my company data secure?",
      answer: "Absolutely! All your data is encrypted and securely stored.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-16 bg-[#1B3B5F] text-white mt-100">
      <div className="container mx-auto px-5">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="max-w-2xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border rounded-xl overflow-hidden shadow-sm">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center font-semibold"
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                {faq.question}
                <span>{openIndex === idx ? "-" : "+"}</span>
              </button>
              {openIndex === idx && (
                <p className="px-6 py-4 text-yellow-500 border-t">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
