import { FaClipboardList, FaDollarSign, FaStar, FaUsers } from 'react-icons/fa';
import DashboardCard from '../components/DashboardCard';
import './DashboardPage.css';

const DashboardPage = () => {
  return (
    <div className="dashboardPage">
      <h2>Welcome to the Admin Dashboard</h2>
      <div className="dashboardCardsContainer">
        <DashboardCard title="Users" value="1,234" icon={<FaUsers />} />
        <DashboardCard title="Gigs" value="567" icon={<FaClipboardList />} />
        <DashboardCard title="Payments" value="$45,678" icon={<FaDollarSign />} />
        <DashboardCard title="Reviews" value="3,210" icon={<FaStar />} />
      </div>
    </div>
  );
};

export default DashboardPage;
