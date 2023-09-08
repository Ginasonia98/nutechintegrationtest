import React, { useState } from "react";
import { BiSolidUser } from "react-icons/bi";
import { MdOutlineAlternateEmail, MdLock } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { API } from "../../services/API";
import logo from "../../assets/image/Logo.png";
import bannerLogin from "../../assets/image/bannerLogin.png"; // Import banner image
import Notif from "../Notification/Notification";

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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

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

      // Notification
      if (response.data.status === 0) {
        const alert = (
          <Notif
            message={response.data.message}
            styles="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          />
        );
        setMessage(alert);
      } else {
        const alert = (
          <Notif
            styles="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            message={response.data.message}
          />
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Notif
          styles="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          message={error.response.data.message}
        />
      );
      setMessage(alert);
      console.log(error);
      return;
    }
  };

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

        <form className="flex flex-col my-4" onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <input
              className="w-full px-4 py-2 border focus:outline-none focus:border-black"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Masukkan Email Anda"
            />
            <MdOutlineAlternateEmail className="absolute mt-[-28px] ml-1" />
          </div>
          <div className="relative mb-4">
            <input
              className="w-full px-4 py-2 border focus:outline-none focus:border-black"
              type="text"
              name="first_name"
              value={first_name}
              onChange={handleChange}
              placeholder="Nama Depan"
            />
            <BiSolidUser className="absolute mt-[-28px] ml-1" />
          </div>

          <div className="relative mb-4">
            <input
              className="w-full px-4 py-2 border focus:outline-none focus:border-black"
              type="text"
              name="last_name"
              value={last_name}
              onChange={handleChange}
              placeholder="Nama Belakang"
            />
            <BiSolidUser className="absolute mt-[-28px] ml-1" />
          </div>

          <div className="relative mb-4">
            <input
              className="w-full px-4 py-2 border focus:outline-none focus:border-black"
              type={visible ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Buat Password"
            />
            <MdLock className="absolute mt-[-28px] ml-1" />
            <button
              className="ml-[-30px] mt-2"
              onClick={() => setVisible(!visible)}
            >
              {visible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
          <div className="relative mb-4">
            <input
              className="w-full px-4 py-2 border focus:outline-none focus:border-black"
              type={visible2 ? "text" : "password"}
              placeholder="Konfirmasi Password"
            />
            <MdLock className="absolute mt-[-36px] ml-1" />
            <button
              className="ml-[-30px] mt-2"
              onClick={() => setVisible2(!visible2)}
            >
              {visible2 ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>

          <button
            className={`w-full px-3 py-2 rounded-[5px] ${
              password.length < 8
                ? "bg-gray-200 text-black"
                : "bg-red-800 hover:bg-red-600 text-white"
            } mt-4`}
            type="submit"
            disabled={password.length < 8}
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
      <div className="md:flex-1">
        <img
          className="h-[200px] md:h-[100vh] w-full object-cover"
          src={bannerLogin}
          alt="banner Login"
        />
      </div>
    </div>
  );
};

export default FormRegister;








