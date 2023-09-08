import React from "react";
import Pbb from "../../assets/image/PBB.png";
import Pulsa from "../../assets/image/Pulsa.png";
import Pdam from "../../assets/image/PDAM.png";
import Musik from "../../assets/image/Musik.png";

const ServiceCard = () => {
  return (
    <div className="flex justify-between px-8 h-20 border-2 border-black bg-blue-200">
      <div className="flex-shrink-0">
        <img src={Pbb} alt="PBB" />
      </div>
      <div className="flex-shrink-0">
        <img src={Pulsa} alt="Pulsa" />
      </div>
      <div className="flex-shrink-0">
        <img src={Pdam} alt="PDAM" />
      </div>
      <div className="flex-shrink-0">
        <img src={Musik} alt="Musik" />
      </div>
    </div>
  );
};

export default ServiceCard;
