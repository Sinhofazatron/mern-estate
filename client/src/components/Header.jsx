import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { useEffect, useState } from 'react';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

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
          onSubmit={handleSubmit}
        >
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            type="text"
            placeholder="Поиск..."
            className="bg-transparent py-[0.1rem] px-[0.3rem] rounded-lg focus:outline-none w-24 sm:w-64"
          />
          <button><FaSearch className="text-slate-600" /></button>
        </form>
        <ul className="flex gap-4 items-center">
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
          <Link to="/profile">
            {currentUser ? (
              <HiOutlineUserCircle
                size={24}
                className="text-slate-600 hover:text-slate-700 transition mt-[0.1rem]"
              />
            ) : (
              <li className="text-slate-700 hover:bg-slate-300 transition px-[0.45rem] pb-[0.15rem] cursor-pointer rounded-md">
                Войти
              </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
