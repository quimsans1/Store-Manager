// In-memory async repository simulating server latency
// L'aplicació utilitza un repositori in-memory que simula una API:
import { initialProductsDb } from './initialProductsDb.js';
let productsDb = [...initialProductsDb];

// Array que retorna el Promise amb un setTimeout
// Simulació de latència de servidor
const delay = (msTime) => new Promise((resolve) => setTimeout(resolve, msTime));

// --- PER GENERAR ID ---
import { v4 as uuidv4 } from 'uuid';
const generateId = () => uuidv4();

// --- REPOSITORI ---

export const productsRepo = {

	async getAll({ search = '', category = '', page = 1, itemsPerPage = 8 } = {}) {
		await delay(250);

		// Obtenir tots els productes, segons els filtres de cerca i categoria
		const term = search.trim().toLowerCase();
		const filteredProducts = productsDb.filter((p) => {
			const matchesSearch = term
				? p.name.toLowerCase().includes(term) || String(p.price).includes(term) || p.category.toLowerCase().includes(term)
				: true;
			const matchesCategory = category ? p.category === category : true;
			return matchesSearch && matchesCategory;
		});

		// Calcular productes de la pàgina (segons filtratge i paginació)
		const totalItems = filteredProducts.length;
		const totalPages = Math.ceil(totalItems / itemsPerPage);
		const startIndex = (page - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		const productsOfThePage = filteredProducts.slice(startIndex, endIndex);

		return {
			items: productsOfThePage,
			pagination: {
				currentPage: page,
				itemsPerPage,
				totalItems,
				totalPages,
			}
		};
	},

	async getById(id) {
		await delay(250);
		// Obtenir un producte per id
		return productsDb.find((p) => p.id === id) || null;
	},

	async create(data) {
		await delay(250);
		// Crear nou producte
		const product = { ...data, id: generateId() };
		productsDb = [product, ...productsDb];
		return product;
	},

	async update(id, data) {
		await delay(250);
		// Actualitzar producte
		let updated = null;
		productsDb = productsDb.map((p) => {
			if (p.id === id) {
				updated = { ...p, ...data, id };
				return updated;
			}
			return p;
		});
		return updated;
	},

	async remove(id) {
		await delay(250);
		// Eliminar producte
		productsDb = productsDb.filter((p) => p.id !== id);
		return { id };
	},
};


