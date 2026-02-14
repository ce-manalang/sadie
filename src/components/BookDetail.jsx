import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function BookDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [book, setBook] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [adding, setAdding] = useState(false);

	useEffect(() => {
		const fetchBook = async () => {
			const token = localStorage.getItem('token');
			const config = token ? { headers: { Authorization: token } } : {};

			try {
				const res = await axios.get(`http://localhost:3000/books/${id}`, config);
				setBook(res.data);
			} catch (err) {
				console.error("Error fetching book details", err);
				setError(err.response?.data?.error || "Failed to load book details");
			} finally {
				setLoading(false);
			}
		};

		fetchBook();
	}, [id]);

	const addToLibrary = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem('token');
		if (!token) {
			navigate('/login');
			return;
		}

		setAdding(true);
		try {
			await axios.post('http://localhost:3000/library_books', {
				library_book: {
					dato_book_id: id,
					status: 'to-read'
				}
			}, {
				headers: { Authorization: token }
			});
			// Refresh book data to show library status
			const res = await axios.get(`http://localhost:3000/books/${id}`, {
				headers: { Authorization: token }
			});
			setBook(res.data);
		} catch (err) {
			console.error("Error adding to library", err);
			alert(err.response?.data?.error || "Failed to add to library");
		} finally {
			setAdding(false);
		}
	};

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
				<h2 className="text-2xl font-bold text-gray-900">{error || "Book not found"}</h2>
				<button
					onClick={() => navigate(-1)}
					className="mt-6 text-indigo-600 hover:text-indigo-500 font-medium"
				>
					&larr; Go back to catalog
				</button>
			</div>
		);
	}

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
					{/* Image gallery */}
					<el-tab-group className="flex flex-col-reverse">
						{/* Image selector (Simplified as we mostly have one cover) */}
						<div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
							<el-tab-list className="grid grid-cols-4 gap-6">
								<button className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-500/50 focus:ring-offset-4">
									<span className="sr-only">Front view</span>
									<span className="absolute inset-0 overflow-hidden rounded-md">
										<img src={book.cover?.url || 'https://via.placeholder.com/300x450?text=No+Cover'} alt="" className="size-full object-cover" />
									</span>
									<span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 [[aria-selected='true']_&]:ring-indigo-500"></span>
								</button>
							</el-tab-list>
						</div>

						<el-tab-panels>
							<div>
								<img src={book.cover?.url || 'https://via.placeholder.com/300x450?text=No+Cover'} alt={book.title} className="aspect-[2/3] w-full object-cover sm:rounded-lg" />
							</div>
						</el-tab-panels>
					</el-tab-group>

					{/* Product info */}
					<div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
						<div className="flex justify-between items-start">
							<div>
								<h1 className="text-3xl font-bold tracking-tight text-gray-900">{book.title}</h1>
								<p className="mt-2 text-xl tracking-tight text-indigo-600">{book.author}</p>
							</div>
							{book.in_library && (
								<span className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
									In Library
								</span>
							)}
						</div>

						{/* Reviews (Placeholder for Rating/Status) */}
						<div className="mt-3">
							<h3 className="sr-only">Status</h3>
							<div className="flex items-center">
								<div className="flex items-center">
									{/* Could map status to stars or icons if needed */}
									<p className="text-sm text-gray-500 italic">ISBN: {book.isbn || "N/A"}</p>
								</div>
							</div>
						</div>

						<div className="mt-6">
							<h3 className="sr-only">Description</h3>
							<div className="space-y-6 text-base text-gray-700">
								<p>{book.description || "No description available for this book."}</p>
							</div>
						</div>

						<form className="mt-6">
							<div className="mt-10 flex">
								{!book.in_library ? (
									<button
										type="submit"
										onClick={addToLibrary}
										disabled={adding}
										className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
									>
										{adding ? "Adding..." : "Add to Library"}
									</button>
								) : (
									<div className="w-full space-y-4">
										<div className="rounded-md bg-gray-50 p-4 border border-gray-200">
											<h3 className="text-sm font-medium text-gray-900">Personal Status</h3>
											<p className="mt-1 text-sm text-gray-600 capitalize">{book.library_status.replace('-', ' ')}</p>

											<h3 className="mt-4 text-sm font-medium text-gray-900">Personal Notes</h3>
											<p className="mt-1 text-sm text-gray-600 italic">
												{book.library_notes || "No personal notes yet."}
											</p>
										</div>
									</div>
								)}

								<button type="button" className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6 shrink-0">
										<path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
									<span className="sr-only">Add to favorites</span>
								</button>
							</div>
						</form>

						<section aria-labelledby="details-heading" class="mt-12">
							<h2 id="details-heading" className="sr-only">Additional details</h2>

							<div className="divide-y divide-gray-200 border-t border-gray-200">
								{book.tags && (
									<div>
										<h3>
											<button type="button" command="--toggle" commandfor="detail-tags" className="group relative flex w-full items-center justify-between py-6 text-left">
												<span className="text-sm font-medium [&:not([aria-expanded='true']_*)]:text-gray-900 [[aria-expanded='true']_&]:text-indigo-600">Tags</span>
												<span className="ml-6 flex items-center">
													<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6 text-gray-400 group-hover:text-gray-500 [[aria-expanded='true']_&]:hidden">
														<path d="M12 4.5v15m7.5-7.5h-15" strokeLinecap="round" strokeLinejoin="round" />
													</svg>
													<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6 text-indigo-400 group-hover:text-indigo-500 [&:not([aria-expanded='true']_*)]:hidden">
														<path d="M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
													</svg>
												</span>
											</button>
										</h3>
										<el-disclosure id="detail-tags" className="[&:not([hidden])]:contents">
											<div className="pb-6">
												<ul role="list" className="list-disc space-y-1 pl-5 text-sm/6 text-gray-700 marker:text-gray-300">
													{book.tags.split(',').map(tag => (
														<li key={tag} className="pl-2">{tag.trim()}</li>
													))}
												</ul>
											</div>
										</el-disclosure>
									</div>
								)}
								{/* Placeholder for more metadata if available */}
							</div>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
}

export default BookDetail;
