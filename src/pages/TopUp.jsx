import React, { useState, useEffect } from "react";
import Navbar from "../Layouts/Navbar";
import CardName from "../components/Card/NameCard";
import CardSaldo from "../components/Card/BalanceCard";
import { API } from "../services/API";
import { useAppSelector, useAppDispatch } from "../services/hooks";
import { setToken } from "../services/feature/token";

const TopUp = () => {
  const title = "Top Up";
  document.title = "SIMS PPOB " + title;

  const [topUpAmount, setTopUpAmount] = useState("");
  const [validationError, setValidationError] = useState("");
  const [error, setError] = useState("");
  const token = useAppSelector((state) => state.token);
  const dispatch = useAppDispatch();

  const handleTopUpChange = (e) => {
    setTopUpAmount(e.target.value);
    setValidationError("");
  };

  const isTopUpDisabled = !topUpAmount || !!validationError;

  const handleTopUpClick = (amount) => {
    setTopUpAmount(amount);
    setValidationError("");
  };

  const handleTopUp = async () => {
    try {
      const response = await API.post(
        "/topup",
        { amount: topUpAmount },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.data && response.data.data.token) {
        dispatch(setToken(response.data.data.token));
        setError(""); // Clear any previous errors
      }
    } catch (error) {
      console.error("error: ", error);

      if (error.response && error.response.status === 401) {
        setError("Unauthorized. Please log in again."); // Handle unauthorized error
        // You may want to clear the token or redirect to a login page here
      } else {
        setError("An error occurred. Please try again."); // Handle other errors
      }
    }
  };

  return (
    <>
      <Navbar title={title} />
      <div className="flex justify-between px-4 md:px-48 mt-10">
        <CardName name="Gina Sonia" />
        <CardSaldo saldo={12000} />
      </div>

      <div className="mt-4 ml-52">
        <label htmlFor="topUpAmount" className="block font-semibold">
          Silahkan Masukkan Nominal Top Up
        </label>
        <input
          type="text"
          id="topUpAmount"
          value={topUpAmount}
          onChange={handleTopUpChange}
          placeholder="Masukkan nominal top up"
          className={`border border-gray-300 rounded-md py-2 px-3 w-48 text-center mt-5 focus:border-gray-300 ${
            validationError ? "border-red-500" : ""
          }`}
          style={{ outline: "none", width: "40%" }}
        />
        {validationError && (
          <div className="text-red-500 text-center mt-2">{validationError}</div>
        )}
      </div>

      <div className="flex justify-start ml-52 mt-4">
        <button
          className={`px-4 py-2 rounded-md text-white ${
            isTopUpDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gray-400 hover:bg-gray-400"
          }`}
          style={{ width: "40%" }}
          onClick={handleTopUp}
          disabled={isTopUpDisabled}
        >
          Top Up
        </button>
      </div>

      {error && (
        <div className="text-red-500 text-center mt-4">{error}</div>
      )}

      <div className="flex justify-center ml-72 mt-[-8%]">
        <div className="mt-4">
          <div className="flex space-x-4 w-full">
            {/* button nominal */}
            <NominalButton value="Rp 10,000" onClick={handleTopUpClick} />
            <NominalButton value="Rp 20,000" onClick={handleTopUpClick} />
          </div>
          <div className="flex space-x-4 mt-2">
            <NominalButton value="Rp 50,000" onClick={handleTopUpClick} />
            <NominalButton value="Rp 100,000" onClick={handleTopUpClick} />
          </div>
          <div className="flex space-x-4 mt-2">
            <NominalButton value="Rp 250,000" onClick={handleTopUpClick} />
            <NominalButton value="Rp 500,000" onClick={handleTopUpClick} />
          </div>
        </div>
      </div>
    </>
  );
};

const NominalButton = ({ value, onClick }) => (
  <button
    className={`px-4 py-2 rounded-md text-black bg-white border border-gray-300`}
    onClick={() => onClick(value)}
  >
    {value}
  </button>
);

export default TopUp;





