import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { LayoutGroup, motion, AnimatePresence } from 'framer-motion';
import PublicCatalog from './components/PublicCatalog';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import BookDetail from './components/BookDetail';
import { ErrorFallback } from './components/ErrorFallback';
import { useAuth } from './hooks/useAuth';

function AppContent({ token, setToken }) {
	const navigate = useNavigate();
	const { logout } = useAuth();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const handleLogout = () => {
		logout();
		setToken(null);
		navigate('/login');
	};

	return (
		<div className="bg-background min-h-screen">
			{/* Mobile menu */}
			<AnimatePresence>
				{mobileMenuOpen && (
					<div className="fixed inset-0 z-50 lg:hidden">
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 0.25 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.3, ease: 'easeOut' }}
							className="fixed inset-0 bg-black"
							onClick={() => setMobileMenuOpen(false)}
						/>
						<motion.div
							initial={{ x: '-100%' }}
							animate={{ x: 0 }}
							exit={{ x: '-100%' }}
							transition={{ duration: 0.3, ease: 'easeOut' }}
							className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-surface pb-12 shadow-xl"
						>
							<div className="flex px-4 pb-2 pt-5">
								<button
									type="button"
									onClick={() => setMobileMenuOpen(false)}
									className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
								>
									<span className="absolute -inset-0.5"></span>
									<span className="sr-only">Close menu</span>
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
										<path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</button>
							</div>

							{/* Links */}
							<div className="space-y-6 border-t border-gray-200 px-4 py-6">
								<div className="flow-root">
									<Link to="/" className="-m-2 block p-2 font-display text-gray-800" onClick={() => setMobileMenuOpen(false)}>Public Library</Link>
								</div>
								<div className="flow-root">
									<Link to="/dashboard" className="-m-2 block p-2 font-display text-gray-800" onClick={() => setMobileMenuOpen(false)}>My Dashboard</Link>
								</div>
							</div>

							<div className="space-y-6 border-t border-gray-200 px-4 py-6">
								{!token ? (
									<>
										<div className="flow-root">
											<Link to="/login" className="-m-2 block p-2 font-display text-gray-800" onClick={() => setMobileMenuOpen(false)}>Sign in</Link>
										</div>
										<div className="flow-root">
											<a href="#" className="-m-2 block p-2 font-display text-gray-800">Create account</a>
										</div>
									</>
								) : (
									<div className="flow-root">
										<button onClick={() => { handleLogout(); setMobileMenuOpen(false); }} className="-m-2 block p-2 font-display text-gray-800">Logout</button>
									</div>
								)}
							</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>

			<header className="relative overflow-hidden">
				{/* Top navigation */}
				<nav aria-label="Top" className="relative z-20 bg-surface/90 backdrop-blur-xl">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex h-16 items-center">
							<button
								type="button"
								onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
								className="relative rounded-md bg-surface p-2 text-gray-400 lg:hidden"
							>
								<span className="absolute -inset-0.5"></span>
								<span className="sr-only">Open menu</span>
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
									<path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</button>

							{/* Logo */}
							<div className="ml-4 flex lg:ml-0">
								<Link to="/">
									<span className="sr-only">Sadie</span>
									<span className="font-display text-xl text-gray-800">Sadie</span>
								</Link>
							</div>

							{/* Desktop nav links */}
							<div className="hidden lg:ml-8 lg:block lg:self-stretch">
								<div className="flex h-full space-x-8">
									<Link to="/" className="flex items-center text-sm font-display text-gray-600 hover:text-teal-600 transition-colors duration-200">Public Library</Link>
									<Link to="/dashboard" className="flex items-center text-sm font-display text-gray-600 hover:text-teal-600 transition-colors duration-200">My Dashboard</Link>
								</div>
							</div>

							<div className="ml-auto flex items-center">
								<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
									{!token ? (
										<>
											<Link to="/login" className="text-sm font-display text-gray-600 hover:text-teal-600 transition-colors duration-200">Sign in</Link>
											<span aria-hidden="true" className="h-6 w-px bg-gray-200"></span>
											<a href="#" className="text-sm font-display text-gray-600 hover:text-teal-600 transition-colors duration-200">Create account</a>
										</>
									) : (
										<button onClick={handleLogout} className="text-sm font-display text-gray-600 hover:text-teal-600 transition-colors duration-200">Logout</button>
									)}
								</div>
							</div>
						</div>
					</div>
				</nav>
			</header>

			<main>
				<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
						<LayoutGroup>
							<Routes>
								<Route path="/" element={<PublicCatalog />} />
								<Route path="/books/:id" element={<BookDetail />} />
								<Route path="/dashboard" element={<Dashboard />} />
								<Route path="/login" element={<Login setToken={setToken} />} />
							</Routes>
						</LayoutGroup>
					</ErrorBoundary>
				</div>
			</main>

			<footer aria-labelledby="footer-heading" className="bg-background">
				<h2 id="footer-heading" className="sr-only">Footer</h2>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="border-t border-gray-200 py-10">
						<p className="text-sm text-gray-500">Copyright &copy; 2026 Sadie</p>
					</div>
				</div>
			</footer>
		</div>
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
