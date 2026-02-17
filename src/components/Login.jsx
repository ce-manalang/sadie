import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

function Login({ setToken }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		const result = await login(email, password);

		if (result.success) {
			setToken(result.token);
			navigate('/dashboard');
		} else {
			setError(result.error);
		}
	};

	return (
		<div className="min-h-[60vh] flex items-center justify-center">
			<div className="bg-surface rounded-card shadow-card p-8 w-full max-w-sm">
				<h2 className="font-display text-2xl text-gray-800 text-center mb-6">Sign in</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label htmlFor="email" className="text-sm font-display text-gray-600 mb-1 block">
							Email
						</label>
						<input
							id="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="your@email.com"
							required
							className="w-full px-4 py-3 border border-gray-200 rounded-card text-base text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 transition-colors duration-200"
						/>
					</div>

					<div>
						<label htmlFor="password" className="text-sm font-display text-gray-600 mb-1 block">
							Password
						</label>
						<input
							id="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
							required
							className="w-full px-4 py-3 border border-gray-200 rounded-card text-base text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 transition-colors duration-200"
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-teal-500 hover:bg-teal-600 text-white py-3 rounded-card font-display transition-colors duration-200 mt-6"
					>
						Sign in
					</button>

					{error && (
						<p className="text-sm text-error text-center mt-4">{error}</p>
					)}
				</form>
			</div>
		</div>
	);
}

export default Login;
