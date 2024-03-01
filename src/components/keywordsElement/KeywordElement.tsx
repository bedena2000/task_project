import React, { FC, useContext } from "react";
import styles from "./KeywordElement.module.css";
import { KeyWordProps } from "./KeywordElementType";
import { MainAppContext } from "../../context";
import { Link } from "react-router-dom";

export const KeywordElement: FC<KeyWordProps> = ({ keywordString }) => {
  return (
    <Link
      to={`/history/list/?keywordName=${keywordString}`}
      className={`${styles["keywordElement"]}`}
    >
      {keywordString}
    </Link>
  );
};
