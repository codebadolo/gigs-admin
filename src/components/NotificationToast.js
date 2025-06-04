import { useEffect } from "react";
import "./NotificationToast.css";

const NotificationToast = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type}`}>
      <p>{message}</p>
      <button onClick={onClose} aria-label="Fermer la notification">
        ×
      </button>
    </div>
  );
};

export default NotificationToast;
