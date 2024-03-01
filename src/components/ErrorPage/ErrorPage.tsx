import styles from "./ErrorPage.module.css";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className={`${styles["errorPage"]}`}>
      <div>
        <div>😓 ესეთი გვერდი არარსებობს,</div>
        <Link to="/" className={`${styles["errorButton"]}`}>
          მთავარი გვერდი
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
