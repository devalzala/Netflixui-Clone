import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.scss";
import { FiPlay } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";

const apiKey = "7a17dc9f989895eb5f4be309a94cc37b";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({ img }) => {
  return <img src={img} alt="images" className="card" />;
};

const Row = ({ title, arr = [] }) => {
  return (
    <div className="row">
      <h2>{title}</h2>

      <div>
        {arr?.map((item, index) => {
          return <Card img={`${imgUrl}/${item?.poster_path}`} key={index} />;
        })}
      </div>
    </div>
  );
};

const Home = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topratedMovies, setTopRatedMovies] = useState([]);
  const [genre, setGenre] = useState([]);

  console.log(popularMovies);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const data = await axios
        .get(`${url}/movie/${upcoming}?api_key=${apiKey}`)
        .then((result) => {
          // console.log(result.data.results);
          setUpcomingMovies(result?.data?.results);
        })
        .catch((err) => {
          console.log("Error in upcoming api", err);
        });

      console.log(data);
    };

    const fetchNowPlaying = async () => {
      const data = await axios
        .get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`)
        .then((result) => {
          // console.log(result.data.results);
          setNowPlayingMovies(result?.data?.results);
        })
        .catch((err) => {
          console.log("Error in nowplaying api", err);
        });
      console.log(data);
    };

    const fetchPopular = async () => {
      const data = await axios
        .get(`${url}/movie/${popular}?api_key=${apiKey}`)
        .then((result) => {
          // console.log(result.data.results);
          setPopularMovies(result?.data?.results);
        })
        .catch((err) => {
          console.log("Error in popular api", err);
        });
      console.log(data);
    };

    const fetchTopRated = async () => {
      const data = await axios
        .get(`${url}/movie/${topRated}?api_key=${apiKey}`)
        .then((result) => {
          // console.log(result.data.results);
          setTopRatedMovies(result?.data?.results);
        })
        .catch((err) => {
          console.log("Error in toprated api", err);
        });
      console.log(data);
    };

    const fetchGenre = async () => {
      const data = await axios
        .get(`${url}/genre/movie/list?api_key=${apiKey}`)
        .then((result) => {
          // console.log(result.data.genres, "Genreeeeeeeeeeee");
          setGenre(result?.data?.genres);
        })
        .catch((err) => {
          console.log("Error in genre api", err);
        });
      console.log(data);
    };

    fetchUpcoming();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
    fetchGenre();
  }, []);
  return (
    <section className="home">
      <div
        className="banner"
        style={{
          backgroundImage: popularMovies[0]
            ? `url(${`${imgUrl}/${popularMovies[0]?.poster_path}`})`
            : "rgba(16, 16, 16)",
        }}
      >
        {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
        {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

        <div>
          <button>
            Play <FiPlay />
          </button>
          <button>
            My List <AiOutlinePlus />
          </button>
        </div>
      </div>

      <Row title={"Upcoming"} arr={upcomingMovies} />
      <Row title={"Now Playing"} arr={nowPlayingMovies} />
      <Row title={"Popular"} arr={popularMovies} />
      <Row title={"Top Rated"} arr={topratedMovies} />

      <div className="genreBox">
        {genre?.map((item) => {
          return (
            <Link to={`/genre/${item.id}`} key={item.id}>
              {item.name}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Home;
