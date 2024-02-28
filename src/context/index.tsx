import React, { FC, createContext, useState } from "react";

interface MainAppContextValue {
  currentPictureId: string;
  changeCurrentPicture: (currentPictureId: string) => void;
  changeCurrentModal: () => void;
  isModal: boolean;
}

const defaultValue = {
  currentPictureId: "",
  changeCurrentPicture: () => {},
  changeCurrentModal: () => {},
  isModal: false,
};

export const MainAppContext = createContext<MainAppContextValue>(defaultValue);

export const MainContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentPictureId, setCurrentPictureId] = useState("");
  const [isModal, setIsModal] = useState(false);

  const changeCurrentPicture = (currentPictureId: string) =>
    setCurrentPictureId(currentPictureId);
  const changeCurrentModal = () => setIsModal((prevState) => !prevState);

  const value: MainAppContextValue = {
    currentPictureId,
    changeCurrentPicture: changeCurrentPicture,
    isModal,
    changeCurrentModal,
  };

  return (
    <MainAppContext.Provider value={value}>{children}</MainAppContext.Provider>
  );
};
