import { useState } from "react";
import { Link } from "react-router-dom";
import { LiaUserCogSolid } from "react-icons/lia";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserSuccess,
  updateUserStart,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
} from "../redux/user/userSlice";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";

export default function Profile() {
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [showListingsNotFound, setShowListingsNotFound] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();

      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      if (data.length === 0) {
        setShowListingsNotFound(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <div className="flex items-center justify-center mt-7">
        <LiaUserCogSolid className="text-slate-500 text-7xl " />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-9">
        <input
          onChange={handleChange}
          type="text"
          placeholder="Имя пользователя"
          defaultValue={currentUser.username}
          className="border p-3 rounded-lg focus:outline-slate-500"
          id="username"
        />
        <input
          onChange={handleChange}
          type="email"
          placeholder="Email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg focus:outline-slate-500"
          id="email"
        />
        <input
          onChange={handleChange}
          type="password"
          placeholder="Пароль"
          className="border p-3 rounded-lg focus:outline-slate-500"
          id="password"
        />
        <div className="flex items-center gap-5">
          <button
            disabled={loading}
            className=" mt-4 bg-slate-500 text-white p-3 rounded-lg uppercase hover:bg-slate-600 hover:shadow-lg transition min-w-[13rem] m-auto disabled:opacity-80 disabled:hover:bg-slate-500 disabled:hover:opacity-80 disabled:hover:shadow-none"
          >
            {loading ? "Загрузка.." : "Обновить данные"}
          </button>
          <Link
            className=" mt-4 bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:bg-green-800 hover:shadow-lg transition min-w-[13rem] m-auto"
            to={"/create-listing"}
          >
            Добавить объект
          </Link>
        </div>
      </form>
      <div className="flex justify-between mt-7 px-4 gap-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 hover:text-red-900 transition cursor-pointer"
        >
          Удалить аккаунт
        </span>
        <span
          onClick={handleSignOut}
          className="text-red-700 hover:text-red-900 transition cursor-pointer"
        >
          Выйти
        </span>
      </div>

      <div className="flex items-center justify-center">
        <p className="text-red-700 mt-5">{error ? error.message : ""}</p>
        <p className="text-green-700 mt-5">
          {updateSuccess ? "Данные пользователя обновлены!" : ""}
        </p>
      </div>
      <button
        onClick={handleShowListings}
        className="flex items-center justify-center text-green-700 mt-5 text-lg rounded-lg text-center hover:text-green-900  transition m-auto"
      >
        <span>Мои объекты</span>
      </button>
      <p className="text-red-700 mt-5">
        {showListingsError ? "Ошибка загрузки объекта" : ""}
      </p>
      <p className="text-red-700 mt-5">
        {showListingsNotFound ? "У Вас нет объектов" : ""}
      </p>

      {userListings &&
        userListings.length > 0 &&
        userListings.map((listing) => (
          <div
            key={listing._id}
            className="flex items-center justify-between rounded-lg border p-3 gap-4 mt-4"
          >
            <Link to={`/listing/${listing._id}`}>
              <img
                src={listing.imageUrls[0]}
                alt={listing.name}
                className="w-16 h-16 object-contain"
              />
            </Link>
            <Link
              className="text-slate-700 font-semibold hover:underline transition truncate flex-1"
              to={`/listing/${listing._id}`}
            >
              <p>{listing.name}</p>
            </Link>
            <div className="flex items-center gap-4">
              <Link to={`/update-listing/${listing._id}`} className='mt-1'>
                <button className=" text-green-700">
                  <FiEdit2 size={22} />
                </button>
              </Link>

              <button
                onClick={() => handleListingDelete(listing._id)}
                className=" text-red-700"
              >
                <AiOutlineDelete size={22} />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}
