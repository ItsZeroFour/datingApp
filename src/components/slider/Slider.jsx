import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { slides } from "../../data/slides";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  const goPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, slides]);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  // Timeout (Next slide)
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      goToNext();
    }, 5000);

    return () => clearTimeout(timerRef.current);
  }, [goToNext]);

  return (
    <div className="slider">
      <div className="slider__container">
        <div className="slider__previous">
          <img
            className="slider__image"
            src={
              currentIndex === 0
                ? slides[slides.length - 1].url
                : slides[currentIndex - 1].url
            }
            alt="slider image"
            onClick={goPrevious}
          />
        </div>

        <div className="slider__current">
          <img
            className="slider__image"
            src={slides[currentIndex].url}
            alt="slider image"
          />
          <div className="slider__text-cotent">
            <h1 className="slider__title">{slides[currentIndex].title}</h1>
            <p className="slider__text">{slides[currentIndex].text}</p>
          </div>
        </div>

        <div className="slider__next">
          <img
            className="slider__image"
            src={
              currentIndex === slides.length - 1
                ? slides[0].url
                : slides[currentIndex + 1].url
            }
            alt="slider image"
            onClick={goToNext}
          />
        </div>
      </div>

      <div className="slider__dots">
        <ul className="slider__dots-list">
          {slides.map((slide, slideIndex) => (
            <li
              key={slideIndex}
              className={`slider__dots-item ${
                slideIndex === currentIndex && "active__dot-slide"
              }`}
              onClick={() => goToSlide(slideIndex)}
            >
              <FontAwesomeIcon icon={faCircle} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Slider;
