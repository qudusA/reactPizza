import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <main className="no-scrollbar mx-auto w-[60%] max-w-screen-xl overflow-y-scroll">
      <Outlet />
    </main>
  );
}
