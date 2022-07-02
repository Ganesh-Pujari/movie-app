/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IonContent,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSearchbar,
  IonText,
} from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import { Endpoints } from "../../config/Endpoints";
import { Header } from "../../shared/Header";
import { get } from "../../shared/Http";
import "./Search.css";
import noImage from "./no-image.png";

export const Search: React.FC = () => {
  const history = useHistory();
  const [searchResult, setSearchMovie] = useState<[]>([]);

  const getSearchMovies = async (searchKeyword: string) => {
    const searchResult = await get(`${Endpoints.searchMovies}${searchKeyword}`);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    searchResult ? setSearchMovie(searchResult.results) : [];
  };
  return (
    <IonPage>
      <Header heading={"Search"} showSearch={false} />
      <IonContent className="content" fullscreen>
        <IonSearchbar
          placeholder="Type movie name"
          onInput={(e: any) => {
            if (e.target.value.length > 2) {
              getSearchMovies(e.target.value);
            } else {
              setSearchMovie([]);
            }
          }}
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
                <IonLabel className="title ion-margin ion-padding">{result.title}</IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
