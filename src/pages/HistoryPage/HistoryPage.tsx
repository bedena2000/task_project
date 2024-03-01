import { Header } from "../../components/Header/Header";
import { menuItems } from "../../helpers";
import styles from "./HistoryPage.module.css";
import { Outlet } from "react-router-dom";

function HistoryPage() {
  return (
    <div className={`${styles["historyPage"]}`}>
      <div className="main-container">
        <Header listOfMenu={menuItems} />
        <Outlet />
      </div>
    </div>
  );
}

export default HistoryPage;
