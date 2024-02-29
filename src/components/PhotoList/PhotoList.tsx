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
  const [perPage, setPerPage] = useState(20);
  const [orderBy, setOrderBy] = useState("popular");
  const { isEnd } = useDetectEnd();

  useEffect(() => {
    const secretKey = import.meta.env.VITE_ACCESS_KEY as string;
    const fetchPhotos = async () => {
      const params = {
        page: page,
        per_page: perPage,
        order_by: orderBy,
        client_id: secretKey,
      };
      const finalUrl = `${baseApiRoute}/photos/?page=${params.page}&per_page=${params.per_page}&order_by=${params.order_by}&client_id=${params.client_id}`;
      const result = await fetch(finalUrl);
      const photos = await result.json();
      setPhotoList((prevState) => [...prevState, ...photos]);
    };

    fetchPhotos();
  }, [orderBy, page, perPage, currentContext.searchValue]);

  useEffect(() => {
    if (isEnd && currentContext.searchValue === "") {
      console.log("entered end");
      setPage((prevState) => prevState + 1);
    }
  }, [isEnd, currentContext.searchValue]);
  console.log(currentContext);
  const finalList = currentContext.searchValue
    ? currentContext.history.keywords.find(
        (item) => item.name === currentContext.searchValue
      )?.content || []
    : photoList;
  const handleClear = () => {
    currentContext.changeSearchValue("");
  };
  return (
    <div className={`${styles["photoListWrapper"]}`}>
      {page > 1 ? <ScrollUp /> : null}
      <button onClick={handleClear} className={`${styles["clearButton"]}`}>
        გასუფთავება
      </button>
      <div className={`${styles["imageWrapper"]}`}>
        {finalList
          ? finalList.map((item) => {
              return (
                <PhotoItem
                  key={item.id}
                  alt_description={item.alt_description}
                  created_at={item.created_at}
                  id={item.id}
                  likes={item.likes}
                  picturePath={item.urls.regular}
                />
              );
            })
          : null}
        {finalList.length === 0 ? (
          <h2 className={`${styles["ErrorMessage"]}`}>
            😓 სურათი ვერ მოიძებნა, სცადეთ სხვა სახელი
          </h2>
        ) : null}
      </div>
    </div>
  );
};
