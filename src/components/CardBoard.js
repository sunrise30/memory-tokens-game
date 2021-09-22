function CardBoard({ cardArray, cardsWon, cardsChosenId, onClickCard }) {

  const chooseImage = (cardId) => {
    if (cardsWon.includes(cardId)) {
      return `${window.location.origin}/images/white.png`;
    } else if (cardsChosenId.includes(cardId)) {
      return cardArray[cardId].img;
    } else {
      return `${window.location.origin}/images/blank.png`;
    }
  }

  return (
    <div className="grid mb-4">
      {
        cardArray.map((card, key) => (
          <img
            key={key}
            src={chooseImage(key)}
            onClick={() => onClickCard(key)}
          />
        ))
      }
    </div>
  );
}

export default CardBoard;