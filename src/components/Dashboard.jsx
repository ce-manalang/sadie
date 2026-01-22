import { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
	const [myBooks, setMyBooks] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchPrivateBooks = async () => {
			const token = localStorage.getItem('token');

			try {
				const res = await axios.get('http://localhost:3000/my_books', {
					headers: {
						// This is how Sam knows it's you!
						Authorization: token
					}
				});
				setMyBooks(res.data);
			} catch (err) {
				console.error("Unauthorized or Sam is down", err);
			} finally {
				setLoading(false);
			}
		};

		fetchPrivateBooks();
	}, []);

	if (loading) return <p>Loading your personal library...</p>;

	return (
		<div>
			<h2>My Private Dashboard</h2>
			<p>Only you can see these books.</p>
			<div className="grid">
				{myBooks.map(book => (
					<div key={book.id} className="card" style={{ border: '1px solid blue' }}>
						<h3>{book.title}</h3>
						<span>{book.is_public ? "🌍 Public" : "🔒 Private"}</span>
					</div>
				))}
			</div>
		</div>
	);
}

export default Dashboard;