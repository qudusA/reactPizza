import { useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
// import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  //   const isLoading = true;

  return (
    <section className="grid h-dvh grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <Main />
      <CartOverview />
      {/* <Footer /> */}
    </section>
  );
}
