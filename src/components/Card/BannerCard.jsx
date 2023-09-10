import Banner1 from "../../assets/image/Banner1.png";
import Banner2 from "../../assets/image/Banner2.png";
import Banner3 from "../../assets/image/Banner3.png";
import Banner4 from "../../assets/image/Banner4.png";
import Banner5 from "../../assets/image/Banner5.png";

const BannerCard = () => {
  return (
    <div className="h-64 mt-5 p-4 overflow-x-auto">
      <h3 className="text-lg font-semibold mb-4">Temukan Promo Menarik</h3>
      <div className="flex flex-nowrap gap-4">
        <div className="flex-shrink-0">
          <img src={Banner1} alt="Banner 1" />
        </div>
        <div className="flex-shrink-0">
          <img src={Banner2} alt="Banner 2" />
        </div>
        <div className="flex-shrink-0">
          <img src={Banner3} alt="Banner 3" />
        </div>
        <div className="flex-shrink-0">
          <img src={Banner4} alt="Banner 4" />
        </div>
        <div className="flex-shrink-0">
          <img src={Banner5} alt="Banner 5" />
        </div>
      </div>
    </div>
  );
};

export default BannerCard;

