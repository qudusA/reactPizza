import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.name);

  function handleSubmit(e) {
    e.preventDefault();
    navigate(`/order/${orderId}`);
  }
  return (
    <header className="flex items-center justify-between bg-yellow-400 px-10 py-3">
      <Link className="font-sans tracking-[2px]" to={`/`}>
        PIZZA APP Co...
      </Link>

      <form action="" onSubmit={handleSubmit}>
        <input
          className="w-64 rounded-full bg-yellow-100 px-4 py-2 outline-none transition-all duration-300 placeholder:text-stone-400 focus:w-72 focus:ring-2 focus:ring-yellow-500"
          placeholder="search order id"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
      </form>
      {username && (
        <p className="font-semibold uppercase text-stone-900">{username}</p>
      )}
    </header>
  );
}
