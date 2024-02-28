import styles from "./Modal.module.css";
import { useContext, useEffect, useState } from "react";
import { MainAppContext } from "../../context";
import { IoCloseCircle } from "react-icons/io5";
import { baseApiRoute } from "../../helpers";
import { FaCloudDownloadAlt } from "react-icons/fa";

export interface PictureInterface {
  alt_description: string;
  created_at: string;
  likes: number;
  views: number;
  links: {
    download: string;
  };
}

export const Modal = () => {
  const currentContext = useContext(MainAppContext);
  const pictureId: string = currentContext.currentPictureId;
  const [pictureInfo, setPictureInfo] = useState<PictureInterface>();
  const handleModalClose = () => {
    currentContext.changeCurrentModal();
  };
  useEffect(() => {
    if (pictureId) {
      const fetchPhoto = async () => {
        const secretKey = import.meta.env.VITE_ACCESS_KEY as string;
        const finalUrl = `${baseApiRoute}/photos/${pictureId}?client_id=${secretKey}`;
        const result = await fetch(finalUrl);
        const photos = (await result.json()) as PictureInterface;
        if (photos) {
          const pictureInfo = {
            alt_description: photos.alt_description,
            created_at: photos.created_at,
            likes: photos.likes,
            views: photos.views,
            links: {
              download: photos.links.download,
            },
          };
          setPictureInfo(pictureInfo);
        }
      };

      fetchPhoto();
    }
  }, [pictureId]);
  console.log(pictureInfo);
  return (
    <div className={`${styles["modalWrapper"]}`}>
      <div className={`${styles["modalClose"]}`}>
        <IoCloseCircle onClick={handleModalClose} color="black" size={36} />
      </div>
      <div className={`${styles["pictureInfo"]}`}>
        <p className={`${styles["pictureTitle"]}`}>
          {pictureInfo?.alt_description}
        </p>
        <div className={`${styles["pictureWrapper"]}`}>
          <img alt="currentSelectedImage" src={pictureInfo?.links.download} />
        </div>
        <div className={`${styles["pictureSettings"]}`}>
          <div className={`${styles["pictureViews"]}`}>
            <p>Views: {pictureInfo?.views}</p>
          </div>
          {pictureInfo?.links.download && (
            <a
              download={pictureInfo?.links.download}
              className={`${styles["pictureDownload"]}`}
              href={pictureInfo?.links.download}
            >
              <p>Download</p>
              <FaCloudDownloadAlt size={26} color="white" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
