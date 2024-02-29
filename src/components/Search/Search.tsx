import { useState, useContext, useEffect } from "react";
import styles from "./Search.module.css";
import { MainAppContext } from "../../context";
import { baseApiRoute } from "../../helpers";
import { PhotoElement } from "../PhotoItem/PhotoItemTypes";
import { PictureInterface } from "../Modal/Modal";
import { PhotoElementState } from "../PhotoList/PhotoList";

interface PictureArrayItem extends PictureInterface {
  id: string;
}

const Search = () => {
  const currentContext = useContext(MainAppContext);
  const [inputValue, setInputValue] = useState<string>(currentContext.searchValue ? currentContext.searchValue : "");
  const [debouncedValue, setDebouncedValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const valueOfInput = event.target.value;
    setInputValue(valueOfInput);
  };

  useEffect(() => {
    const activateDebounce = setTimeout(() => {
      // if (inputValue && inputValue.length > 0) {
      setDebouncedValue(inputValue);
      // }
    }, 1000);

    return () => {
      clearTimeout(activateDebounce);
    };
  }, [inputValue]);
  useEffect(() => {
    // Fetch Search
    if (debouncedValue && debouncedValue.length > 0) {
      currentContext.changeSearchValue(debouncedValue);
      const searchPhoto = async () => {
        const secretKey = import.meta.env.VITE_ACCESS_KEY as string;
        const finalUrl = `${baseApiRoute}/search/photos/?query=${debouncedValue}&page=1&per_page=10&client_id=${secretKey}`;

        const result = await fetch(finalUrl);
        const finalResult: {
          results: PhotoElementState[];
        } = await result.json();

        const history = finalResult.results.map((item) => {
          const photoItem = {
            alt_description: item.alt_description,
            created_at: item.created_at,
            id: item.id,
            likes: item.likes,
            urls: {
              regular: item.urls.regular,
            },
          };
          return photoItem;
        });
        currentContext.changeHistoryItem(debouncedValue, history);
      };

      // Check if user already entered this keyword
      const isEntered = currentContext.history.keywords.find((item) => {
        return item.name === debouncedValue;
      });

      if (
        debouncedValue &&
        debouncedValue.length > 0 &&
        isEntered === undefined
      ) {
        searchPhoto();
      }
    }
  }, [debouncedValue]);

  return (
    <div className={`${styles["searchBarWrapper"]}`}>
      <p className={`${styles["searchBarTitle"]}`}>ძებნა</p>
      <input
        value={inputValue}
        onChange={handleInputChange}
        className={`${styles["searchBar"]}`}
      ></input>
    </div>
  );
};

export default Search;
