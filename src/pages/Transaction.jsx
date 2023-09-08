import React from "react";
import CardName from "../components/Card/NameCard";
import CardSaldo from "../components/Card/BalanceCard";
import Navbar from "../Layouts/Navbar";

const Transaction = () => {
  const title = "Transaction";
  document.title = "SIMS PPOB " + title;
  return (
    <>
      <Navbar title={title} />
      <div className="flex justify-between px-4 md:px-48 h-[300px] border-2 border-black bg-cyan-200">
        <CardName name="Irawan" />
        <CardSaldo saldo={12000} />
      </div>
      <div>Transaction</div>
    </>
  );
};

export default Transaction;