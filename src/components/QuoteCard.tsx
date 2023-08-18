import { Quote } from "../types";
import { TfiReload } from "react-icons/tfi";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useAppProvider } from "../custom-hooks/useCustomContext";

type QuoteCardProps = {
  cardData: Quote;
  idx: number;
  //   isFavorite: boolean;
  //   isUser: boolean;
  changeOne: (idx: number) => void;
  //   toggleFavorite: (favoriteStatus: boolean, idx: number) => void;
};

const QuoteCard = (props: QuoteCardProps) => {
  const {
    cardData,
    idx,
    // isFavorite,
    // isUser,
    changeOne,
    // toggleFavorite
  } = props;
  const { activeUser, userFavoriteCodes } = useAppProvider();
  const { code, quote, author, category } = cardData;
  const username = activeUser ? activeUser.username : "";
  const isFavorite = userFavoriteCodes.includes(code);

  const toggleFavorite = () => {
    console.log(`idx: ${idx} / isFavorite: ${isFavorite}`);
    if (isFavorite) {
      // remove from favorites
    } else {
      // add to favorites
    }
  };

  console.log("QuoteCard: isFavorite", isFavorite);
  console.log("QuoteCard: userFavoriteCodes", userFavoriteCodes);
  console.log("QuoteCard: username", username);
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
          <button
            className="card-btn"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              toggleFavorite();
            }}
          >
            {isFavorite ? (
              <MdFavorite className="icon favorite" />
            ) : (
              <MdFavoriteBorder className="icon favorite" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuoteCard;
