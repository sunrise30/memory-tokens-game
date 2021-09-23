function MyTokenCards({ tokenURIs }) {
  return (
    <div>
      <h5>Tokens Collected:<span id="result">&nbsp;{tokenURIs.length}</span></h5>
      <div className="grid mb-4" >
        { tokenURIs.map((tokenURI, key) => {
          return(
            <img
              key={key}
              src={tokenURI}
            />
          )
        })}
      </div>
    </div>
  );
}

export default MyTokenCards;
