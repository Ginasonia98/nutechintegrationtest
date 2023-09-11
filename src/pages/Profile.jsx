import React, { useEffect } from "react";
import FormProfile from "../components/Form/ProfileForm";
import Navbar from "../Layouts/Navbar";
import { Outlet } from "react-router-dom";
import axios from "axios"; // Import Axios
import { useAppSelector } from "../services/hooks"; // Import useAppSelector to get the token

const Profile = () => {
  const title = "Profile";
  document.title = "SIMS PPOB " + title;

  const token = useAppSelector((state) => state.token); // Get the JWT token from your Redux store

  // Function to fetch the user's name from the /profile API
  const fetchProfileData = async () => {
    try {
      const response = await axios.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Assuming the API response contains the user's name in the 'name' field
      // You can use 'response.data.name' here if needed
    } catch (error) {
      // Handle any errors here
      console.error("Error fetching profile data:", error);
    }
  };

  // Fetch the user's profile data when the component mounts
  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <>
      <Navbar title={title} />
      <FormProfile />
      <Outlet />
    </>
  );
};

export default Profile;


