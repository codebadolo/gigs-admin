import "./GigsCards.css";

const GigsCards = ({ gigs, onCardClick }) => {
  return (
    <div className="cardsGrid">
      {gigs.length === 0 ? (
        <p className="noGigsMessage">Aucun gig trouvé.</p>
      ) : (
        gigs.map((gig) => (
          <div
            key={gig.id}
            className="card"
            onClick={() => onCardClick(gig)}
            tabIndex={0}
            role="button"
            aria-pressed="false"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onCardClick(gig);
            }}
          >
            <div className="cardImageWrapper">
              {gig.images && gig.images.length > 0 ? (
                <img
                  src={gig.images[0]}
                  alt={gig.title}
                  className="cardImage"
                  loading="lazy"
                />
              ) : (
                <div className="noImagePlaceholder">Pas d'image</div>
              )}
            </div>
            <div className="cardContent">
              <h3 className="cardTitle">{gig.title}</h3>
              <p className="cardDescription" title={gig.description}>
                {gig.description.length > 100
                  ? gig.description.slice(0, 100) + "..."
                  : gig.description}
              </p>
              <div className="cardMeta">
                <span className="seller">👤 {gig.seller}</span>
                <span className="price">💰 ${gig.price}</span>
              </div>
              <div className={`statusBadge status-${gig.status.toLowerCase().replace(/\s/g, "")}`}>
                {gig.status}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default GigsCards;
