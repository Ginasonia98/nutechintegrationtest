import React, { useState } from "react";
import logo from "../../assets/image/Logo.png";
import { API } from "../../services/API";
import { useAppSelector } from "../../services/hooks";
import { setToken } from "../../services/feature/token";
import { MdOutlineAlternateEmail, MdLock } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Notification from "./Notification"; // Perubahan impor di sini

// Impor gambar bannerLogin
import bannerLogin from "../../assets/image/bannerLogin.png";

const FormLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState(null);
  const [visiblePass, setVisiblePass] = useState(false);
  const dispatch = useDispatch();
  const token = useAppSelector((state) => state.token.token);

  const navigate = useNavigate();

  const isEmailValid = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    // Check if password is at least 8 characters long
    return password.length >= 8;
  };

  const Login = async (event) => {
    event.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (!isEmailValid(username)) {
      // Email is not valid
      setEmailError("Email tidak valid.");
      return;
    }

    if (!isPasswordValid(password)) {
      // Password is not valid
      setPasswordError("Password harus memiliki setidaknya 8 karakter.");
      return;
    }

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

      setMessage({
        styles:
          "flex items-center p-4 mb-4 text-white rounded-lg bg-green-200 dark:bg-gray-800 dark:text-white-400",
        message: res.data.message,
      });

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      console.log("error: ", error);

      setMessage({
        styles:
          "flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400",
        message: error.response.data.message,
      });
    }
  };

  const title = "Login";
  document.title = "SIMS PPOB | " + title;

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-2/5 px-8 py-8 md:px-20">
        <div className="flex justify-center items-center">
          <img src={logo} alt="logo" />
          <h4 className="pl-3 font-semibold">SIMS PPOB</h4>
        </div>
        <div className="my-8 flex items-center flex-col">
          <p className="font-bold text-xl">Lengkapi Data untuk</p>
          <p className="font-bold text-xl">membuat akun</p>
        </div>
        <form className="flex flex-col my-4" onSubmit={Login}>
          <div className="relative mb-4">
            <div className="flex items-center">
              <MdOutlineAlternateEmail className="mr-2 text-gray-500" />
              <input
                className="w-full px-6 py-2 border rounded-lg focus:outline-none focus:border-black"
                type="text"
                placeholder="Masukkan Email Anda"
                onChange={(e) => {
                  setUsername(e.target.value);
                  setEmailError(""); // Menghapus pesan kesalahan ketika pengguna mulai mengetik
                }}
              />
            </div>
            {emailError && (
              <p className="text-red-800 text-sm mt-1">{emailError}</p>
            )}
          </div>

          <div className="relative mb-4">
            <div className="flex items-center">
              <MdLock className="mr-2 text-gray-500" />
              <input
                className="w-full px-6 py-2 border rounded-lg focus:outline-none focus:border-black pr-12"
                type={visiblePass ? "text" : "password"}
                placeholder="Masukkan password anda"
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError(""); // Menghapus pesan kesalahan ketika pengguna mulai mengetik
                }}
              />
              <button
                onClick={() => setVisiblePass(!visiblePass)}
                className="absolute right-0 top-0 mt-4 mr-2"
              >
                {visiblePass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-800 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          <button
            className={`${
              !isPasswordValid(password)
                ? "bg-red-800 text-white"
                : "bg-red-800 hover:bg-red-600 text-white"
            } w-full px-3 py-2 rounded-[5px] `}
            type="submit"
            disabled={!isPasswordValid(password) || !isEmailValid(username)}
          >
            Masuk
          </button>
        </form>
        <div className="w-full flex justify-center mt-4">
          <p>
            Belum punya akun? Registrasi
            <span className="text-lg text-red-500 font-medium ml-1">
              <Link to="/register">di sini</Link>
            </span>
          </p>
        </div>
        {message && <Notification {...message} />}{" "}
        {/* Menampilkan pesan kesalahan */}
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
