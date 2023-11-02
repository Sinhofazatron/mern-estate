import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-2">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap ">
            <span className="text-slate-500">Золотой</span>
            <span className="text-slate-700">Ключ</span>
          </h1>
        </Link>
        <form
          className="bg-slate-100 py-[0.1rem] px-[0.3rem] rounded-lg flex items-center"
          action=""
        >
          <input
            type="text"
            placeholder="Поиск..."
            className="bg-transparent py-[0.1rem] px-[0.3rem] rounded-lg focus:outline-none w-24 sm:w-64"
          />
          <FaSearch className="text-slate-600" />
        </form>
        <ul className="flex gap-4 ">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:bg-slate-300 transition px-[0.45rem] pb-[0.15rem] cursor-pointer rounded-md">
              На главную
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:bg-slate-300 transition px-[0.45rem] pb-[0.15rem] cursor-pointer rounded-md">
              О нас
            </li>
          </Link>
          <Link to="/sign-in">
            <li className="text-slate-700 hover:bg-slate-300 transition px-[0.45rem] pb-[0.15rem] cursor-pointer rounded-md">
              Войти
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
}
