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
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [perPage, setPerPage] = useState(20);
  const [orderBy, setOrderBy] = useState("popular");
  const { isEnd } = useDetectEnd();

  useEffect(() => {
    console.log("re render happened");
    if (currentContext.searchValue === "") {
      console.log("entered this area");
      const fetchPhotos = async () => {
        setIsLoading(true);
        const accessKey = import.meta.env.VITE_ACCESS_KEY as string;
        const finalUrl = `${baseApiRoute}/photos/?client_id=${accessKey}&page=${page}&per_page=${perPage}&order_by=${orderBy}`;
        const result = await fetch(finalUrl);
        const finalResult = await result.json();
        setPhotoList((prevState) => [...prevState, ...finalResult]);
        setIsLoading(false);
      };
      fetchPhotos();
    } else {
      const foundArray = currentContext.history.keywords.find(
        (item) => item.name === currentContext.searchValue
      );
      if (foundArray && foundArray.content.length > 0) {
        setPhotoList((prevState) => foundArray.content);
      } else {
        setPhotoList((prevState) => []);
      }
    }
  }, [page, currentContext.searchValue]);

  // Clear
  const handleClear = () => {
    currentContext.changeSearchValue("");
    setPhotoList([]);
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
        {photoList
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
        {photoList.length === 0 ? (
          <h2 className={`${styles["ErrorMessage"]}`}>
            😓 სურათები ვერ მოიძებნა, სცადეთ სხვა სახელი ან დაარეფრეშეთ გვერდი
          </h2>
        ) : null}
      </div>
    </div>
  );
};
