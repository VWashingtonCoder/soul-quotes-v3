import { Quote } from "../types";
import { TfiReload } from "react-icons/tfi";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useUser, useQuote } from "../custom-hooks/useCustomContext";

type QuoteCardProps = {
  cardData: Quote;
  idx: number;
  changeOne: (idx: number) => void;
};

const QuoteCard = (props: QuoteCardProps) => {
  const { cardData, idx, changeOne } = props;
  const { username } = useUser().activeUser;
  const { favoriteQuoteCodes, addToFavorites } = useQuote();
  const { code, quote, author, category } = cardData; 
  const isFavorite = favoriteQuoteCodes.includes(code);

  return (
    <div className="quote-card">
      <h2 className="card-category">{category}</h2>

      <div className="card-content">
        <p className="quote">{quote}</p>
        <p className="author">- {author}</p>
      </div>
      <div className="card-btns">
        <button
          className="card-btn"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            changeOne(idx);
          }}
        >
          <TfiReload className="icon reload" />
        </button>
        {username && (
          <>
            {!isFavorite && (
              <button 
                className="card-btn"
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  addToFavorites(username, code);
                }}
              >
                <MdFavoriteBorder className="icon favorite" />
              </button>
            )
            // ) : (
            //   <button className="card-btn">
            //     <MdFavorite className="icon favorite" />
            //   </button>
            // )}
            }
          </>
          
          // <button
          //   className="card-btn"
            
          // >
          //   {isFavorite ? (
          //     
          //   ) : (
          //     
          //   )} 
          // </button>
        )} 
      </div>
    </div>
  );
};

export default QuoteCard;
