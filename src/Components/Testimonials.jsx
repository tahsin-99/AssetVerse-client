import React from "react";

const testimonials = [
  {
    name: "John Doe",
    role: "IT Manager",
    company: "TechCorp",
    image:
      "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    review:
      "AssetVerse has transformed the way we manage our company assets. Everything is organized and easy to track.",
  },
  {
    name: "Jane Smith",
    role: "HR Manager",
    company: "BizSolutions",
    image:
      "https://cdn.pixabay.com/photo/2017/10/10/00/49/female-2835524_1280.jpg",
    review:
      "Managing employee assets has never been easier. The dashboard is intuitive and reliable.",
  },
  {
    name: "Michael Brown",
    role: "Operations Lead",
    company: "Innovate Ltd.",
    image:
      "https://t4.ftcdn.net/jpg/04/31/64/75/360_F_431647519_usrbQ8Z983hTYe8zgA7t1XVc5fEtqcpa.jpg",
    review:
      "We saved hours every week using AssetVerse. Highly recommended for medium to large companies.",
  },
];

const stats = [
  { number: "100+", label: "Companies Trust Us" },
  { number: "5000+", label: "Assets Managed" },
  { number: "99.9%", label: "Uptime Guarantee" },
  { number: "24/7", label: "Support Availability" },
];
const Testimonials = () => {
  return (
    <section className="py-16  bg-blue-300 mt-100">
      <div className="container mx-auto px-5">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 mt-50">
          What Our Clients Say & Key Stats
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 ">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition "
            >
              <p className="text-gray-700 italic mb-4">"{item.review}"</p>
              <div className="flex justify-between">
                <div>
                  <h4 className="text-lg font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">
                    {item.role} - {item.company}
                  </p>
                </div>
                <div>
                  <img
                    className="w-20 h-20 rounded-full object-cover"
                    src={item.image}
                    alt=""
                  />
                </div>
              </div>

             
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-3xl font-bold text-blue-600 mb-2">
                {stat.number}
              </h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
