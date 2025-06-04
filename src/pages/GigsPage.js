import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import FiltersBar from "../components/FiltersBar";
import GigsCards from "../components/GigsCards";
import gigsMock from "../mocks/gigs";
import "./GigsPage.css";

const ITEMS_PER_PAGE = 12;

const GigsPage = ({ collapsed }) => {
  const [gigs, setGigs] = useState([]);

  const [filters, setFilters] = useState({
    status: "",
    seller: "",
    priceMin: "",
    priceMax: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((r) => setTimeout(r, 300));
      setGigs(gigsMock);
    };
    fetchData();
  }, []);

  // Liste unique des vendeurs pour filtre
  const sellers = useMemo(() => {
    const unique = new Set(gigs.map((g) => g.seller));
    return Array.from(unique).sort();
  }, [gigs]);

  // Filtrage avancé + recherche
  const filteredGigs = useMemo(() => {
    return gigs.filter((gig) => {
      if (filters.status && gig.status !== filters.status) return false;
      if (filters.seller && gig.seller !== filters.seller) return false;
      if (filters.priceMin && gig.price < Number(filters.priceMin)) return false;
      if (filters.priceMax && gig.price > Number(filters.priceMax)) return false;
      if (
        searchTerm &&
        !(
          gig.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          gig.seller.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
        return false;
      return true;
    });
  }, [gigs, filters, searchTerm]);

  const totalPages = Math.ceil(filteredGigs.length / ITEMS_PER_PAGE);
  const displayedGigs = filteredGigs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCardClick = (gig) => {
    navigate(`/gigs/${gig.id}`);
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1);
  };

  return (
    <main className={`gigsPageContainer ${collapsed ? "collapsed" : ""}`}>
      <header className="gigsPageHeader">
        <input
          type="search"
          placeholder="Rechercher par titre ou vendeur..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="gigsSearchInput"
          aria-label="Recherche des gigs"
        />
      </header>

      <FiltersBar filters={filters} onFilterChange={handleFilterChange} sellers={sellers} />

      <section>
        <GigsCards gigs={displayedGigs} onCardClick={handleCardClick} />
      </section>

      <nav className="paginationNav" aria-label="Pagination des gigs">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="paginationButton"
          aria-disabled={currentPage === 1}
        >
          Précédent
        </button>
        <span className="paginationInfo">
          Page {currentPage} sur {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="paginationButton"
          aria-disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </nav>
    </main>
  );
};

export default GigsPage;
