import { BiMusic } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { CgGames } from "react-icons/cg";
import { GiFilmProjector } from "react-icons/gi";
import { MdOutlineSportsVolleyball } from "react-icons/md";
import { PiDiscoBallDuotone } from "react-icons/pi";

export default function CategoryCards() {
  const categories = [
    {
      id: 1,
      icon: <GiFilmProjector size={40} className="text-red-500" />,
      count: 113,
      label: "Film",
    },
    {
      id: 2,
      icon: <BiMusic size={40} className="text-red-500" />,
      count: 4,
      label: "Music",
    },
    {
      id: 3,
      icon: <MdOutlineSportsVolleyball size={40} className="text-red-500" />,
      count: 9,
      label: "Sport",
    },
    {
      id: 4,
      icon: <PiDiscoBallDuotone size={40} className="text-red-500" />,
      count: 36,
      label: "Night Party",
    },
    {
      id: 5,
      icon: <CgGames size={40} className="text-red-500" />,
      count: 13,
      label: "Education",
    },
    {
      id: 6,
      icon: <BsThreeDots size={40} className="text-red-500" />,
      count: 33,
      label: "Others",
    },
  ];

  return (
    <div className="lg:flex container mx-auto md:flex justify-center gap-5 py-14 hidden ">
      {categories.map((category) => (
        <div
          key={category.id}
          className="flex flex-col items-center justify-center w-40 h-40 bg-gray-100 rounded-xl shadow-lg border border-gray-200 text-red hover:scale-105"
        >
          {category.icon}
          <p className="text-gray-500 mt-4">{category.count}</p>
          <p className="text-black font-normal">{category.label}</p>
        </div>
      ))}
    </div>
  );
}
