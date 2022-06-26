/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  IonCard,
  IonCol,
  IonContent,
  IonImg,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MovieObj } from "../../config/Auth";
import { Endpoints } from "../../config/Endpoints";
import { Header } from "../../shared/Header";
import { get } from "../../shared/Http";
import "./MovieDetails.css";
export const MovieDetails: React.FC = () => {
  const { id }: any = useParams();
  const [movie, setMovie] = useState<any>();
  const [videos, setVideos] = useState<[]>();
  const [cast, setCast] = useState<[]>();
  const [crew, setCrew] = useState<[]>();

  console.log("🚀 ~ file: MovieDetails.tsx ~ line 7 ~ params", id);
  useEffect(() => {
    getMovieDetails();
  }, []);
  const getMovieDetails = async () => {
    const movie = await get(
      `${Endpoints.movieDetails}/${id}?api_key=${MovieObj.API_KEY}&append_to_response=videos,images&language=en-US`
    );
    const castAndCrew = await get(
      `${Endpoints.movieDetails}/${id}/credits?api_key=${MovieObj.API_KEY}&append_to_response=videos,images&language=en-US`
    );
    console.log(
      "🚀 ~ file: MovieDetails.tsx ~ line 21 ~ getMovieDetails ~ movie",
      movie,
      castAndCrew
    );
    movie ? setMovie(movie) : [];
    movie ? setVideos(movie.videos.results.reverse()) : [];
    castAndCrew ? setCast(castAndCrew.cast) : null;
    castAndCrew ? setCrew(castAndCrew.crew) : null;
  };
  return (
    <IonPage>
      <Header heading={movie?.title} showSearch={true} />
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
        {/* <IonRow>
          <IonCol>
            {cast?.map((cast: any, index: any) => (
              <IonCard key={cast.id}>
                <span key={cast.id} className="starting-list">
                  {cast.name}
                  {index < 5 ? "," : ""}
                </span>
                <IonImg
                  src={Endpoints.thumbImageUrl + cast.profile_path}
                ></IonImg>
              </IonCard>
            ))}
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol></IonCol>
        </IonRow> */}
        {videos &&
          videos.map(
            (video: any, index: number) =>
              index < 2 && (
                <IonCard key={video.id}>
                  <iframe
                    height={"300px"}
                    width={"100%"}
                    key={video.id}
                    src={`https://www.youtube.com/embed/${video["key"]}?autoplay=1`}
                    title={video.title}
                    frameBorder={"none"}
                    allowFullScreen={true}
                  ></iframe>
                </IonCard>
              )
          )}
      </IonContent>
    </IonPage>
  );
};
