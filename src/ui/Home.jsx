// import Input from "../features/user/CreateUser";

import CreateUser from "../features/user/CreateUser";

export default function Home() {
  return (
    <>
      <div className="mb-10 mt-14 text-center text-4xl font-semibold text-yellow-500">
        <span className="text-stone-900">The best pizza.</span>
        <br />
        <span className="">Straight out of the oven, straight to you.</span>
      </div>
      <CreateUser />
    </>
  );
}
