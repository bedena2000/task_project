import React, { FC, createContext, useState } from "react";

import { PhotoElementState } from "../components/PhotoList/PhotoList";

interface historyItem {
  name: string;
  content: PhotoElementState[];
}

interface MainAppContextValue {
  currentPictureId: string;
  changeCurrentPicture: (currentPictureId: string) => void;
  changeCurrentModal: () => void;
  isModal: boolean;
  searchValue: string;
  changeSearchValue: (newValue: string) => void;
  history: {
    keywords: historyItem[];
  };
  changeHistoryItem: (keyword: string, photoArray: PhotoElementState[]) => void;
}

const defaultValue = {
  currentPictureId: "",
  changeCurrentPicture: () => {},
  changeCurrentModal: () => {},
  isModal: false,
  searchValue: "",
  changeSearchValue: () => {},
  history: {
    keywords: [],
  },
  changeHistoryItem: () => {},
};

export const MainAppContext = createContext<MainAppContextValue>(defaultValue);

export const MainContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentPictureId, setCurrentPictureId] = useState("");
  const [isModal, setIsModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [history, setHistory] = useState<{
    keywords: historyItem[];
  }>({
    keywords: [],
  });

  const changeCurrentPicture = (currentPictureId: string) =>
    setCurrentPictureId(currentPictureId);
  const changeCurrentModal = () => setIsModal((prevState) => !prevState);
  const changeSearchValue = (newValue: string) => setSearchValue(newValue);
  const changeHistoryItem = (
    keyword: string,
    photoArray: PhotoElementState[]
  ) => {
    setHistory((prevState) => {
      return {
        keywords: [
          ...prevState.keywords,
          {
            name: keyword,
            content: photoArray,
          },
        ],
      };
    });
  };

  const value: MainAppContextValue = {
    currentPictureId,
    changeCurrentPicture: changeCurrentPicture,
    isModal,
    changeCurrentModal,
    searchValue,
    changeSearchValue,
    history,
    changeHistoryItem,
  };

  return (
    <MainAppContext.Provider value={value}>{children}</MainAppContext.Provider>
  );
};
