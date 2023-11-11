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

export default function Profile() {
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
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
    </div>
  );
}
