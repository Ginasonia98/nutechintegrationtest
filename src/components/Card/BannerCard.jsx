import React, { useState, useEffect } from "react";
import Banner1 from "../../assets/image/Banner1.png";
import Banner2 from "../../assets/image/Banner2.png";
import Banner3 from "../../assets/image/Banner3.png";
import Banner4 from "../../assets/image/Banner4.png";
import Banner5 from "../../assets/image/Banner5.png";

const banners = [Banner1, Banner2, Banner3, Banner4, Banner5];

const BannerCard = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) =>
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000); // Change banner every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-64 mt-5 p-4 overflow-x-hidden relative">
      <h3 className="text-lg font-semibold mb-4">Temukan Promo Menarik</h3>
      <div className="flex">
        {banners.map((banner, index) => (
          <div
            className="flex-shrink-0"
            style={{
              marginRight: index < banners.length - 1 ? "10px" : "0", // Add spacing between banners
              opacity: index === currentBannerIndex ? 1 : 0, // Show current banner, hide others
              transition: "opacity 1s ease-in-out",
            }}
            key={index}
          >
            <img src={banner} alt={`Banner ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerCard;



