/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IonContent,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonPage,
  IonSearchbar,
  IonText,
} from "@ionic/react";
import { useRef, useState } from "react";
import { useHistory } from "react-router";
import { Endpoints } from "../../config/Endpoints";
import { Header } from "../../shared/Header";
import { get } from "../../shared/Http";
import "./Search.css";
import noImage from "./no-image.png";

export const Search: React.FC = () => {
  const history = useHistory();
  const [showLoading, setShowLoading] = useState(false);

  const [searchResult, setSearchMovie] = useState<[]>([]);
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const getSearchMovies = async (searchKeyword: string) => {
    try {
      setShowLoading(true);
      const searchResult = await get(
        `${Endpoints.searchMovies}${searchKeyword}`
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      searchResult ? setSearchMovie(searchResult.results) : [];
      setShowLoading(false);
    } catch (err) {
      console.log("🚀 ~ file: Search.tsx:39 ~ getSearchMovies ~ err:", err);
    } finally {
      setShowLoading(false);
    }
  };

  const handleSearch = (e: any) => {
    const value = e.target.value;
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    if (value.length > 2) {
      debounceTimer.current = setTimeout(() => {
        getSearchMovies(value);
      }, 600);
    } else {
      setSearchMovie([]);
    }
  };

  return (
    <IonPage>
      <Header heading={"Search"} showSearch={false} />
      <IonLoading
        cssClass="my-custom-class"
        isOpen={showLoading}
        spinner={"bubbles"}
        message={"Please wait..."}
      />
      <IonContent className="content" fullscreen>
        <IonSearchbar
          placeholder="Type movie name"
          onInput={handleSearch}
          onIonClear={() => setSearchMovie([])}
        ></IonSearchbar>
        <IonList lines={"full"}>
          {searchResult?.map((result: any) => {
            return (
              <IonItem
                key={result.id}
                lines={"full"}
                onClick={(e) => {
                  e.preventDefault();
                  history.push(`/movie-details/${result.id}`);
                }}
              >
                <IonImg
                  className="image"
                  src={Endpoints.thumbImageUrl + result.poster_path}
                  onIonError={({ target }) => {
                    target.onerror = null;
                    target.src = noImage;
                  }}
                ></IonImg>
                <IonLabel className="title ion-margin ion-padding">
                  {result.title}
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
