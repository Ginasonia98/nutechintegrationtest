import React from "react";

// Import your service images
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

// Define a mapping of service code to service icon
const serviceIcons = {
  PAJAK: Pbb,
  PLN: Listrik,
  PDAM: Pdam,
  PULSA: Pulsa,
  PGN: PGN,
  MUSIK: Musik,
  TV: TvLangganan,
  PAKET_DATA: PaketData,
  VOUCHER_GAME: VoucherGame,
  VOUCHER_MAKANAN: VoucherMakanan,
  QURBAN: Kurban,
  ZAKAT: Zakat,
};

// Define your service data array with tariffs and service codes
const servicesData = [
  {
    service_code: "PAJAK",
    service_name: "Pajak PBB",
    service_tariff: 40000,
  },
  {
    service_code: "PLN",
    service_name: "Listrik",
    service_tariff: 10000,
  },
  {
    service_code: "PDAM",
    service_name: "PDAM Berlangganan",
    service_tariff: 40000,
  },
  {
    service_code: "PULSA",
    service_name: "Pulsa",
    service_tariff: 40000,
  },
  {
    service_code: "PGN",
    service_name: "PGN Berlangganan",
    service_tariff: 50000,
  },
  {
    service_code: "MUSIK",
    service_name: "Musik Berlangganan",
    service_tariff: 50000,
  },
  {
    service_code: "TV",
    service_name: "TV Berlangganan",
    service_tariff: 50000,
  },
  {
    service_code: "PAKET_DATA",
    service_name: "Paket data",
    service_tariff: 50000,
  },
  {
    service_code: "VOUCHER_GAME",
    service_name: "Voucher Game",
    service_tariff: 100000,
  },
  {
    service_code: "VOUCHER_MAKANAN",
    service_name: "Voucher Makanan",
    service_tariff: 100000,
  },
  {
    service_code: "QURBAN",
    service_name: "Qurban",
    service_tariff: 200000,
  },
  {
    service_code: "ZAKAT",
    service_name: "Zakat",
    service_tariff: 300000,
  },
];

const ServiceCard = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-8 md:mt-5 h-auto md:h-20">
      {servicesData.map((service, index) => (
        <div className="flex-shrink-0 md:mx-4 text-center" key={index}>
          <img src={serviceIcons[service.service_code]} alt={service.service_name} />
          <p className="text-sm mt-2">{service.service_code}</p>
          <p className="text-sm mt-1">{service.service_tariff} IDR</p>
        </div>
      ))}
    </div>
  );
};

export default ServiceCard;



