import "./GigsTable.css";

const GigsTable = ({ gigs, onSort, sortConfig, onRowClick }) => {
  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") direction = "desc";
    onSort({ key, direction });
  };

  const sortIndicator = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  return (
    <table className="gigsTable">
      <thead>
        <tr>
          <th>Photo</th>
          <th onClick={() => requestSort("id")}>
            ID {sortIndicator("id")}
          </th>
          <th onClick={() => requestSort("title")}>
            Titre {sortIndicator("title")}
          </th>
          <th onClick={() => requestSort("seller")}>
            Vendeur {sortIndicator("seller")}
          </th>
          <th onClick={() => requestSort("price")}>
            Prix ($) {sortIndicator("price")}
          </th>
          <th onClick={() => requestSort("status")}>
            Statut {sortIndicator("status")}
          </th>
          <th onClick={() => requestSort("createdAt")}>
            Date création {sortIndicator("createdAt")}
          </th>
        </tr>
      </thead>
      <tbody>
        {gigs.length === 0 ? (
          <tr>
            <td colSpan="7" style={{ textAlign: "center" }}>
              Aucun gig trouvé.
            </td>
          </tr>
        ) : (
          gigs.map((gig) => (
            <tr key={gig.id} onClick={() => onRowClick(gig)} className="tableRow">
              <td>
                {gig.images && gig.images.length > 0 ? (
                  <img
                    src={gig.images[0]}
                    alt={gig.title}
                    className="gigThumbnail"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <div className="noImage">Pas d'image</div>
                )}
              </td>
              <td>{gig.id}</td>
              <td>{gig.title}</td>
              <td>{gig.seller}</td>
              <td>{gig.price}</td>
              <td>{gig.status}</td>
              <td>{gig.createdAt}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default GigsTable;
