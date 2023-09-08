import { useState } from "react";
import BackgroundSaldo from "../../assets/image/BackgroundSaldo.png";
import PropTypes from "prop-types";

const BalanceCard = (props) => {
  const { saldo } = props;
  const [isVisiblePass, setIsVisiblePass] = useState(false);

  const toggleVisibility = () => {
    setIsVisiblePass(!isVisiblePass);
  };

  const saldoText = isVisiblePass ? (
    saldo
  ) : (
    <span className="text-5xl font-bold mt-[-24px] ml-2 absolute">......</span>
  );

  return (
    <div className="relative">
      <img src={BackgroundSaldo} alt="Background Banner Saldo" />
      <div className="absolute flex flex-col gap-[24px] mt-[-150px] ml-3 h-[130px]">
        <p className="text-white font-light text-sm">Saldo Anda</p>
        <p className="text-2xl text-white font-bold">RP. {saldoText}</p>
        <p
          className="text-white font-light text-sm hover:cursor-pointer"
          onClick={toggleVisibility}
        >
          Close Balance
        </p>
      </div>
    </div>
  );
};

BalanceCard.propTypes = {
  saldo: PropTypes.number,
};

export default BalanceCard;
