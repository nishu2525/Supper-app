import React ,{useState}from "react";
import "../../App.css";
import ".//category_page.css";
import "./Card.css";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

import ActionIg from "../Assests/images/action.png";
import DramaIg from "../Assests/images/drama.png";
import RomanceIg from "../Assests/images/romance.png";
import ThrillerIg from "../Assests/images/thriller.png";
import WesternIg from "../Assests/images/western.png";
import HorrorIg from "../Assests/images/horror.png";
import FantasyIg from "../Assests/images/Fantasy.png";
import MusicIg from "../Assests/images/music.png";
import FictionIg from "../Assests/images/fiction.png";

import errorSign from "../Assests/images/ErrorSign.png"


const cardsData = [
  { id: 1, title: "Action", imageUrl: ActionIg, backgroundColor: "#FF5209" },
  { id: 2, title: "Drama", imageUrl: DramaIg, backgroundColor: "#D7A4FF" },
  { id: 3, title: "Romance", imageUrl: RomanceIg,backgroundColor: "#11B800"},
  { id: 4, title: "Thriller", imageUrl: ThrillerIg, backgroundColor: " #84C2FF"},
  { id: 5, title: "Western",imageUrl: WesternIg,backgroundColor: "#902500"},
  { id: 6, title: "Horror", imageUrl: HorrorIg, backgroundColor: "#7358FF" },
  { id: 7,title: "Fantasy",imageUrl: FantasyIg,backgroundColor: "#FF4ADE",},
  { id: 8, title: "Music", imageUrl: MusicIg, backgroundColor: "#E61E32" },
  { id: 9,title: "Fiction",imageUrl: FictionIg,backgroundColor: "#6CD061"},
];
function Category_page() 
{
  const [selectedCategories, setSelectedCategories] = useState([]);
   const [errorMessage, setErrorMessage] = useState("");
   const navigate = useNavigate();

  const handleCardClick = (title) => {
     const updatedSelectedCategories = [...selectedCategories];
     if (updatedSelectedCategories.includes(title)) {
      const index = updatedSelectedCategories.indexOf(title);
      updatedSelectedCategories.splice(index, 1);
    } else {
      updatedSelectedCategories.push(title);
    }
    setSelectedCategories(updatedSelectedCategories); 
    localStorage.setItem("selectedCategories", JSON.stringify(updatedSelectedCategories));
  };

  const handleRemoveCategory = (title) => {
    const updatedSelectedCategories = selectedCategories.filter(category => category !== title);
    setSelectedCategories(updatedSelectedCategories);
    localStorage.setItem("selectedCategories", JSON.stringify(updatedSelectedCategories));
  };

  const handleNextClick = () => {
    if (selectedCategories.length >= 3) {
      setErrorMessage("");
    } else {
      setErrorMessage("Minimum 3 categories required");
    }
    if(selectedCategories.length >= 3){

      navigate("/Home",{ state: { selectedCategories } });
    }
  };
  return (
    <div className="page_2">
    <div className="ll_side">
      <h2 className="heading">Supper App</h2>
      <h1>Choose your entertainment category</h1>
      <div className="selected">
        {selectedCategories.map((category) => (
          <button key={category} className="selected-button">
            {category}
            <button onClick={() => handleRemoveCategory(category)} className="remove_card">X</button>
          </button>
        ))}
      </div>
      {errorMessage && <div className="error-message"><img src={errorSign} alt="errorSign" className="errorSign" /> {errorMessage}</div>}
    </div>
    <div className="rr_side">
      <div className="grid-container">
        {cardsData.map((card) => (
          <Card
            key={card.id}
            title={card.title}
            imageUrl={card.imageUrl}
            backgroundColor={card.backgroundColor}
            onCardClick={handleCardClick}
            isSelected={selectedCategories.includes(card.title)}
          />
        ))}
      </div>
    </div>
    <button className="next_button" onClick={handleNextClick} >Next Page</button>
  </div>
  );
 }
export default Category_page;
