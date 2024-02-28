import styles from "./MainPage.module.css";

// Components
import { Header } from "../../components/Header/Header";
import { PhotoList } from "../../components/PhotoList/PhotoList";
// Helpers
import { menuItems } from "../../helpers";

export default function MainPage() {
  return (
    <div className={`${styles["mainPage"]}`}>
      <div className="main-container">
        <Header listOfMenu={menuItems} />
        <PhotoList />
      </div>
    </div>
  );
}
