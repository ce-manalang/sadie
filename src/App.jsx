import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import PublicCatalog from './components/PublicCatalog';
import Dashboard from './components/Dashboard';
import Login from './components/Login';

function AppContent({ token, setToken }) {
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem('token');
		setToken(null);
		navigate('/login');
	};

	return (
		<>
			<nav style={{ padding: '1rem', background: '#f4f4f4', display: 'flex', gap: '15px', alignItems: 'center' }}>
				<Link to="/">Public Catalog</Link>
				<Link to="/dashboard">My Dashboard</Link>
				{!token ? (
					<Link to="/login">Login</Link>
				) : (
					<button onClick={logout} style={{ marginLeft: 'auto' }}>Logout</button>
				)}
			</nav>

			<div style={{ padding: '2rem' }}>
				<Routes>
					<Route path="/" element={<PublicCatalog />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/login" element={<Login setToken={setToken} />} />
				</Routes>
			</div>
		</>
	);
}

function App() {
	const [token, setToken] = useState(localStorage.getItem('token'));

	return (
		<Router>
			<AppContent token={token} setToken={setToken} />
		</Router>
	);
}

export default App;