import { useEffect, useState } from "react";
import Modal from "react-modal";
import "./GigFormModal.css";

Modal.setAppElement("#root");

const GigFormModal = ({ isOpen, onRequestClose, onSave, gig }) => {
  const [formData, setFormData] = useState({ title: "", price: "", seller: "" });

  useEffect(() => {
    if (gig) {
      setFormData({ title: gig.title, price: gig.price, seller: gig.seller });
    } else {
      setFormData({ title: "", price: "", seller: "" });
    }
  }, [gig]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.seller) return;
    onSave({ ...formData, price: Number(formData.price) });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={gig ? "Modifier Gig" : "Ajouter Gig"}
      className="modalContent"
      overlayClassName="modalOverlay"
    >
      <h2>{gig ? "Modifier le Gig" : "Ajouter un nouveau Gig"}</h2>
      <form onSubmit={handleSubmit} className="gigForm">
        <label>
          Titre
          <input name="title" value={formData.title} onChange={handleChange} required />
        </label>
        <label>
          Prix ($)
          <input
            name="price"
            type="number"
            min="0"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Vendeur
          <input name="seller" value={formData.seller} onChange={handleChange} required />
        </label>
        <div className="modalButtons">
          <button type="submit" className="btnSubmit">
            {gig ? "Enregistrer" : "Ajouter"}
          </button>
          <button type="button" className="btnCancel" onClick={onRequestClose}>
            Annuler
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default GigFormModal;
