import React, { useState } from "react";
import logo from "../../assets/image/Logo.png";
import { API } from "../../services/API";
import { useAppSelector } from "../../services/hooks";
import { setToken } from "../../services/feature/token";
import { MdOutlineAlternateEmail, MdLock } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Notif from "../Notification/Notification";

// Impor gambar bannerLogin
import bannerLogin from "../../assets/image/bannerLogin.png";

const FormLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [visiblePass, setVisiblePass] = useState(false);
  const dispatch = useDispatch();
  const token = useAppSelector((state) => state.token.token);

  const navigate = useNavigate();

  const Login = async (event) => {
    event.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    let data = {
      email: username,
      password: password,
    };
    try {
      const res = await API.post("login", data, config);
      dispatch(setToken(res.data.data.token));

      const alert = (
        <Notif
          styles="flex items-center p-4 mb-4 text-white rounded-lg bg-green-200 dark:bg-gray-800 dark:text-white-400"
          message={res.data.message}
        />
      );

      setMessage(alert);

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      console.log("error: ", error);

      const alert = (
        <Notif
          styles="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          message={error.response.data.message}
        />
      );

      setMessage(alert);
    }
  };

  const title = "Login";
  document.title = "SIMS PPOB | " + title;

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-2/5 px-8 py-8 md:px-20 md:py-20">
        <div className="flex justify-center items-center">
        <img src={logo} alt="logo" />
          <h4 className="pl-3 font-semibold">SIMS PPOB</h4>
        </div>
        <div className="my-8 flex items-center flex-col">
          <p className="font-bold text-xl">Lengkapi Data untuk</p>
          <p className="font-bold text-xl">membuat akun</p>
        </div>

        {/* Pertahankan form ini */}
        <form className="flex flex-col my-4" onSubmit={Login}>
          <div className="relative">
            <input
              className="w-full px-6 py-2 border rounded-lg focus:outline-none focus:border-black mb-3"
              type="email"
              placeholder="Masukan Email Anda"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <p className="absolute mt-[-40px] ml-1">
              <MdOutlineAlternateEmail />
            </p>
          </div>

          <div className="relative">
            <input
              className="w-full px-6 py-2 border rounded-lg focus:outline-none focus:border-black mb-9"
              type={visiblePass ? "text" : "password"}
              placeholder="Masukan password anda"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <p className="absolute mt-[-63px] ml-1">
              <MdLock />
            </p>
            <button
              onClick={() => setVisiblePass(!visiblePass)}
              className="absolute ml-[-30px] mt-4"
            >
              {visiblePass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
          <button
            className={`${
              password.length < 8
                ? "bg-red-800 text-white"
                : "bg-red-800 hover:bg-red-600 text-white"
            } w-full px-3 py-2 rounded-[5px] `}
            type="submit"
            disabled={password.length < 8}
          >
            Masuk
          </button>
        </form>
        {/* Akhir bagian form */}
        <div className="w-full flex justify-center mt-4">
          <p>
            Belum punya akun? Registrasi
            <span className="text-lg text-red-500 font-medium ml-1">
              <Link to="/register">di sini</Link>
            </span>
          </p>
        </div>
        {message && message}
      </div>
      <div className="md:flex-1">
        <img
          className="h-[500px] md:h-[100vh] w-full object-cover"
          src={bannerLogin}
          alt="banner Login"
        />
      </div>
    </div>
  );
};

export default FormLogin;
