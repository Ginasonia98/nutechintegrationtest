import React, { useState } from "react";
import { BiSolidUser } from "react-icons/bi";
import { MdOutlineAlternateEmail, MdLock } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { API } from "../../services/API";
import logo from "../../assets/image/Logo.png";
import bannerLogin from "../../assets/image/bannerLogin.png"; // Import banner image
import Notif from "./Notification";

const FormRegister = () => {
  const title = "Registrasi";

  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [form, setForm] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  });

  const { email, first_name, last_name, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const isEmailValid = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    // Check if password is at least 8 characters long
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!isEmailValid(email) || !isPasswordValid(password)) {
        // Email or password is not valid
        setMessage(
          <Notif
            styles="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            message="Email tidak valid atau password harus memiliki setidaknya 8 karakter."
          />
        );
        return;
      }

      // Create Configuration Content-type here ...
      // Content-type: application/json
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Convert form data to string here ...
      const body = JSON.stringify(form);

      // Insert data user to database here ...
      const response = await API.post("registration", body, config);
      console.log(response);

      // Check response status
      if (response.status === 200) {
        // Registration successful
        const alert = (
          <Notif
            message={response.data.message}
            styles="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          />
        );
        setMessage(alert);
      } else {
        // Registration failed
        const alert = (
          <Notif
            styles="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            message={response.data.message}
          />
        );
        setMessage(alert);
      }
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : "Terjadi kesalahan pada server.";

      // Handle other errors
      const alert = (
        <Notif
          styles="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          message={errorMessage}
        />
      );
      setMessage(alert);
      console.log(error);
    }
  };

  document.title = "SIMS PPOB | " + title;
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-2/5 px-8 py-8 md:px-20 overflow-hidden">
        <div className="flex justify-center items-center">
          <img src={logo} alt="logo" />
          <h4 className="pl-3 font-semibold">SIMS PPOB</h4>
        </div>
        <div className="my-8 flex items-center flex-col">
          <p className="font-bold text-xl">Lengkapi Data untuk</p>
          <p className="font-bold text-xl">membuat akun</p>
        </div>
        <form className="flex flex-col my-4" onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <div className="flex items-center">
              <MdOutlineAlternateEmail className="mr-2 text-gray-500" />
              <input
                className="w-full px-4 py-2 border focus:outline-none focus:border-black"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Masukkan Email Anda"
              />
            </div>
          </div>
          <div className="relative mb-4">
            <div className="flex items-center">
              <BiSolidUser className="mr-2 text-gray-500" />
              <input
                className="w-full px-4 py-2 border focus:outline-none focus:border-black"
                type="text"
                name="first_name"
                value={first_name}
                onChange={handleChange}
                placeholder="Nama Depan"
              />
            </div>
          </div>

          <div className="relative mb-4">
            <div className="flex items-center">
              <BiSolidUser className="mr-2 text-gray-500" />
              <input
                className="w-full px-4 py-2 border focus:outline-none focus:border-black"
                type="text"
                name="last_name"
                value={last_name}
                onChange={handleChange}
                placeholder="Nama Belakang"
              />
            </div>
          </div>

          <div className="relative mb-4">
            <div className="flex items-center">
              <MdLock className="mr-2 text-gray-500" />
              <input
                className="w-full px-4 py-2 border focus:outline-none focus:border-black pr-10"
                type={visible ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Buat Password"
              />
              <button
                className="absolute right-0 top-0 mt-2 mr-2"
                onClick={() => setVisible(!visible)}
              >
                {visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
          </div>
          <div className="relative mb-4">
            <div className="flex items-center">
              <MdLock className="mr-2 text-gray-500" />
              <input
                className="w-full px-4 py-2 border focus:outline-none focus:border-black pr-10"
                type={visible2 ? "text" : "password"}
                placeholder="Konfirmasi Password"
              />
              <button
                className="absolute right-0 top-0 mt-2 mr-2"
                onClick={() => setVisible2(!visible2)}
              >
                {visible2 ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
          </div>

          <button
            className={`w-full px-3 py-2 rounded-[5px] ${
              !isPasswordValid(password) || !isEmailValid(email)
                ? "bg-gray-200 text-black"
                : "bg-red-800 hover:bg-red-600 text-white"
            } mt-4`}
            type="submit"
            disabled={!isPasswordValid(password) || !isEmailValid(email)}
          >
            Registrasi
          </button>
        </form>
        <div className="w-full flex justify-center mt-5">
          <p>
            Sudah punya akun ? Login
            <span className="text-lg text-red-500 font-medium ml-1">
              <Link to="/login"> di sini</Link>
            </span>
          </p>
        </div>
        {message && message}
      </div>
      <div className="md:flex-1 overflow-hidden">
        <img
          className="w-full h-screen object-cover"
          src={bannerLogin}
          alt="banner Login"
        />
      </div>
    </div>
  );
};

export default FormRegister;


