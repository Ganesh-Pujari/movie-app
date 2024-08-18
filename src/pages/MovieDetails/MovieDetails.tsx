/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  IonCard,
  IonCol,
  IonContent,
  IonImg,
  IonLoading,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Endpoints } from "../../config/Endpoints";
import { Header } from "../../shared/Header";
import { get } from "../../shared/Http";
import "./MovieDetails.css";
import noImage from "./no-image.png";
export const MovieDetails: React.FC = () => {
  const { id }: any = useParams();
  const [movie, setMovie] = useState<any>();
  const [videos, setVideos] = useState<[]>();
  const [cast, setCast] = useState<[]>();
  const [crew, setCrew] = useState<[]>();
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    getMovieDetails();
  }, [id]);

  const getMovieDetails = async () => {
    try {
      setShowLoading(true);
      const movieDetailsUrl = `${Endpoints.movieDetails}`.replace("id", id);
      const movieCreditsUrl = `${Endpoints.movieCredits}`.replace("id", id);
      const movie = await get(movieDetailsUrl);
      const castAndCrew = await get(movieCreditsUrl);
      movie ? setMovie(movie) : [];
      movie ? setVideos(movie.videos.results.reverse()) : [];
      castAndCrew ? setCast(castAndCrew.cast) : null;
      castAndCrew ? setCrew(castAndCrew.crew) : null;
    } catch (error) {
      console.log(
        "🚀 ~ file: MovieDetails.tsx:44 ~ getMovieDetails ~ error:",
        error
      );
    } finally {
      setShowLoading(false);
    }
  };
  return (
    <IonPage>
      <Header heading={movie?.title} showSearch={true} />
      <IonLoading
        cssClass="my-custom-class"
        isOpen={showLoading}
        spinner={"bubbles"}
        message={"Please wait..."}
      />
      <IonContent className="content" fullscreen>
        {movie?.backdrop_path && (
          <IonImg
            src={Endpoints.originalImageUrl + movie?.backdrop_path}
          ></IonImg>
        )}
        <IonCard className="card ion-no-margin ion-margin-top">
          <IonRow class="movie-details">
            <IonCol size="3">
              {movie?.poster_path && (
                <IonImg
                  src={Endpoints.thumbImageUrl + movie?.poster_path}
                  onIonError={({ target }) => {
                    target.onerror = null;
                    target.src = noImage;
                  }}
                ></IonImg>
              )}
            </IonCol>
            <IonCol size="9" className="ion-horizontal-padding">
              <IonText className="title">{movie?.title}</IonText>
              {/* <p className="genres">
                {movie?.genres.map((genre: any, index: any) => (
                  <span key={genre.id} className="genre-list">
                    {genre.name}
                  </span>
                ))}
              </p> */}
              <p className="release">{movie?.release_date}</p>
              <p className="starting">
                Starring
                {cast?.map(
                  (cast: any, index: any) =>
                    index < 6 && (
                      <span key={cast.id} className="starting-list">
                        {cast.name}
                        {index < 5 ? "," : ""}
                      </span>
                    )
                )}
              </p>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-horizontal-padding">
              <p className="overview">{movie?.overview}</p>
            </IonCol>
          </IonRow>
        </IonCard>
        <IonCard className="cast-card">
          {cast?.map((cast: any, index: any) => (
            <div className="cast">
              <p key={cast.id} className="starting-list cast-name">
                {cast.name}
              </p>
              <IonImg
                src={Endpoints.thumbImageUrl + cast.profile_path}
                className="cast-image"
                onIonError={({ target }) => {
                  target.onerror = null;
                  target.src = noImage;
                }}
              ></IonImg>
            </div>
          ))}
        </IonCard>

        {videos &&
          videos.map(
            (video: any, index: number) =>
              index < 2 && (
                <IonCard key={video.id}>
                  <iframe
                    height={"300px"}
                    width={"100%"}
                    key={video.id}
                    src={`https://www.youtube.com/embed/${video["key"]}?autoplay=0`}
                    title={video.title}
                    allowFullScreen={true}
                  ></iframe>
                </IonCard>
              )
          )}
      </IonContent>
    </IonPage>
  );
};
