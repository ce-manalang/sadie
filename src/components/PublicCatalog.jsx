import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:3000/books";

function PublicCatalog() {
	const [books, setBooks] = useState([]);

	useEffect(() => {
		axios.get(API_URL)
			.then(res => setBooks(res.data))
			.catch(err => console.error("Error fetching books", err));
	}, []);

	return (
		<div>
			<h1>Public Library</h1>
			<div className="grid">
				{books.map(book => (
					<div key={book.id} className="card">
						<h3>{book.title}</h3>
						<p>{book.author}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default PublicCatalog;