import React, { useEffect } from "react";
import { useAppSelector } from "../services/hooks";
import { API } from "../services/API";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { setBalance } from "../redux/slices/balanceSlice";

import CardBanner from "../components/Card/BannerCard";
import CardLayanan from "../components/Card/ServiceCard";
import CardName from "../components/Card/NameCard";
import CardSaldo from "../components/Card/BalanceCard";
import Navbar from "../Layouts/Navbar";

const Home = () => {
  const title = "Home";
  document.title = "SIMS PPOB | " + title;

  const dispatch = useDispatch();
  const token = useAppSelector((state) => state.token.token);
  const user = useAppSelector((state) => state.user.user);
  const saldo = useAppSelector((state) => state.balance.balance);

  useEffect(() => {
    profiles();
    balance();
  }, [token]);

  const profiles = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await API.get("profile", config);
      dispatch(setUser(res.data.data));
      console.log(res);
    } catch (err) {
      console.log("error : ", err);
    }
  };

  const balance = async () => {
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const res = await API.get("balance", config);
      dispatch(setBalance(res.data.data));
      console.log(res);
    } catch (err) {
      console.log("error : ", err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-between px-4 md:px-48 mt-4">
        <CardName name={`${user?.first_name || ""} ${user?.last_name || ""}`} />
        <CardSaldo saldo={saldo?.balance || 0} />
      </div>
      <CardLayanan />
      <CardBanner />
    </>
  );
};

export default Home;
