import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLibraryBooks } from '../hooks/useLibraryBooks';

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.05, delayChildren: 0.1 }
	}
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.3, ease: 'easeOut' }
	}
};

function Dashboard() {
	const { books, loading, error, removeBook } = useLibraryBooks();

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<p className="text-gray-500 animate-pulse">Loading your personal library...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center h-64 flex-col space-y-4">
				<p className="text-error text-center">{error}</p>
				<button
					onClick={() => window.location.reload()}
					className="text-sm text-teal-600 hover:text-teal-700"
				>
					Try again
				</button>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
			<div className="sm:flex sm:items-baseline sm:justify-between">
				<h2 className="font-display text-2xl text-gray-800">My Library</h2>
				<p className="mt-1 text-sm text-gray-500 sm:mt-0">Only you can see these books.</p>
			</div>

			{books.length === 0 ? (
				<div className="text-center py-24">
					<h3 className="font-display text-xl text-gray-600">No books found</h3>
					<p className="mt-4 text-gray-500 leading-relaxed">
						Add some books to your library to see them here.
					</p>
					<Link
						to="/"
						className="mt-6 inline-block text-sm text-teal-600 hover:text-teal-700 transition-colors duration-200"
					>
						Browse the catalog &rarr;
					</Link>
				</div>
			) : (
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
				>
					{books.map((book) => (
						<motion.div
							key={book.id}
							variants={itemVariants}
							whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
							className="bg-surface rounded-card shadow-card hover:shadow-card-hover transition-shadow duration-200 overflow-hidden"
						>
							<Link to={`/books/${book.dato_book_id}`}>
								<motion.img
									layoutId={`book-cover-${book.dato_book_id}`}
									src={book.cover?.url || 'https://via.placeholder.com/300x450?text=No+Cover'}
									alt={book.title}
									className="w-full aspect-[2/3] object-cover rounded-t-card"
								/>
								<div className="p-4">
									<h3 className="font-display text-base text-gray-800">
										{book.title}
									</h3>
									<p className="mt-1 text-sm text-gray-500">{book.author}</p>
									<p className="mt-2 text-teal-600 font-display text-xs">{book.status}</p>
									{book.tags && (
										<div className="mt-2 flex flex-wrap gap-1">
											{book.tags.split(',').map(tag => (
												<span key={tag} className="bg-gray-100 text-gray-600 rounded-sm px-2 py-0.5 text-xs">
													{tag.trim()}
												</span>
											))}
										</div>
									)}
								</div>
							</Link>
							<div className="px-4 pb-4">
								<button
									onClick={(e) => {
										e.preventDefault();
										removeBook(book.id);
									}}
									className="w-full text-sm text-gray-400 hover:text-error transition-colors duration-200"
								>
									Remove
								</button>
							</div>
						</motion.div>
					))}
				</motion.div>
			)}
		</div>
	);
}

export default Dashboard;
