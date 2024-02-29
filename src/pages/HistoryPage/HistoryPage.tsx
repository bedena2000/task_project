import KeywordList from "../../components/KeywordList/KeywordList";
import { Header } from "../../components/Header/Header";
import { menuItems } from "../../helpers";
import styles from "./HistoryPage.module.css";

function HistoryPage() {
  
  return (
    <div className={`${styles["historyPage"]}`}>
      <div className="main-container">
        <Header listOfMenu={menuItems} />
        <KeywordList />
      </div>
    </div>
  );
}

export default HistoryPage;
