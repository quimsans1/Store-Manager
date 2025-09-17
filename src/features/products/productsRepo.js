// In-memory async repository simulating server latency
// L'aplicació utilitza un repositori in-memory que simula una API:
let productsDb = [
	{ id: 'p-1', name: 'Wireless Mouse', price: 19.99, category: 'Accessories', imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=1200&auto=format&fit=crop' },
	{ id: 'p-2', name: 'Mechanical Keyboard', price: 79.99, category: 'Accessories', imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop' },
	{ id: 'p-3', name: 'USB-C Charger', price: 24.5, category: 'Power', imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=1200&auto=format&fit=crop' },
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

import { v4 as uuidv4 } from 'uuid';

const generateId = () => `p-${uuidv4()}`;

export const productsRepo = {
	async list({ search = '', category = '' } = {}) {
		await delay(250);
		const term = search.trim().toLowerCase();
		return productsDb.filter((p) => {
			const matchesSearch = term
				? p.name.toLowerCase().includes(term) || String(p.price).includes(term) || p.category.toLowerCase().includes(term)
				: true;
			const matchesCategory = category ? p.category === category : true;
			return matchesSearch && matchesCategory;
		});
	},

	async getById(id) {
		await delay(200);
		return productsDb.find((p) => p.id === id) || null;
	},

	async create(data) {
		await delay(250);
		const product = { ...data, id: generateId() };
		productsDb = [product, ...productsDb];
		return product;
	},

	async update(id, data) {
		await delay(250);
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
		await delay(200);
		productsDb = productsDb.filter((p) => p.id !== id);
		return { id };
	},
};


