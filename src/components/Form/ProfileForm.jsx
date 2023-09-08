import fotoProfile from "../../assets/image/ProfilePhoto.png";
import { useAppSelector } from "../../services/hooks";

const FormProfile = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <div>
        <img src={fotoProfile} alt="foto profil" />
        <h1 className="mt-2">Edit Photo</h1>
        <h1 className="text-xl font-semibold">{user?.first_name + " " + user?.last_name}</h1>
      </div>
      <form className="w-1/3">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user?.email}
            readOnly
            className="border rounded w-full py-2 px-3"
            placeholder="Masukkan alamat email Anda"
          />
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
            value={user?.first_name}
            readOnly
            className="border rounded w-full py-2 px-3"
            placeholder="Masukkan Nama Depan Anda"
          />
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
            value={user?.last_name}
            readOnly
            name="last_name"
            className="border rounded w-full py-2 px-3"
            placeholder="Masukkan Nama Belakang Anda"
          />
        </div>
        <button className="rounded w-full py-2 px-3 mb-2 text-red-700 border-2 border-red-800 font-semibold hover:border-red-400">
          Edit Profile
        </button>
        <button className="rounded w-full py-2 px-3 text-white bg-red-500 hover:bg-red-800 font-semibold">
          Logout
        </button>
      </form>
    </div>
  );
};

export default FormProfile;
