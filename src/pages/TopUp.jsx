import React, { useState } from "react";
import CardName from "../components/Card/NameCard";
import CardSaldo from "../components/Card/BalanceCard";
import Navbar from "../Layouts/Navbar";

const TopUp = () => {
  const title = "Top Up";
  document.title = "SIMS PPOB " + title;

  const [topUpAmount, setTopUpAmount] = useState(""); // State untuk menyimpan nominal top up yang dimasukkan oleh pengguna
  const [validationError, setValidationError] = useState(""); // State untuk pesan error

  const handleTopUpChange = (e) => {
    const input = e.target.value;

    // Validasi agar hanya menerima angka dengan format Rupiah
    if (/^\d*(,\d*)?$/.test(input) || input === "") {
      // Menghilangkan karakter selain angka
      const cleanValue = input.replace(/\D/g, "");

      // Mengonversi ke format Rupiah dengan pemisah ribuan
      const formattedValue = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(cleanValue);

      // Set nilai ke state jika valid
      setTopUpAmount(formattedValue);

      // Validasi minimum dan maksimum nominal
      const numericValue = parseInt(cleanValue, 10);
      if (numericValue < 10000) {
        setValidationError("Nominal minimal adalah Rp 10,000");
      } else if (numericValue > 1000000) {
        setValidationError("Nominal maksimal adalah Rp 1,000,000");
      } else {
        setValidationError("");
      }
    }
  };

  const handleTopUpClick = (amount) => {
    setTopUpAmount(amount); // Update nilai topUpAmount saat tombol nominal diklik
    setValidationError(""); // Reset pesan error
  };

  const isTopUpDisabled = !topUpAmount || !!validationError;

  const handleTopUp = () => {
    // Simulasikan aksi top up atau panggil API top up di sini
    console.log(`Melakukan top up sebesar ${topUpAmount}`);
  };

  return (
    <>
      <Navbar title={title} />
      <div className="flex justify-between px-4 md:px-48 mt-10">
        <CardName name="Gina Sonia" />
        <CardSaldo saldo={12000} />
      </div>
      <div className="text-center font-light mt-20">Silahkan Masukkan</div>
      <div className="text-center font-bold">Nominal Top Up</div>

      {/* Input untuk memasukkan nominal top up */}
      <div className="flex justify-center mt-4">
        <input
          type="text"
          value={topUpAmount}
          onChange={handleTopUpChange}
          placeholder="Masukkan nominal top up"
          className={`border border-gray-300 rounded-md py-2 px-3 w-48 text-center focus:border-blue-500 ${
            validationError ? "border-red-500" : ""
          }`}
          style={{ outline: "none" }}
        />
      </div>
      {validationError && (
        <div className="text-red-500 text-center mt-2">{validationError}</div>
      )}

      {/* Tombol nominal */}
      <div className="flex justify-center mt-4">
        <button
          className={`mr-2 px-4 py-2 rounded-md text-black bg-white border border-gray-300`}
          onClick={() => handleTopUpClick("Rp 10,000")}
        >
          Rp 10,000
        </button>
        <button
          className={`mr-2 px-4 py-2 rounded-md  text-black bg-white border border-gray-300`}
          onClick={() => handleTopUpClick("Rp 20,000")}
        >
          Rp 20,000
        </button>
        <button
          className={`mr-2 px-4 py-2 rounded-md  text-black bg-white border border-gray-300`}
          onClick={() => handleTopUpClick("Rp 50,000")}
        >
          Rp 50,000
        </button>
        <button
          className={`mr-2 px-4 py-2 rounded-md  text-black bg-white border border-gray-300`}
          onClick={() => handleTopUpClick("Rp 100,000")}
        >
          Rp 100,000
        </button>
        <button
          className={`mr-2 px-4 py-2 rounded-md  text-black bg-white border border-gray-300`}
          onClick={() => handleTopUpClick("Rp 250,000")}
        >
          Rp 250,000
        </button>
        <button
          className={`px-4 py-2 rounded-md text-black bg-white border border-gray-300`}
          onClick={() => handleTopUpClick("Rp 1,000,000")}
        >
          Rp 1,000,000
        </button>
      </div>

      {/* Tombol "Top Up" */}
      <div className="flex justify-center mt-4">
        <button
          className={`px-4 py-2 rounded-md text-white ${
            isTopUpDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
          onClick={handleTopUp}
          disabled={isTopUpDisabled}
        >
          Top Up
        </button>
      </div>
    </>
  );
};

export default TopUp;
