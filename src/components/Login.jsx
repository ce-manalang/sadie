import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setToken }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post('http://localhost:3000/users/sign_in', {
				user: { email, password }
			}, {
				headers: { Accept: 'application/json' }
			});
			// Devise-JWT usually sends the token in the 'Authorization' header
			const token = response.headers.authorization;
			localStorage.setItem('token', token);
			setToken(token);
			alert("Logged in to Sam!");
			navigate('/dashboard');
		} catch (err) {
			alert("Login failed");
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
			<input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
			<button type="submit">Login</button>
		</form>
	);
}

export default Login;