import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../service/apiRestorant";
import MenuItem from "./MenuItem";

export default function Menu() {
  const menu = useLoaderData();

  return (
    <ul className="divide-y-2 divide-stone-200">
      {menu.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}
