import React, { useState } from "react";
import Info from "../../assets/images/info.png";

const InfoButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative flex items-center">
      <img
        src={Info}
        alt="Info"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="h-3 w-3 mx-2"
      ></img>
      {isHovered && (
        <div className="absolute mt-2 left-1/2 transform -translate-x-1/2 w-48 p-4 bg-gho-light-bg border-slate-600 shadow-lg rounded-md text-slate-700 text-sm">
          <ul>
            <li>Part of the fee goes to community treasury as rewards.</li>
            <li>Part of the fee goes to support platform liquidity.</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default InfoButton;
