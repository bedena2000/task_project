import { useState, useEffect, useContext } from "react";
import styles from "./PhotoList.module.css";
import { baseApiRoute } from "../../helpers";
import { PhotoItem } from "../PhotoItem/PhotoItem";
import { MainAppContext } from "../../context";
import { useDetectEnd } from "../../hooks/useDetectEnd";
import { ScrollUp } from "../ScrollUp/ScrollUp";

export interface PhotoElementState {
  alt_description: string;
  created_at: string;
  id: string;
  likes: number;
  urls: {
    regular: string;
  };
}

export const PhotoList = () => {
  const currentContext = useContext(MainAppContext);
  const [photoList, setPhotoList] = useState<PhotoElementState[] | []>([]);
  const [searchList, setSearchList] = useState<PhotoElementState[] | []>([]);
  const [page, setPage] = useState(1);
  const { isEnd } = useDetectEnd();

  useEffect(() => {
    if (currentContext.searchValue === "") {
      const fetchPhotos = async () => {
        const accessKey = import.meta.env.VITE_ACCESS_KEY as string;
        const finalUrl = `${baseApiRoute}/photos/?client_id=${accessKey}&page=${page}&per_page=20&order_by=popular`;
        const result = await fetch(finalUrl);
        const finalResult = await result.json();
        setPhotoList((prevState) => [...prevState, ...finalResult]);
      };
      fetchPhotos();
    } else if (currentContext.searchValue.length > 0) {
      const filteredArray = currentContext.history.keywords.find((item) => {
        return item.name === currentContext.searchValue;
      })?.content;
      if (filteredArray && filteredArray.length > 0) {
        setSearchList(filteredArray);
      } else {
        setSearchList([]);
      }
    }
  }, [page, currentContext.searchValue]);

  // Clear
  const handleClear = () => {
    currentContext.changeSearchValue("");
  };

  useEffect(() => {
    if (isEnd && currentContext.searchValue === "") {
      setPage((prevState) => prevState + 1);
    }
  }, [isEnd]);

  return (
    <div className={`${styles["photoListWrapper"]}`}>
      {page > 1 ? <ScrollUp /> : null}
      <button onClick={handleClear} className={`${styles["clearButton"]}`}>
        გასუფთავება
      </button>
      <div className={`${styles["imageWrapper"]}`}>
        {currentContext.searchValue === "" ? (
          photoList.map((item) => {
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
        ) : searchList.length > 0 ? (
          searchList.map((item) => {
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
        ) : (
          <h2 className={`${styles["ErrorMessage"]}`}>
            😓 სურათები ვერ მოიძებნა, სცადეთ სხვა სახელი ან დაარეფრეშეთ გვერდი
          </h2>
        )}
      </div>
    </div>
  );
};
