import { LiaUserCogSolid } from "react-icons/lia";

export default function Profile() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <div className="flex items-center justify-center mt-7">
        <LiaUserCogSolid className="text-slate-500 text-7xl " />
      </div>
      <form className="flex flex-col gap-4 mt-9">
        <input
          type="text"
          placeholder="Имя пользователя"
          className="border p-3 rounded-lg focus:outline-slate-500"
          id="username"
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg focus:outline-slate-500"
          id="email"
        />
        <input
          type="password"
          placeholder="Пароль"
          className="border p-3 rounded-lg focus:outline-slate-500"
          id="password"
        />
        <button className=" mt-4 bg-slate-500 text-white p-3 rounded-lg uppercase hover:bg-slate-600 hover:shadow-lg transition min-w-[15rem] m-auto disabled:opacity-80 disabled:hover:bg-slate-500 disabled:hover:opacity-80 disabled:hover:shadow-none">
          Обновить
        </button>
      </form>
      <div className='flex justify-end mt-7 gap-5'>
        <span className='text-red-700 hover:text-red-900 transition cursor-pointer'>Удалить аккаунт</span>
        <span className='text-red-700 hover:text-red-900 transition cursor-pointer'>Выйти</span>
      </div>
    </div>
  );
}
