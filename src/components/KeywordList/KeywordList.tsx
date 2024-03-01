import React, { useContext } from "react";
import styles from "./KeywordList.module.css";
import { MainAppContext } from "../../context";
import { KeywordElement } from "../keywordsElement/KeywordElement";

const KeywordList = () => {
  const currentContext = useContext(MainAppContext);

 

  return (
    <div className={`${styles["keywordPage"]}`}>
      {currentContext ? (
        currentContext.history.keywords.length > 0 ? (
          <div>
            <h2 className={`${styles["keywordTitle"]}`}>Keywords:</h2>
            <div className={`${styles["keywordListWrapper"]}`}>
              {currentContext.history.keywords.map((item) => {
                return (
                  <KeywordElement key={item.name} keywordString={item.name} />
                );
              })}
            </div>
          </div>
        ) : null
      ) : null}

      {currentContext.history.keywords.length === 0 ? (
        <h2 className={`${styles["keywordTitle"]}`}>არაფერი არ მოგიძებნიათ:</h2>
      ) : null}
    </div>
  );
};

export default KeywordList;
