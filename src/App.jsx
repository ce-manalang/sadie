import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import PublicCatalog from './components/PublicCatalog';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import BookDetail from './components/BookDetail';

function AppContent({ token, setToken }) {
	const navigate = useNavigate();

	const logout = () => {
		localStorage.removeItem('token');
		setToken(null);
		navigate('/login');
	};

	return (
		<div className="bg-white">
			{/* Mobile menu */}
			<el-dialog>
				<dialog id="mobile-menu" className="m-0 p-0 backdrop:bg-transparent lg:hidden">
					<el-dialog-backdrop className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"></el-dialog-backdrop>
					<div tabIndex="0" className="fixed inset-0 flex focus:outline focus:outline-0">
						<el-dialog-panel className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full">
							<div className="flex px-4 pb-2 pt-5">
								<button type="button" command="close" commandfor="mobile-menu" className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400">
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
									<Link to="/" className="-m-2 block p-2 font-medium text-gray-900" onClick={() => document.getElementById('mobile-menu').close()}>Public Library</Link>
								</div>
								<div className="flow-root">
									<Link to="/dashboard" className="-m-2 block p-2 font-medium text-gray-900" onClick={() => document.getElementById('mobile-menu').close()}>My Dashboard</Link>
								</div>
							</div>

							<div className="space-y-6 border-t border-gray-200 px-4 py-6">
								{!token ? (
									<>
										<div className="flow-root">
											<Link to="/login" className="-m-2 block p-2 font-medium text-gray-900" onClick={() => document.getElementById('mobile-menu').close()}>Sign in</Link>
										</div>
										<div className="flow-root">
											<a href="#" className="-m-2 block p-2 font-medium text-gray-900">Create account</a>
										</div>
									</>
								) : (
									<div className="flow-root">
										<button onClick={() => { logout(); document.getElementById('mobile-menu').close(); }} className="-m-2 block p-2 font-medium text-gray-900">Logout</button>
									</div>
								)}
							</div>
						</el-dialog-panel>
					</div>
				</dialog>
			</el-dialog>

			<header className="relative overflow-hidden">
				{/* Top navigation */}
				<nav aria-label="Top" className="relative z-20 bg-white/90 backdrop-blur-xl backdrop-filter">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<div className="flex h-16 items-center">
							<button type="button" command="show-modal" commandfor="mobile-menu" className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden">
								<span className="absolute -inset-0.5"></span>
								<span className="sr-only">Open menu</span>
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
									<path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
								</svg>
							</button>

							{/* Logo */}
							<div className="ml-4 flex lg:ml-0">
								<Link to="/">
									<span className="sr-only">Your Company</span>
									<img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="" className="h-8 w-auto" />
								</Link>
							</div>

							{/* Flyout menus */}
							<div className="hidden lg:ml-8 lg:block lg:self-stretch">
								<div className="flex h-full space-x-8">
									<Link to="/" className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">Public Library</Link>
									<Link to="/dashboard" className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">My Dashboard</Link>
								</div>
							</div>

							<div className="ml-auto flex items-center">
								<div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
									{!token ? (
										<>
											<Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-800">Sign in</Link>
											<span aria-hidden="true" className="h-6 w-px bg-gray-200"></span>
											<a href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">Create account</a>
										</>
									) : (
										<button onClick={logout} className="text-sm font-medium text-gray-700 hover:text-gray-800">Logout</button>
									)}
								</div>

								{/* Search */}
								<div className="flex lg:ml-6">
									<a href="#" className="p-2 text-gray-400 hover:text-gray-500">
										<span className="sr-only">Search</span>
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
											<path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</a>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</header>

			<main>
				<div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
					<Routes>
						<Route path="/" element={<PublicCatalog />} />
						<Route path="/books/:id" element={<BookDetail />} />
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/login" element={<Login setToken={setToken} />} />
					</Routes>
				</div>
			</main>

			<footer aria-labelledby="footer-heading" className="bg-white">
				<h2 id="footer-heading" className="sr-only">Footer</h2>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="border-t border-gray-200 py-10">
						<p className="text-sm text-gray-500">Copyright &copy; 2026 Your Library, Inc.</p>
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