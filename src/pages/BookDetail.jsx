/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-one-expression-per-line */
import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RatingStar from '../components/ratingStar';
import '../styles/bookDetail.css';
import vintage from '../assets/vintage.jpg';
import redHeart from '../assets/favorite_heart_red.svg';
import whiteHeart from '../assets/favorite_heart_white.svg';
import MapBookDetail from '../components/MapBookDetail';
import backArrow from '../assets/back-arrow.png';

export default function BookDetail() {
  const { id } = useParams();
  const emptyResume =
    "Resumé non disponible, mais c'est certainement un excellent livre !";
  const [book, setBook] = useState();
  const [isBookFavorite, setIsBookFavorite] = useState(false);
  function handleClickFavoriteBook() {
    setIsBookFavorite(!isBookFavorite);
    !isBookFavorite
      ? localStorage.setItem(book.id.toString(), JSON.stringify(book))
      : localStorage.removeItem(book.id.toString());
  }
  const [coords, setCoords] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}books/${id}`)
      .then((response) => response.data)
      .then((data) => {
        setBook(data);
        if (localStorage.getItem(data.id.toString())) {
          setIsBookFavorite(true);
        }
        axios
          .get(`${process.env.REACT_APP_API_URL}books/isbn/${data.isbn}`)
          .then((response2) => response2.data)
          .then((data2) => {
            setCoords(data2);
          });
      })
      .catch((err) => console.log(err));
  }, []);

  const returnBack = () => {
    window.history.back();
  };
  return (
    <div className="bookdetail">
      {book && (
        <div>
          <div className="buttonBar">
            <button type="button" onClick={returnBack}>
              <img src={backArrow} alt="back arrow" />
            </button>
            <button type="button" onClick={handleClickFavoriteBook}>
              <img
                src={isBookFavorite === true ? redHeart : whiteHeart}
                alt={book.title}
              />
            </button>
          </div>
          <div>
            <h2 className="titre">{book.title}</h2>
            <h3 className="auteur">{book.author}</h3>
          </div>
          <div className="carateristicsContainer">
            <img
              src={
                book.picture === null || book.picture === 'None'
                  ? vintage
                  : book.picture
              }
              alt={book.title}
            />
            <div className="carateristicsDatas">
              <RatingStar rate={book.note} padding={'pb-2'} size={'text-4xl'} />
              <p>{book.pages_nbr} pages</p>
              <p>Date publication : {book.publication_year}</p>
              <p>Éditeur : {book.editions}</p>
              <p>ISBN : {book.isbn}</p>
            </div>
          </div>
          <h2 id="author">{book.author}</h2>
          <p className="resumebookDetail">
            <strong>Résumé :</strong>{' '}
            {book.synopsis === null || book.synopsis === 'None'
              ? emptyResume
              : book.synopsis}
          </p>
          <MapBookDetail boxNumber={coords} />
        </div>
      )}
    </div>
  );
}
