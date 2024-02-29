import React, { FC, useContext } from "react";
import styles from "./KeywordElement.module.css";
import { KeyWordProps } from "./KeywordElementType";
import { MainAppContext } from "../../context";
import { useNavigate } from "react-router-dom";

export const KeywordElement: FC<KeyWordProps> = ({ keywordString }) => {
  const currentContext = useContext(MainAppContext);
  const navigate = useNavigate();
  const handleKeyword = () => {
    currentContext.changeSearchValue(keywordString);
    navigate("/");
  };

  return (
    <div onClick={handleKeyword} className={`${styles["keywordElement"]}`}>
      {keywordString}
    </div>
  );
};
