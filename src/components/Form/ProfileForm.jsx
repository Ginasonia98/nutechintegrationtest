import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../services/hooks"; // Menggunakan useAppDispatch
import { updateUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios untuk melakukan permintaan HTTP
import { MdOutlineAlternateEmail } from "react-icons/md";
import { BiSolidUser } from "react-icons/bi";

const FormProfile = () => {
  const dispatch = useAppDispatch(); // Menggunakan useAppDispatch
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    email: user?.email || "",
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
  });

  const [validationErrors, setValidationErrors] = useState({
    email: "",
    first_name: "",
    last_name: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [photoUpdated, setPhotoUpdated] = useState(false);

  useEffect(() => {
    if (user?.profile_image) {
      setProfileImage(user.profile_image);
    }
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (validateInputs()) {
      const formData = new FormData();
      formData.append("profileImage", profileImage);

      try {
        // Ambil token JWT dari Redux store
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const token = useAppSelector((state) => state.token.token);

        // Konfigurasi untuk permintaan PUT ke endpoint /profile/update
        const config = {
          method: "PUT",
          url: "/profile/update", // Sesuaikan URL dengan backend Anda
          data: formData,
          headers: {
            Authorization: `Bearer ${token}`, // Tambahkan token JWT ke header
          },
        };

        // Lakukan permintaan PUT menggunakan Axios
        const response = await axios(config);

        if (response.status === 200) {
          // Menggunakan updateUser dari Redux untuk memperbarui data pengguna
          dispatch(updateUser(response.data.user));

          setPhotoUpdated(true);
          setIsEditing(false);
          alert("Profil berhasil diperbarui");
        } else {
          console.error("Gagal memperbarui profil:", response.data.error);
          alert("Gagal memperbarui profil. Silakan coba lagi.");
        }
      } catch (error) {
        console.error("Gagal memperbarui profil:", error);
        alert("Gagal memperbarui profil. Silakan coba lagi.");
      }
    }
  };

  const handleCancel = () => {
    setEditedUser({
      email: user?.email || "",
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
    });
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 100 * 1024) {
        setProfileImage(URL.createObjectURL(file));
      } else {
        alert("Ukuran gambar melebihi 100 KB. Harap pilih gambar lain.");
      }
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    let isValid = true;
    const errors = {
      email: "",
      first_name: "",
      last_name: "",
    };

    if (!editedUser.email || !editedUser.email.trim()) {
      errors.email = "Email harus diisi.";
      isValid = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(editedUser.email)
    ) {
      errors.email = "Email tidak valid.";
      isValid = false;
    }

    if (!editedUser.first_name || !editedUser.first_name.trim()) {
      errors.first_name = "Nama Depan harus diisi.";
      isValid = false;
    }

    if (!editedUser.last_name || !editedUser.last_name.trim()) {
      errors.last_name = "Nama Belakang harus diisi.";
      isValid = false;
    }

    setValidationErrors(errors);
    return isValid;
  };

  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <div>
        <label
          htmlFor="profileImage"
          className="cursor-pointer text-blue-500 hover:underline"
        >
          <img
            src={profileImage || "/path/to/your/default/profile/image.jpg"}
            alt="foto profil"
            style={{ maxWidth: "100px", width: "100%", height: "auto" }}
          />
        </label>
        {photoUpdated && (
          <p className="text-green-500 mt-2">
            Foto profil berhasil diperbarui!
          </p>
        )}
        <h1 className="mt-2">Edit Photo</h1>
        <h1 className="text-xl font-semibold">
          {user?.first_name + " " + user?.last_name}
        </h1>
      </div>
      <form className="w-1/3">
        <div className="mb-4">
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        <div className="mb-4 relative">
          <MdOutlineAlternateEmail className="absolute left-3 top-2 h-5 w-5 text-gray-500" />
          <input
            type="email"
            id="email"
            name="email"
            value={editedUser.email}
            readOnly={!isEditing}
            className={`border rounded pl-10 w-full py-2 px-3 ${
              validationErrors.email ? "border-red-500" : ""
            }`}
            placeholder="Masukkan alamat email Anda"
            onChange={handleChange}
          />
          {validationErrors.email && (
            <p className="text-red-500">{validationErrors.email}</p>
          )}
        </div>

        <div className="mb-4 relative">
          <BiSolidUser className="absolute left-3 top-2 h-5 w-5 text-gray-500" />
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={editedUser.first_name}
            readOnly={!isEditing}
            className={`border rounded pl-10 w-full py-2 px-3 ${
              validationErrors.first_name ? "border-red-500" : ""
            }`}
            placeholder="Masukkan Nama Depan Anda"
            onChange={handleChange}
          />
          {validationErrors.first_name && (
            <p className="text-red-500">{validationErrors.first_name}</p>
          )}
        </div>

        <div className="mb-4 relative">
          <BiSolidUser className="absolute left-3 top-2 h-5 w-5 text-gray-500" />
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={editedUser.last_name}
            readOnly={!isEditing}
            className={`border rounded pl-10 w-full py-2 px-3 ${
              validationErrors.last_name ? "border-red-500" : ""
            }`}
            placeholder="Masukkan Nama Belakang Anda"
            onChange={handleChange}
          />
          {validationErrors.last_name && (
            <p className="text-red-500">{validationErrors.last_name}</p>
          )}
        </div>
        {isEditing ? (
          <div className="flex">
            <button
              className="rounded w-1/2 py-2 px-3 mb-2 text-red-700 border-2 border-red-800 font-semibold hover:border-red-400"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="rounded w-1/2 py-2 px-3 mb-2 ml-2 text-gray-700 border-2 border-gray-800 font-semibold hover:border-gray-400"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="rounded py-2 px-3 mb-2 text-red-700 border-2 border-red-800 font-semibold hover:border-red-400"
            style={{ width: "100%" }}
            onClick={handleEdit}
          >
            Edit Profile
          </button>
        )}
        <button
          className="rounded py-2 px-3 text-white bg-red-500 hover:bg-red-800 font-semibold mt-2"
          style={{ width: "100%" }}
          onClick={handleLogout}
        >
          Logout
        </button>
      </form>
    </div>
  );
};

export default FormProfile;
