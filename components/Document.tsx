import { Archive } from "lucide-react";
import React, { useState } from "react";

interface DocumentProps {
  index: number;
  data: any;
  onDelete: any;
}
const Document: React.FC<DocumentProps> = ({ index, data, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      key={index}
      className="text-xs relative w-[100px] h-[100px] rounded-md ease-in-out duration-300 hover:shadow-box-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span
        className={`bg-[#000000ca] w-[30px] h-[30px] rounded-full flex justify-center items-center absolute top-[-15px] right-[-5px] ease-in-out duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        } cursor-pointer`}
        onClick={onDelete}
      >
        <Archive color="#ffffff" size={16} />
      </span>
      <img
        src={URL.createObjectURL(data)}
        alt="Uploaded File"
        className="w-full h-full aspect-square object-contain"
      />
    </li>
  );
};

export default Document;
