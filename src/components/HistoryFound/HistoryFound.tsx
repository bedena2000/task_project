import React, { useEffect, useContext, useState } from "react";
import styles from "./HistoryFound.module.css";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MainAppContext } from "../../context";
import { PhotoElementState } from "../PhotoList/PhotoList";
import { PhotoItem } from "../PhotoItem/PhotoItem";
import { useDetectEnd } from "../../hooks/useDetectEnd";

const HistoryFound = () => {
  const [photoList, setPhotoList] = useState<PhotoElementState[] | []>([]);
  const currentContext = useContext(MainAppContext);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const keywordName = params.get("keywordName");
  const { isEnd } = useDetectEnd();
  console.log(isEnd);
  useEffect(() => {
    if (keywordName && keywordName.length > 0) {
      const checkIfExist = currentContext.history.keywords.find((item) => {
        return item.name === keywordName;
      })?.content;
      if (checkIfExist && checkIfExist?.length > 0) {
        setPhotoList(checkIfExist);
      }
    }
  }, []);

  console.log(photoList);

  return (
    <div className={`${styles["historyFoundWrapper"]}`}>
      <Link to={"/history"} className={`${styles["goBack"]}`}>
        <FaArrowAltCircleLeft />
        Keywords
      </Link>
      <h2 className={`${styles["pageTitle"]}`}>{keywordName && keywordName}</h2>
      <div>
        {photoList ? (
          photoList.length === 0 ? (
            <h2 className={`${styles["ErrorMessage"]}`}>
              😓 სურათები სახელით {keywordName} ვერ მოიძებნა, სცადეთ სხვა სახელი
              ან დაარეფრეშეთ გვერდი
            </h2>
          ) : null
        ) : null}
      </div>
      <div className={`${styles["photoListWrapper"]}`}>
        {photoList && photoList.length > 0
          ? photoList.map((item) => {
              const uniqueKey = Math.random();
              return (
                <PhotoItem
                  key={`${uniqueKey} - ${item.urls.regular}`}
                  alt_description={item.alt_description}
                  created_at={item.created_at}
                  id={item.id}
                  likes={item.likes}
                  picturePath={item.urls.regular}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default HistoryFound;
