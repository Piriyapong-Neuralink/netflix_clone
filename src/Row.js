import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

// React hooks:
//     useState เป็นการนำเอาสมบัติการเก็บ state เหมือนกับ
//     ของ class มา apply กับ function
//     useEffect เป็นการนำเอาสมบัติการเก็บ lifecycle Hooks เหมือนกับ
//     ของ class มา apply กับ function
function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  console.log(movies, "", setMovies);

  useEffect(() => {
    //if [], run once when the row loads, and don't run again.
    //ใช้ async await เพราะ มันจะรอจนกว่า fetch เสร็จแล้วค่อยทำขั้นตอนต่อไป...
    // ไม่ข้ามขั้นตอน
    console.log("this is in Row function");

    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      console.log(request);
      return request;
    }

    fetchData();
  }, [fetchUrl]);

  console.log("iteration: xxx");

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };
  
  return (
    <div className="row">
      {/* title */}
      <h2>{title}</h2>
      {/* container -> posters */}
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
