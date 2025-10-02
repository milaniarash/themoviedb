// pages/index.tsx
import { useEffect, useState } from "react";
import api from "../utils/api"; // axios instance

type Movie = {
	id: number;
	title: string;
};

type MoviesResponse = {
	results: Movie[];
};

interface HomeProps {
	staticMovies: MoviesResponse;
}

export default function Home({ staticMovies }: HomeProps) {
	const [clientMovies, setClientMovies] = useState<Movie[]>([]);

	// Client-side fetch with useEffect
	useEffect(() => {
		const fetchMovies = async () => {
			try {
				const res = await api.get<MoviesResponse>("/movie/popular", {
					params: { language: "en-US", page: 1 },
				});
				setClientMovies(res.data.results);
			} catch (err) {
				console.error(err);
			}
		};

		fetchMovies();
	}, []);

	return (
		<main className="min-h-screen bg-gray-100 p-8">
			<h1 className="text-3xl font-bold text-center mb-10">🎬 Popular Movies</h1>

			<section className="mb-12">
				<h2 className="text-2xl font-semibold mb-4 text-gray-800">From getStaticProps (build time)</h2>
				<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{staticMovies.results.map((movie) => (
						<li key={movie.id} className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition">
							<span className="block text-lg font-medium text-gray-900">{movie.title}</span>
						</li>
					))}
				</ul>
			</section>

			<section>
				<h2 className="text-2xl font-semibold mb-4 text-gray-800">From useEffect (client fetch)</h2>
				<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{clientMovies.map((movie) => (
						<li key={movie.id} className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition">
							<span className="block text-lg font-medium text-gray-900">{movie.title}</span>
						</li>
					))}
				</ul>
			</section>
		</main>
	);
}

export async function getStaticProps() {
	try {
		const res = await api.get<MoviesResponse>("/movie/popular", {
			params: { language: "en-US", page: 1 },
		});
		console.log({ SERVER: res });
		return {
			props: {
				staticMovies: res.data,
			},
			revalidate: 60, // regenerate page every 60s (ISR)
		};
	} catch (error) {
		console.error(error);

		return {
			props: {
				staticMovies: { results: [] },
			},
		};
	}
}
