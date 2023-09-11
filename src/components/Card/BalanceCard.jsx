import React, { useEffect, useState } from "react";
import BackgroundSaldo from "../../assets/image/BackgroundSaldo.png";
import PropTypes from "prop-types";
import axios from "axios";
import { useAppSelector } from "../../services/hooks";

const BalanceCard = () => {
  const [saldo, setSaldo] = useState(null);
  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const token = useAppSelector((state) => state.token);

  const toggleVisibility = () => {
    setIsVisiblePass(!isVisiblePass);
  };

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        if (token) {
          const response = await axios.get("/balance", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          // Check if the response status is 200 (OK)
          if (response.status === 200) {
            // Assuming your API response has a 'saldo' property
            if (response.data && response.data.saldo !== undefined) {
              setSaldo(response.data.saldo);
            } else {
              console.error("Balance data not found in API response.");
              // Handle the absence of balance data here.
            }
          } else if (response.status === 401) {
            console.error("User is not authorized. Handle this case accordingly.");
            // Handle the case where the user is not authorized.
          } else {
            console.error("Unexpected response status:", response.status);
            // Handle other unexpected response statuses here.
          }
        } else {
          console.error("Token is not available. User not authorized.");
          // Handle the case where the token is not available or the user is not authorized.
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error("Resource not found. Check your API endpoint.");
          // Handle the 404 error, e.g., show an error message to the user.
        } else {
          console.error("Error:", error);
          // Handle other errors here.
        }
      }
    };

    fetchBalance();
  }, [token]);

  const saldoText = isVisiblePass ? (saldo !== null ? saldo : "......") : (
    <span className="text-5xl font-bold mt-[-24px] ml-2 absolute">......</span>
  );

  return (
    <div className="relative">
      <img src={BackgroundSaldo} alt="Background Banner Saldo" />
      <div className="absolute flex flex-col gap-[24px] mt-[-140px] ml-3 h-[120px]">
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


