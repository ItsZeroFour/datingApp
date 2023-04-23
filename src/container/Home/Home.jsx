import React from "react";
import Slider from "../../components/slider/Slider";
import { Link } from "react-router-dom";
import { slides } from "../../data/slides";
import Preloader from "../../components/preloader/Preloader";

const Home = () => {

  if (localStorage.getItem('user')) {
    window.location.href = '/datingApp/datingapp/main'
  }

  return (
    <div className="home">
      {slides ? (
        <div className="home__content">
          <Slider />
          <Link className="registration__button" to="/datingapp/signup">
            Create an account
          </Link>

          <p className="signin__text">
            Already have an account?{" "}
            <span>
              <Link className="signin__button" to="/datingapp/signin">
                Sign In
              </Link>
            </span>
          </p>
        </div>
      ) : (
        <div className="preloader">
          <Preloader />
        </div>
      )}
    </div>
  );
};

export default Home;
