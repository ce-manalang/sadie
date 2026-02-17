import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useBookDetail } from '../hooks/useBookDetail';

function BookDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const { book, loading, error, addToLibrary, adding } = useBookDetail(id);
	const [tagsOpen, setTagsOpen] = useState(false);

	if (loading) {
		return (
			<div className="flex justify-center items-center h-96">
				<p className="text-gray-500 animate-pulse text-lg">Loading book details...</p>
			</div>
		);
	}

	if (error || !book) {
		return (
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 text-center">
				<h2 className="text-2xl font-display text-gray-800">{error || "Book not found"}</h2>
				<button
					onClick={() => navigate(-1)}
					className="mt-6 text-teal-600 hover:text-teal-700 font-display transition-colors duration-200"
				>
					&larr; Go back to catalog
				</button>
			</div>
		);
	}

	return (
		<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
			<div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
				{/* Book cover */}
				<div className="flex justify-center">
					<motion.img
						layoutId={`book-cover-${id}`}
						src={book.cover?.url || 'https://via.placeholder.com/300x450?text=No+Cover'}
						alt={`${book.title} cover`}
						className="w-full max-w-md rounded-card shadow-lg"
					/>
				</div>

				{/* Book info */}
				<div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
					<div className="flex justify-between items-start">
						<div>
							<h1 className="font-display text-3xl text-gray-800">{book.title}</h1>
							<p className="mt-2 text-xl text-teal-600">{book.author}</p>
						</div>
						{book.in_library && (
							<span className="bg-teal-400/10 text-teal-700 border border-teal-400/20 rounded-sm px-3 py-0.5 text-sm font-display">
								In Library
							</span>
						)}
					</div>

					{/* ISBN */}
					<div className="mt-3">
						<h3 className="sr-only">ISBN</h3>
						<p className="text-sm text-gray-500 italic">ISBN: {book.isbn || "N/A"}</p>
					</div>

					{/* Description */}
					<div className="mt-6">
						<h3 className="sr-only">Description</h3>
						<div className="space-y-6 text-base leading-relaxed text-gray-600">
							<p>{book.description || "No description available for this book."}</p>
						</div>
					</div>

					{/* Actions */}
					<div className="mt-10">
						{!book.in_library ? (
							<motion.button
								type="button"
								onClick={addToLibrary}
								disabled={adding}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-card transition-colors duration-200 font-display disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{adding ? "Adding..." : "Add to Library"}
							</motion.button>
						) : (
							<div className="bg-gray-50 rounded-card p-4 border border-gray-200">
								<h3 className="text-sm font-display text-gray-800">Personal Status</h3>
								<p className="mt-1 text-sm text-gray-600 capitalize">
									{book.library_status ? book.library_status.replace('-', ' ') : 'N/A'}
								</p>

								<h3 className="mt-4 text-sm font-display text-gray-800">Personal Notes</h3>
								<p className="mt-1 text-sm text-gray-600 italic">
									{book.library_notes || "No personal notes yet."}
								</p>
							</div>
						)}
					</div>

					{/* Additional details */}
					<section aria-labelledby="details-heading" className="mt-12">
						<h2 id="details-heading" className="sr-only">Additional details</h2>

						<div className="divide-y divide-gray-200 border-t border-gray-200">
							{book.tags && (
								<div>
									<h3>
										<button
											type="button"
											onClick={() => setTagsOpen(!tagsOpen)}
											className="group relative flex w-full items-center justify-between py-6 text-left"
										>
											<span className={`text-sm font-display ${tagsOpen ? 'text-teal-600' : 'text-gray-800'}`}>
												Tags
											</span>
											<span className="ml-6 flex items-center">
												{tagsOpen ? (
													<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6 text-teal-600">
														<path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
													</svg>
												) : (
													<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-6 text-gray-400 group-hover:text-gray-500">
														<path d="M12 4.5v15m7.5-7.5h-15" strokeLinecap="round" strokeLinejoin="round" />
													</svg>
												)}
											</span>
										</button>
									</h3>
									<AnimatePresence>
										{tagsOpen && (
											<motion.div
												initial={{ height: 0, opacity: 0 }}
												animate={{ height: 'auto', opacity: 1 }}
												exit={{ height: 0, opacity: 0 }}
												transition={{ duration: 0.2 }}
												className="overflow-hidden"
											>
												<div className="pb-6">
													<ul role="list" className="list-disc space-y-1 pl-5 text-sm text-gray-600 marker:text-gray-300">
														{book.tags.split(',').map(tag => (
															<li key={tag} className="pl-2">{tag.trim()}</li>
														))}
													</ul>
												</div>
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							)}
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}

export default BookDetail;
