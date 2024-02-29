import styles from "./MainPage.module.css";

// Components
import { Header } from "../../components/Header/Header";
import { PhotoList } from "../../components/PhotoList/PhotoList";
// Helpers
import { menuItems } from "../../helpers";
import { useContext } from "react";
import { MainAppContext } from "../../context";
import { Background } from "../../components/Background/Background";
import { Modal } from "../../components/Modal/Modal";
import Search from "../../components/Search/Search";

export default function MainPage() {
  const currentContext = useContext(MainAppContext);

  return (
    <div className={`${styles["mainPage"]}`}>
      <div className="main-container">
        <Header listOfMenu={menuItems} />
        <Search />
        <PhotoList />
        {currentContext.isModal && <Background />}
        {currentContext.isModal && <Modal />}
      </div>
    </div>
  );
}
