import { Link, useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  return (
    <div>
      <p>some thing when wrong 😒</p>
      <p>{error.data ? error.data.split(":")[1] : error.message}</p>
      <Link to="/">&larr; go back to home</Link>
    </div>
  );
}
