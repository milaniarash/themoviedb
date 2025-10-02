// utils/api.ts
import axios from "axios";

// Create axios instance
const api = axios.create({
	baseURL: "https://api.themoviedb.org/3",
	headers: {
		accept: "application/json",
	},
});

// Add request interceptor to attach token
api.interceptors.request.use(
	(config) => {
		const token =
			"eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYjUzMTQwOTI1ZjJlZGM0YmEwMjZjYTYzM2E5NjYyNiIsIm5iZiI6MTc1OTMyOTc0MC42NzI5OTk5LCJzdWIiOiI2OGRkM2RjYzYyYjBhZTVmM2VlMWQ3OTgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Ola6KS5klzZS8nbFslP206YPrWdSd9a_cHzOb9MpUJU";

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => Promise.reject(error),
);

export default api;
