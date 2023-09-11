import React, { useState } from "react";
import fotoProfile from "../../assets/image/ProfilePhoto.png";
import { useAppSelector } from "../../services/hooks";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom"; // Gunakan useNavigate

const FormProfile = () => {
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user.user);
  const navigate = useNavigate(); // Gunakan useNavigate

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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (validateInputs()) {
      dispatch(updateUser(editedUser)); // Panggil tindakan Redux untuk menyimpan perubahan
      setIsEditing(false);
      alert("Profil berhasil diperbarui"); // Tambahkan notifikasi berhasil
    }
  };

  const handleCancel = () => {
    // Reset nilai editedUser dengan data asli pengguna
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
      // Anda dapat menambahkan logika pengolahan berkas gambar di sini
      // Misalnya, Anda dapat menampilkan gambar yang dipilih atau mengunggahnya ke server
    }
  };

  const handleLogout = () => {
    // Lakukan logika logout seperti menghapus data pengguna
    // Setelah logout, alihkan pengguna ke halaman login
    navigate("/login"); // Gunakan navigate untuk mengarahkan ke halaman login
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

    // Validasi Email
    if (!editedUser.email || !editedUser.email.trim()) {
      errors.email = "Email harus diisi.";
      isValid = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(editedUser.email)
    ) {
      errors.email = "Email tidak valid.";
      isValid = false;
    }

    // Validasi Nama Depan
    if (!editedUser.first_name || !editedUser.first_name.trim()) {
      errors.first_name = "Nama Depan harus diisi.";
      isValid = false;
    }

    // Validasi Nama Belakang
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
        <img src={fotoProfile} alt="foto profil" />
        <h1 className="mt-2">Edit Photo</h1>
        <h1 className="text-xl font-semibold">
          {user?.first_name + " " + user?.last_name}
        </h1>
      </div>
      <form className="w-1/3">
        <div className="mb-4">
          <label
            htmlFor="profileImage"
            className="cursor-pointer text-blue-500 hover:underline"
          >
            Unggah Foto
          </label>
          <input
            type="file"
            id="profileImage"
            name="profileImage"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-bold mb-2"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={editedUser.email}
            readOnly={!isEditing}
            className={`border rounded w-full py-2 px-3 ${
              validationErrors.email ? "border-red-500" : ""
            }`}
            placeholder="Masukkan alamat email Anda"
            onChange={handleChange}
          />
          {validationErrors.email && (
            <p className="text-red-500">{validationErrors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="first_name"
            className="block text-gray-700 font-bold mb-2"
          >
            Nama Depan:
          </label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={editedUser.first_name}
            readOnly={!isEditing}
            className={`border rounded w-full py-2 px-3 ${
              validationErrors.first_name ? "border-red-500" : ""
            }`}
            placeholder="Masukkan Nama Depan Anda"
            onChange={handleChange}
          />
          {validationErrors.first_name && (
            <p className="text-red-500">{validationErrors.first_name}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="last_name"
            className="block text-gray-700 font-bold mb-2"
          >
            Nama Belakang:
          </label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={editedUser.last_name}
            readOnly={!isEditing}
            className={`border rounded w-full py-2 px-3 ${
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
            style={{width:"100%"}}
            onClick={handleEdit}
          >
            Edit Profile
          </button>
        )}
      </form>
      <button
        className="rounded  py-2 px-3 text-white bg-red-500 hover:bg-red-800 font-semibold mt-2"
        style={{width:"33%"}}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default FormProfile;




