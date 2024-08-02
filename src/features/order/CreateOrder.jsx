import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { createOrder } from "../../service/apiRestorant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCartItems, getCart, getTotalCartPrice } from "../cart/cartSlice";
import store from "../../store";
import { formatCurrency } from "../../utils/helper";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

export default function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const dispatch = useDispatch();
  const formError = useActionData();
  const {
    username,
    address,
    status: addressStatus,
    position,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const cart = useSelector(getCart);
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const isAddressLoading = addressStatus === "loading";

  if (cart.length === 0)
    return (
      <div className="mt-4">
        <p>no item in cart</p>
        <Link
          className="mt-4 inline-block text-blue-400 transition-all duration-300 hover:text-blue-500 hover:underline hover:underline-offset-1"
          to="/menu"
        >
          &larr; Back to menu
        </Link>
      </div>
    );

  function handleGetPosition(e) {
    e.preventDefault();
    console.log(formError, errorAddress);
    dispatch(fetchAddress());
  }

  return (
    <div className="p-2 tracking-wider">
      <h2 className="mb-10 mt-6 text-xl font-semibold">
        Ready to order? Lets go!
      </h2>

      <Form method="POST" className="">
        <div className="mb-7 flex justify-between">
          <label className="capitalize">First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={username}
            required
            className="w-[38rem] rounded-full bg-white px-8 py-2 outline-none ring-1 ring-stone-200 transition-all duration-300 placeholder:text-stone-400 focus:ring-[3px] focus:ring-yellow-400 focus:ring-offset-2"
          />
        </div>

        <div className="mb-4 flex justify-between">
          <label className="capitalize">Phone number</label>
          <input
            type="tel"
            name="phone"
            required
            className="w-[38rem] rounded-full bg-white px-8 py-2 outline-none ring-1 ring-stone-200 transition-all duration-300 placeholder:text-stone-400 focus:ring-[3px] focus:ring-yellow-400 focus:ring-offset-2"
          />
        </div>
        <div className="flex items-center justify-end">
          {actionData?.phone && (
            <p className="mb-4 w-fit rounded-full bg-red-400 px-2 py-1 text-center">
              {actionData.phone}
            </p>
          )}
        </div>

        <div className="relative mb-4 flex justify-between">
          {!position.latitude && !position.longitude ? (
            <Button
              disabled={isAddressLoading}
              onClick={handleGetPosition}
              type="medium"
            >
              {isAddressLoading ? `loading...` : `get position`}
            </Button>
          ) : null}
          <label className="capitalize">Address</label>
          <input
            type="text"
            name="address"
            required
            disabled={isAddressLoading}
            className="w-[38rem] rounded-full bg-white px-8 py-2 outline-none ring-1 ring-stone-200 transition-all duration-300 placeholder:text-stone-400 focus:ring-[3px] focus:ring-yellow-400 focus:ring-offset-2"
            defaultValue={address}
          />
        </div>
        <input
          type="hidden"
          name="location"
          value={
            position.latitude && position.longitude
              ? `${position.latitude}, ${position.longitude}`
              : ""
          }
        />

        <div className="mb-12 flex items-center space-x-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 bg-yellow-400 accent-yellow-400 focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => {
              return setWithPriority(e.target.checked);
            }}
          />
          <label className="font-semibold" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input
            type="hidden"
            name="cart"
            value={JSON.stringify(cart)}
            readOnly
          />
          <Button type={"primaryLink"} disabled={isSubmitting}>
            {isSubmitting
              ? "submitting..."
              : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const newObj = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  const isValid = isValidPhone(newObj.phone);
  if (!isValid)
    errors.phone =
      "kindly input a valid phone number, as we might need to reach out to you";

  if (Object.keys(errors).length > 0) return errors;

  const order = await createOrder(newObj);

  store.dispatch(clearCartItems());

  return redirect(`/order/${order.id}`);
}
