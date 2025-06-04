import { useState } from "react";
import "./GigsGrid.css";

const GigsGrid = ({ gigs, onCardClick }) => {
  // État pour le nombre de colonnes sélectionné
  const [columns, setColumns] = useState(3);

  // Gestion du changement de sélection
  const handleColumnsChange = (e) => {
    setColumns(Number(e.target.value));
  };

  return (
    <>
      <div className="gridControls">
        <label htmlFor="columnsSelect">Nombre de colonnes :</label>
        <select id="columnsSelect" value={columns} onChange={handleColumnsChange}>
          <option value={2}>2 colonnes</option>
          <option value={3}>3 colonnes</option>
          <option value={4}>4 colonnes</option>
        </select>
      </div>

      <div
        className="gigsGridContainer"
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {gigs.length === 0 ? (
          <p className="noGigsMessage">Aucun gig trouvé.</p>
        ) : (
          gigs.map((gig) => (
            <article
              key={gig.id}
              className="gigCard"
              onClick={() => onCardClick(gig)}
              tabIndex={0}
              role="button"
              aria-pressed="false"
            >
              <div className="gigImageWrapper">
                {gig.images && gig.images.length > 0 ? (
                  <img
                    src={gig.images[0]}
                    alt={`Image du gig ${gig.title}`}
                    className="gigImage"
                  />
                ) : (
                  <div className="noImagePlaceholder">Pas d'image</div>
                )}
              </div>
              <div className="gigContent">
                <h3 className="gigTitle">{gig.title}</h3>
                <p className="gigSeller">Vendeur : {gig.seller}</p>
                <p className="gigPrice">Prix : ${gig.price}</p>
                <p className="gigStatus">Statut : {gig.status}</p>
                <p className="gigDate">Créé le : {gig.createdAt}</p>
              </div>
            </article>
          ))
        )}
      </div>
    </>
  );
};

export default GigsGrid;
