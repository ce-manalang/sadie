import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:3000/books";

function PublicCatalog() {
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		axios.get(API_URL)
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
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<div className="sm:flex sm:items-baseline sm:justify-between">
					<h2 className="text-2xl font-bold tracking-tight text-gray-900">Public Katalog</h2>
					<p className="mt-1 text-sm text-gray-500 sm:mt-0">Free books for everyone to see.</p>
				</div>

				<div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{books.map((book) => (
						<div key={book.id} className="group relative">
							<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
								<img
									src={book.cover?.url || 'https://via.placeholder.com/300x450?text=No+Cover'}
									alt={book.title}
									className="h-full w-full object-cover object-center lg:h-full lg:w-full"
								/>
							</div>
							<div className="mt-4 flex justify-between">
								<div>
									<h3 className="text-sm font-medium text-gray-900">
										<span aria-hidden="true" className="absolute inset-0" />
										{book.title}
									</h3>
									<p className="mt-1 text-sm text-gray-500">{book.author}</p>
									{book.isbn && <p className="mt-1 text-xs text-gray-400">ISBN: {book.isbn}</p>}
								</div>
							</div>
							{book.description && (
								<p className="mt-2 text-xs text-gray-500 line-clamp-2">{book.description}</p>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default PublicCatalog;