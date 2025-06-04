import './DashboardCard.css';

const DashboardCard = ({ title, value, icon }) => {
  return (
    <div className="dashboardCard">
      <div className="cardIcon">{icon}</div>
      <div className="cardInfo">
        <h4>{title}</h4>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
