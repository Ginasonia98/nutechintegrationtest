import React, { useState, useEffect } from "react";
import Navbar from "../Layouts/Navbar";
import CardName from "../components/Card/NameCard";
import CardSaldo from "../components/Card/BalanceCard";
import { API } from "../services/API";
import { useAppSelector, useAppDispatch } from "../services/hooks";
import { setToken } from "../services/feature/token";

const Transaction = () => {
  const title = "Transaction";
  document.title = "SIMS PPOB " + title;

  const [offset, setOffset] = useState(0);
  const limit = 10;
  const [transactions, setTransactions] = useState([]);
  const [paymentType, setPaymentType] = useState(""); // State untuk opsi pembayaran
  const [invoiceNumber, setInvoiceNumber] = useState(""); // State untuk invoice_number
  const [amount, setAmount] = useState(10000); // State untuk jumlah (format rupiah)

  const token = useAppSelector((state) => state.token);
  const dispatch = useAppDispatch();

  const handleShowMore = async () => {
    // ...
    // Kode handleShowMore yang sudah ada
    // ...
  };

  const handlePayment = async () => {
    try {
      console.log("Payment Type:", paymentType); // Tambahkan ini untuk melacak nilai paymentType
      console.log("Amount:", amount); // Tambahkan ini untuk melacak nilai amount

      const response = await API.post(
        "/transaction",
        {
          paymentType: paymentType, // Menggunakan opsi pembayaran yang dipilih
          amount: amount, // Menggunakan jumlah yang diisi (format rupiah)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && response.data.invoice_number) {
        setInvoiceNumber(response.data.invoice_number);
        // Reset opsi pembayaran dan jumlah setelah pembayaran berhasil
        setPaymentType("");
        setAmount(10000); // Reset jumlah ke 10.000 (format rupiah)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchInitialTransactions = async () => {
      // ...
      // Kode fetchInitialTransactions yang sudah ada
      // ...
    };

    fetchInitialTransactions();
  }, [offset, token]);

  // Fungsi untuk memformat input menjadi format rupiah
  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
    return formatter.format(value);
  };

  return (
    <>
      <Navbar title={title} />
      <div className="mt-10 mb-5 flex justify-between px-4 md:px-48">
        <CardName name="Gina Sonia" />
        <CardSaldo saldo={12000} />
      </div>

      {/* Keterangan Pembayaran */}
      <div className="mt-4 ml-56">
        <p className="font-semibold">Pembayaran</p>

        <select
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
          className="border rounded-md p-2 mt-2"
          style={{ width: "50%" }}
        >
          <option value="">Pilih Jenis Pembayaran</option>
          <option value="Pajak PBB">Pajak PBB</option>
          <option value="Listrik">Listrik</option>
          <option value="PDAM Berlangganan">PDAM Berlangganan</option>
          <option value="Pulsa">Pulsa</option>
          <option value="PGN Berlangganan">PGN Berlangganan</option>
          <option value="Musik Berlangganan">Musik Berlangganan</option>
          <option value="TV Berlangganan">TV Berlangganan</option>
          <option value="Paket Data">Paket Data</option>
          <option value="Voucher Game">Voucher Game</option>
          <option value="Voucher MAKANAN">Voucher MAKANAN</option>
          <option value="Qurban">Qurban</option>
          <option value="Zakat">Zakat</option>
        </select>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <select
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          className="border rounded-md p-2 mt-2 ml-56"
          style={{ width: "43%" }}
        >
          <option value={10000}>Rp 10.000</option>
          <option value={20000}>Rp 20.000</option>
          <option value={50000}>Rp 50.000</option>
          <option value={100000}>Rp 100.000</option>
          <option value={250000}>Rp 250.000</option>
          <option value={500000}>Rp 500.000</option>
        </select>
      </div>

      {invoiceNumber && (
        <div className="ml-52 mt-2">
          <p>
            Invoice Number: <strong>{invoiceNumber}</strong>
          </p>
        </div>
      )}
      <button
        className="bg-red-600 text-white px-4 py-2 rounded-md mt-6 ml-56"
        style={{ width: "43%" }}
        onClick={handlePayment}
        disabled={!paymentType || !amount}
      >
        Bayar
      </button>
      
    </>
  );
};

export default Transaction;
