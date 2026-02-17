import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import sam from '../api/samClient';

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

function PublicCatalog() {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		sam.get('/books')
			.then(res => {
				setBooks(res.data);
				setLoading(false);
			})
			.catch(err => {
				console.error("Error fetching books", err);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<p className="text-gray-500 animate-pulse">Loading public library...</p>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
			<div className="sm:flex sm:items-baseline sm:justify-between">
				<h2 className="font-display text-2xl text-gray-800">Public Katalog</h2>
				<p className="mt-1 text-sm text-gray-500 sm:mt-0">Free books for everyone to see.</p>
			</div>

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
					>
						<Link to={`/books/${book.id}`} className="group block bg-surface rounded-card shadow-card hover:shadow-card-hover transition-shadow duration-200 overflow-hidden">
							<motion.img
								layoutId={`book-cover-${book.id}`}
								src={book.cover?.url || 'https://via.placeholder.com/300x450?text=No+Cover'}
								alt={book.title}
								className="w-full aspect-[2/3] object-cover rounded-t-card"
							/>
							<div className="p-4">
								<h3 className="font-display text-base text-gray-800">
									{book.title}
								</h3>
								<p className="mt-1 text-sm text-gray-500">{book.author}</p>
							</div>
						</Link>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
}

export default PublicCatalog;
