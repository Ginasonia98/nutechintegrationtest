import React, { useState } from "react";
import { Link } from "react-router-dom";
import CardName from "../components/Card/NameCard";
import CardSaldo from "../components/Card/BalanceCard";
import Navbar from "../Layouts/Navbar";

const Transaction = () => {
  const title = "Transaction";
  document.title = "SIMS PPOB " + title;

  const [offset, setOffset] = useState(0);
  const limit = 10; // Jumlah data yang ditampilkan setiap kali "Show More" ditekan

  const handleShowMore = () => {
    // Menggunakan rumus n + limit untuk mengubah offset
    setOffset((prevOffset) => prevOffset + limit);
  };

  return (
    <>
      <Navbar title={title} />
      <div className="mt-10 mb-5 flex justify-between px-4 md:px-48">
        <CardName name="Gina Sonia" />
        <CardSaldo saldo={12000} />
      </div>
      <div className="font-bold text-center">All Transaction</div>

      {/* Tambahkan tombol "Show More" yang terhubung ke endpoint /history */}
      <div className="text-center mt-4">
        <Link
          to={`/history?offset=${offset}&limit=${limit}`} // Menggunakan offset dan limit sebagai query parameters
          className=" text-rose-500 px-4 py-2 rounded-md transition duration-300"
          onClick={handleShowMore}
        >
          Show More
        </Link>
      </div>
    </>
  );
};

export default Transaction;

