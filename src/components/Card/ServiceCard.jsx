import React from "react";
import Pbb from "../../assets/image/PBB.png";
import Pulsa from "../../assets/image/Pulsa.png";
import Pdam from "../../assets/image/PDAM.png";
import Musik from "../../assets/image/Musik.png";
import Listrik from "../../assets/image/Listrik.png";
import PGN from "../../assets/image/PGN.png";
import TvLangganan from "../../assets/image/Televisi.png";
import VoucherMakanan from "../../assets/image/Voucher Makanan.png";
import VoucherGame from "../../assets/image/Game.png";
import Kurban from "../../assets/image/Kurban.png";
import Zakat from "../../assets/image/Zakat.png";
import PaketData from "../../assets/image/Paket Data.png";

const ServiceCard = () => {
  return (
    <div className="flex justify-between px-4 md:px-8 md:mt-5 h-24 md:h-20">
      <div className="flex-shrink-0 md:mx-4">
        <img src={Pbb} alt="PBB" />
      </div>
      <div className="flex-shrink-0 md:mx-4">
        <img src={Listrik} alt="PBB" />
      </div>
      <div className="flex-shrink-0 md:mx-4">
        <img src={Pulsa} alt="Pulsa" />
      </div>
      <div className="flex-shrink-0 md:mx-4">
        <img src={Pdam} alt="PDAM" />
      </div>
      <div className="flex-shrink-0 md:mx-4">
        <img src={PGN} alt="PGN" />
      </div>
      <div className="flex-shrink-0 md:mx-4">
        <img src={TvLangganan} alt="Musik" />
      </div>
      <div className="flex-shrink-0 md:mx-4">
        <img src={Musik} alt="Musik" />
      </div>
      <div className="flex-shrink-0 md:mx-4">
        <img src={VoucherGame} alt="Musik" />
      </div>
      <div className="flex-shrink-0 md:mx-4">
        <img src={VoucherMakanan} alt="Musik" />
      </div>
      <div className="flex-shrink-0 md:mx-4">
        <img src={Kurban} alt="Musik" />
      </div>
      <div className="flex-shrink-0 md:mx-4">
        <img src={Zakat} alt="Musik" />
      </div>
      <div className="flex-shrink-0 md:mx-4">
        <img src={PaketData} alt="Musik" />
      </div>
    </div>
  );
};

export default ServiceCard;
