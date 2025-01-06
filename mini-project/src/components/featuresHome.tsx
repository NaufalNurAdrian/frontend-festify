import React from "react";
import Image from "next/image";

const Features: React.FC = () => {
  const features = [
    {
      img: "/festify-zeropersen.png",
      title: "No Service Fee",
      description: "Events without service fees in one list.",
    },
    {
      img: "/festify-discount.png",
      title: "Learn About Discounts",
      description:
        "Conditions for accumulating bonuses and participating in promotions.",
    },
    {
      img: "/festify-secure.png",
      title: "Secure Payment",
      description: "Safe and reliable online payment process.",
    },
    {
      img: "/festify-pinlocation.png",
      title: "Find Venues",
      description:
        "Theaters, circuses, and concert halls in an easy-to-use catalog.",
    },
  ];

  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-center text-2xl font-semibold mb-8">
          Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-lg p-6 flex flex-col items-center text-center"
            >
              <Image
                src={feature.img}
                alt={feature.title}
                width={80}
                height={80}
                className="mb-4"
              />
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
