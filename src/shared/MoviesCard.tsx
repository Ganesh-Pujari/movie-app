import { useState } from "react";
import { Endpoints } from "../config/Endpoints";
import { useHistory } from "react-router-dom";
interface ContainerProps {
  movie: any;
}
export const MovieCard: React.FC<ContainerProps> = ({ movie }) => {
  const history = useHistory();
  const [videos, setVideo] = useState([]);

  const imageStyle = {
    background: `url(${Endpoints.thumbImageUrl + movie.poster_path})`,
    height: "250px",
    width: "175px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    borderRadius: "15px",
  };
  const divStyle = {
    display: "flex",
    justifyContent: "flex-start",
    cursor: "pointer",
  };
  return (
    <div
      style={divStyle}
      onClick={(e) => {
        e.preventDefault();
        history.push(`/movie-details/${movie.id}`);
      }}
    >
      <div style={imageStyle}></div>
    
    </div>
  );
};
