import React from 'react';
import { Link, useNavigate} from 'react-router-dom'; // Adjust the path according to your project structure
import { useAuth } from '../../pages/context/AuthContext';

export default function Header() {
  const { authState, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(() => navigate('/'));
  };
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link to='/frontend/home' className="navbar-brand">Work Sphere</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to='/frontend/home' className="nav-link active">Home</Link>
              </li>
              <li className="nav-item">
                <Link to='/frontend/users' className="nav-link active">Users</Link>
              </li>
              <li className="nav-item">
                <Link to='/frontend/todos' className="nav-link active">Todos</Link>
              </li>
            </ul>
            {authState.isAuthenticated && (
              <div className="d-flex align-items-center">
                <span className="navbar-text me-3">
                Welcome! {authState.user.email}
                </span>
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
