import { useContext } from "react";
import styles from "./Background.module.css";
import { MainAppContext } from "../../context";

export const Background = () => {
  const currentContext = useContext(MainAppContext);

  return (
    <div
      onClick={() => currentContext.changeCurrentModal()}
      className={`${styles["background"]}`}
    ></div>
  );
};
