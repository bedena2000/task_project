import styles from "./ScrollUp.module.css";
import { FaArrowUp } from "react-icons/fa";
export const ScrollUp = () => {
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div onClick={handleScroll} className={`${styles["scrollUp"]}`}>
      <FaArrowUp color="white" size={30} />
    </div>
  );
};
