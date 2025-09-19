import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productsRepo } from './api/productsRepo';

// Cada thunk gestiona una crida async al repositori de productes.
// Això permet separar la lògica d'accés a dades i centralitzar-la a Redux.
export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ filters = {}, pagination = {} } = {}) => {
	const { search = '', category = '' } = filters;
	const { page = 1, itemsPerPage = 12 } = pagination;
	
	const result = await productsRepo.getAll({ search, category, page, itemsPerPage });
	return result;
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id) => {
	const item = await productsRepo.getById(id);
	return item;
});

export const createProduct = createAsyncThunk('products/createProduct', async (data) => {
	const created = await productsRepo.create(data);
	return created;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, data }) => {
	const updated = await productsRepo.update(id, data);
	return updated;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id) => {
	await productsRepo.remove(id);
	return id;
});

// Estat inicial del slice de Redux, punt de partida de les dades
const initialState = {
	items: [], // Llista de productes
	loading: false, // Per indicar si hi ha una crida en curs
	error: null, // Missatge d'error en cas que una crida falli
	current: null, // El producte actualment seleccionat (per veure/editar)
	filters: {
		search: '', // Text del cercador
		category: '', // Categoria seleccionada en el selector
	},
	pagination: {
		currentPage: 1, // Pàgina actual
		itemsPerPage: 8, // Productes per pàgina
		totalItems: 0, // Total de productes
		totalPages: 0, // Total de pàgines
	},
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		// Actualitza els filtres de cerca
		setFilters(state, action) {
			state.filters = { ...state.filters, ...action.payload };
			// Quan canviem els filtres, tornem a la primera pàgina
			state.pagination.currentPage = 1;
		},
		// Neteja el producte actual
		clearCurrent(state) {
			state.current = null;
		},
		// Actualitza la pàgina actual
		setCurrentPage(state, action) {
			state.pagination.currentPage = action.payload;
		},
		// Actualitza la informació de paginació
		setPaginationInfo(state, action) {
			state.pagination = { ...state.pagination, ...action.payload };
		},
	},
	extraReducers: (builder) => {
		builder
			// Gestió de fetchProducts
			.addCase(fetchProducts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.items = action.payload.items; // la llista que ve de l'API
				state.pagination = { ...state.pagination, ...action.payload.pagination }; // actualitzar paginació
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to load products';
			})

			// Gestió de fetchProductById
			.addCase(fetchProductById.pending, (state) => {
				state.loading = true;
				state.error = null;
				state.current = null;
			})
			.addCase(fetchProductById.fulfilled, (state, action) => {
				state.loading = false;
				state.current = action.payload;
			})
			.addCase(fetchProductById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to load product';
			})

			// Gestió de createProduct
			.addCase(createProduct.fulfilled, (state) => {
				// Quan es crea un producte nou, tornem a la primera pàgina
				// i netegem l'array d'items per forçar una recàrrega completa
				state.pagination.currentPage = 1;
				state.items = []; // Netegem l'array per forçar recàrrega
			})

			// Gestió de updateProduct
			.addCase(updateProduct.fulfilled, (state, action) => {
				// Quan s'actualitza un producte, tornem a la primera pàgina
				// i netegem l'array d'items per forçar una recàrrega completa
				state.pagination.currentPage = 1;
				state.items = []; // Netegem l'array per forçar recàrrega
				state.current = action.payload;
			})

			// Gestió de deleteProduct
			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.items = state.items.filter((p) => p.id !== action.payload);
				// Si després d'eliminar un producte, la pàgina actual queda buida,
				// tornem a la pàgina anterior
				if (state.items.length === 0 && state.pagination.currentPage > 1) {
					state.pagination.currentPage = state.pagination.currentPage - 1;
				}
			});
	},
});

export const { setFilters, clearCurrent, setCurrentPage, setPaginationInfo } = productsSlice.actions;
export default productsSlice.reducer;