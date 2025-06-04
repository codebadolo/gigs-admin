import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import gigsMock from "../mocks/gigs";
import "./GigsDetailPage.css";

const sellersMock = {
  "john_doe": {
    firstName: "John",
    lastName: "Doe",
    country: "France",
    bio: "Développeur web passionné avec 10 ans d'expérience.",
    avatar: "/avatars/john_doe.jpg",
  },
  "jane_smith": {
    firstName: "Jane",
    lastName: "Smith",
    country: "Canada",
    bio: "Designer freelance spécialisée en UI/UX.",
    avatar: "/avatars/jane_smith.jpg",
  },
};

const GigsDetailPage = ({ collapsed }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [gig, setGig] = useState(null);
  const [sellerInfo, setSellerInfo] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [likes, setLikes] = useState(123);
  const [shares, setShares] = useState(45);

  useEffect(() => {
    const foundGig = gigsMock.find((g) => String(g.id) === id);
    setGig(foundGig || null);

    if (foundGig && foundGig.seller) {
      setSellerInfo(sellersMock[foundGig.seller] || null);
    } else {
      setSellerInfo(null);
    }

    setReviews([
      {
        id: 1,
        authorFirstName: "Alice",
        authorLastName: "Martin",
        authorCountry: "France",
        rating: 5,
        comment: "Excellent travail, très professionnel !",
        date: "2024-05-10",
      },
      {
        id: 2,
        authorFirstName: "Bob",
        authorLastName: "Johnson",
        authorCountry: "États-Unis",
        rating: 4,
        comment: "Bonne communication, résultat conforme.",
        date: "2024-04-22",
      },
      {
        id: 3,
        authorFirstName: "Charlie",
        authorLastName: "Lee",
        authorCountry: "Canada",
        rating: 3,
        comment: "Correct mais délai un peu long.",
        date: "2024-03-15",
      },
    ]);
  }, [id]);

  if (!gig) {
    return (
      <main className={`gigDetailContainer ${collapsed ? "collapsed" : ""}`}>
        <p>Chargement ou gig introuvable...</p>
        <button onClick={() => navigate(-1)} className="backButton">
          ← Retour
        </button>
      </main>
    );
  }

  const handleLike = () => setLikes((prev) => prev + 1);
  const handleShare = () => alert("Merci de partager ce gig !");

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
      : "N/A";

  const reviewStats = reviews.reduce(
    (acc, r) => {
      acc.total++;
      acc.sum += r.rating;
      acc.byRating[r.rating] = (acc.byRating[r.rating] || 0) + 1;
      return acc;
    },
    { total: 0, sum: 0, byRating: {} }
  );

  return (
    <main className={`gigDetailContainer ${collapsed ? "collapsed" : ""}`}>
      <button onClick={() => navigate(-1)} className="backButton">
        ← Retour
      </button>

      <div className="gigGridContainer">
        {/* Section photo + détails en dessous */}
        <div className="gigPhotoSection">
          {gig.images && gig.images.length > 0 ? (
            <img
              src={gig.images[0]}
              alt={gig.title}
              className="gigMainImage"
              loading="lazy"
            />
          ) : (
            <div className="imagePlaceholder">Aucune image disponible</div>
          )}

          <div className="gigPhotoDetails">
            <p><strong>Prix :</strong> ${gig.price}</p>
            <p><strong>Statut :</strong> {gig.status}</p>
            <p><strong>Date de création :</strong> {gig.createdAt}</p>
          </div>
        </div>

        {/* Infos principales */}
        <div className="gigMainInfo">
          <h2 className="gigTitle">{gig.title}</h2>
          <p className="gigDescription">{gig.description || "Pas de description."}</p>

          {/* Infos vendeur */}
          {sellerInfo && (
            <section className="sellerInfo">
              <h3>Informations sur le vendeur</h3>
              <div className="sellerProfile">
                <img
                  src={sellerInfo.avatar}
                  alt={`${sellerInfo.firstName} ${sellerInfo.lastName}`}
                  className="sellerAvatar"
                />
                <div>
                  <p><strong>Nom complet :</strong> {sellerInfo.firstName} {sellerInfo.lastName}</p>
                  <p><strong>Pays d'origine :</strong> {sellerInfo.country}</p>
                  <p><strong>Bio :</strong> {sellerInfo.bio}</p>
                </div>
              </div>
            </section>
          )}

          {/* Section À propos */}
          <div className="aboutServiceSection">
            <h3>À propos de ce service</h3>
            <p>
              Êtes-vous frustré d'être constamment restreint sur Facebook ? Si oui, vous êtes au bon endroit.
            </p>
            <p>
              Je vais créer un compte Facebook Business Manager et un compte Facebook Ads vérifiés. Je vends un profil solide, vérifié et un compte Business Manager vérifié. Je peux également vérifier n'importe quel compte Business Manager.
            </p>
            <p>
              Je résoudrai tous vos problèmes, le cas échéant, ou je créerai un tout nouveau compte publicitaire Facebook Business Manager et configurerai toutes les actions nécessaires à votre activité. Je vous fournirai un Business Manager vérifié pour que vous puissiez gérer facilement votre campagne publicitaire sans problème.
            </p>
            <p><strong>Vous obtiendrez de moi :</strong></p>
            <ul>
              <li>Gestionnaire d'entreprise vérifié (FB BM vérifié) Faites de vous un administrateur de BM vérifié</li>
              <li>Configuration du pixel Facebook</li>
              <li>Vérification de domaine</li>
              <li>Configuration du compte publicitaire prêt à diffuser des annonces</li>
              <li>Résoudre le problème de désactivation des publicités Facebook</li>
              <li>Ajoutez des pages et un mode de paiement.</li>
              <li>Gestionnaire d'entreprise non vérifié</li>
              <li>Faites de vous un administrateur de BM vérifié</li>
            </ul>
            <p><strong>Pourquoi je suis le meilleur ?</strong></p>
            <ul>
              <li>Communication amicale</li>
              <li>Service client 24h/24 et 7j/7</li>
              <li>Très bon service</li>
            </ul>
            <p>
              Nous proposons une offre de remplacement unique de 7 jours entièrement gratuite. Cette offre est entièrement à notre charge, car Meta peut vous imposer des restrictions même après notre intervention. Cependant, nous nous soucions de nos clients, alors nous l'acceptons.
            </p>
          </div>

          {/* Interactions */}
          <div className="interactions">
            <button onClick={handleLike} className="interactionBtn" aria-label="Like">
              👍 {likes}
            </button>
            <button onClick={handleShare} className="interactionBtn" aria-label="Partager">
              🔄 {shares}
            </button>
          </div>
        </div>

        {/* Section avis clients pleine largeur */}
        <section className="reviewsSection">
          <h3>Avis des clients ({reviews.length}) - Note moyenne : {averageRating} ⭐</h3>

          <div className="reviewStats">
            {Object.entries(reviewStats.byRating)
              .sort((a, b) => b[0] - a[0])
              .map(([rating, count]) => (
                <div key={rating} className="reviewStatItem">
                  <span>{rating} ⭐ :</span> <strong>{count}</strong>
                </div>
              ))}
          </div>

          {reviews.length === 0 ? (
            <p>Aucun avis pour le moment.</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="reviewCard">
                <div className="reviewHeader">
                  <strong>{review.authorFirstName} {review.authorLastName}</strong>
                  <span className="reviewCountry">({review.authorCountry})</span>
                  <span className="reviewRating">{'⭐'.repeat(review.rating)}</span>
                </div>
                <p className="reviewComment">{review.comment}</p>
                <small className="reviewDate">{new Date(review.date).toLocaleDateString()}</small>
              </div>
            ))
          )}
        </section>
      </div>
    </main>
  );
};

export default GigsDetailPage;
