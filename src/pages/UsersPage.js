import { useMemo, useState } from "react";
import usersMock from "../mocks/users";
import "./UsersPage.css";

const roles = ["All", "Seller", "Buyer", "Admin"];
const statuses = ["All", "Active", "Inactive"];

const UsersPage = ({ collapsed }) => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredUsers = useMemo(() => {
    return usersMock.filter(user => {
      const matchesSearch =
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole = roleFilter === "All" || user.role === roleFilter;
      const matchesStatus = statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [search, roleFilter, statusFilter]);

  return (
    <main className={`usersPageContainer ${collapsed ? "collapsed" : ""}`}>
      <h2 className="usersTitle">Users</h2>

      <div className="usersFilters">
        <input
          type="search"
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="usersSearchInput"
        />
        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          className="usersSelect"
        >
          {roles.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="usersSelect"
        >
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className="usersTableWrapper">
        <table className="usersTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Registered At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="noUsers">No users found.</td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <span className={`statusTag status-${user.status.toLowerCase()}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>{user.registeredAt}</td>
                  <td>
                    <button className="actionBtn view" title="View">👁️</button>
                    <button className="actionBtn edit" title="Edit">✏️</button>
                    <button className="actionBtn toggleStatus" title={user.status === "Active" ? "Deactivate" : "Activate"}>
                      {user.status === "Active" ? "🚫" : "✅"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default UsersPage;
