import React from "react";
import FormProfile from "../components/Form/ProfileForm";
import Navbar from "../Layouts/Navbar";
import { Outlet } from "react-router-dom";

const Profile = () => {
  const title = "Profile";
  document.title = "SIMS PPOB " + title;
  return (
    <>
      <Navbar title={title} />
      <FormProfile />
      <Outlet />
    </>
  );
};

export default Profile;