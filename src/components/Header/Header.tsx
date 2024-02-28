import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
// types
import { HeaderProps } from "./HeaderTypes";

export const Header: FC<HeaderProps> = ({ listOfMenu = [] }) => {
  return (
    <header className={`${styles["header"]}`}>
      <div>
        <h1>Sweeft Task</h1>
      </div>

      <div className={`${styles['menuWrapper']}`}>
        {listOfMenu
          ? listOfMenu.map((item) => {
              return (
                <Link
                  key={item.id}
                  className={`${styles["menuElement"]}`}
                  to={item.path}
                >
                  {item.title}
                </Link>
              );
            })
          : null}
      </div>
    </header>
  );
};
