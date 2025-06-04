import "./TopBar.css";

const TopBar = ({ collapsed }) => {
  return (
    <header className={`topBar ${collapsed ? "collapsed" : ""}`}>
      <h1 className="topBarTitle">Dashboard</h1>

      <div className="topBarButtons">
        <button className="topBarBtn" aria-label="Notifications">
          🔔
        </button>
        <button className="topBarBtn" aria-label="Messages">
          💬
        </button>
        <button className="topBarBtn" aria-label="Paramètres">
          ⚙️
        </button>
        <button className="topBarBtn profileBtn" aria-label="Profil utilisateur">
          <img
            src="/path/to/avatar.jpg"
            alt="Avatar utilisateur"
            className="avatar"
          />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
