import { useEffect, useState } from "react";
import "./ExploreContainer.css";
import { get } from "../shared/Http";
import { Endpoints } from "../config/Endpoints";
import { MovieCard } from "../shared/MoviesCard";
import { IonLoading, IonButton, IonContent } from '@ionic/react';
interface ContainerProps {}

const ExploreContainer: React.FC<ContainerProps> = (props) => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    getPopularMovies();
  }, []);

  const getPopularMovies = async () => {
    const popularMovies = await get(`${Endpoints.popularMovies}`);
    // const latestMovies = await get(`${Endpoints.latestMovies}`);
    const topRatedMovies = await get(`${Endpoints.topRatedMovies}`);
    const nowPlaying = await get(`${Endpoints.nowPlayingMovies}`);
    const upcomingMovies = await get(`${Endpoints.upcomingMovies}`);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    popularMovies ? setPopularMovies(popularMovies.results) : [];
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    // latestMovies ? setLatestMovies(latestMovies.results) : [];
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    topRatedMovies ? setTopRatedMovies(topRatedMovies.results) : [];
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    nowPlaying ? setNowPlayingMovies(nowPlaying.results) : [];
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    upcomingMovies ? setUpcomingMovies(upcomingMovies.results) : [];
    setShowLoading(false)
  };

  return (
    <div className="ion-margin">
       <IonLoading
        cssClass='my-custom-class'
        isOpen={showLoading}
        spinner={'bubbles'}
        message={'Please wait...'}
      />
      <p>Popular Movies</p>

      <div className="container ion-margin-vertical">
        {popularMovies.map((movie: any, index: number) => {
          return <MovieCard key={index} movie={movie} />;
        })}
      </div>
      {/* <p>LatestMovies</p>
      <div className="container">
        {latestMovies.map((movie: any, index: number) => {
          return <MovieCard key={index} movie={movie} />;
        })}
      </div> */}
      <p>Top-rated Movies</p>

      <div className="container ion-margin-vertical">
        {topRatedMovies.map((movie: any, index: number) => {
          return <MovieCard key={index} movie={movie} />;
        })}
      </div>
      <p>Now-playingMovies</p>
      <div className="container ion-margin-vertical">
        {nowPlayingMovies.map((movie: any, index: number) => {
          return <MovieCard key={index} movie={movie} />;
        })}
      </div>
      <p>Upcoming Movies</p>
      <div className="container ion-margin-vertical">
        {upcomingMovies.map((movie: any, index: number) => {
          return <MovieCard key={index} movie={movie} />;
        })}
      </div>
    </div>
  );
};

export default ExploreContainer;
