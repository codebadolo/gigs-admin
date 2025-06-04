import "./FiltersBar.css";

const FiltersBar = ({ filters, onFilterChange, sellers }) => {
  return (
    <section className="filtersBar" aria-label="Filtres avancés des gigs">
      <div className="filterGroup">
        <label htmlFor="statusFilter">Statut :</label>
        <select
          id="statusFilter"
          value={filters.status}
          onChange={(e) => onFilterChange("status", e.target.value)}
        >
          <option value="">Tous</option>
          <option value="Publié">Publié</option>
          <option value="En attente">En attente</option>
          <option value="Refusé">Refusé</option>
        </select>
      </div>

      <div className="filterGroup">
        <label htmlFor="sellerFilter">Vendeur :</label>
        <select
          id="sellerFilter"
          value={filters.seller}
          onChange={(e) => onFilterChange("seller", e.target.value)}
        >
          <option value="">Tous</option>
          {sellers.map((seller) => (
            <option key={seller} value={seller}>
              {seller}
            </option>
          ))}
        </select>
      </div>

      <div className="filterGroup">
        <label htmlFor="priceMin">Prix min ($) :</label>
        <input
          id="priceMin"
          type="number"
          min="0"
          value={filters.priceMin}
          onChange={(e) => onFilterChange("priceMin", e.target.value)}
          placeholder="0"
        />
      </div>

      <div className="filterGroup">
        <label htmlFor="priceMax">Prix max ($) :</label>
        <input
          id="priceMax"
          type="number"
          min="0"
          value={filters.priceMax}
          onChange={(e) => onFilterChange("priceMax", e.target.value)}
          placeholder="∞"
        />
      </div>
    </section>
  );
};

export default FiltersBar;
