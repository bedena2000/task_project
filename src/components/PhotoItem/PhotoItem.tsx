import { FC, useState } from "react";
import styles from "./PhotoItem.module.css";
import { PhotoElement } from "./PhotoItemTypes";
// Context
import { useContext } from "react";
import { MainAppContext } from "../../context";

export const PhotoItem: FC<PhotoElement> = ({
  alt_description,
  created_at,
  id,
  likes,
  picturePath,
}) => {
  const [isHover, setIsHover] = useState(false);
  const currentContext = useContext(MainAppContext);

  const handlePicture = () => {
    currentContext.changeCurrentPicture(id);
    currentContext.changeCurrentModal();
  };

  return (
    <div
      onMouseMove={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={handlePicture}
      className={`${styles["photoItem"]}`}
    >
      <img alt="mainPhoto" src={picturePath} />

      {isHover && (
        <div className={`${styles["pictureInfo"]}`}>{alt_description}</div>
      )}
    </div>
  );
};
