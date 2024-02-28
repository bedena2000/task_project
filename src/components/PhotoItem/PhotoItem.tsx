import { FC } from "react";
import styles from "./PhotoItem.module.css";
import { PhotoElement } from "./PhotoItemTypes";

export const PhotoItem: FC<PhotoElement> = ({
  alt_description,
  created_at,
  id,
  likes,
  picturePath,
}) => {
  return (
    <div className={`${styles["photoItem"]}`}>
      <img alt="mainPhoto" src={picturePath} />
      <p>{alt_description}</p>
    </div>
  );
};
