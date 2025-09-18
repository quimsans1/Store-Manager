import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { productsRepo } from './productsRepo';

// Cada thunk gestiona una crida async al repositori de productes.
// Això permet separar la lògica d'accés a dades i centralitzar-la a Redux.
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (filters) => {
	const items = await productsRepo.getAll(filters || {});
	return items;
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
};

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		// Actualitza els filtres de cerca
		setFilters(state, action) {
			state.filters = { ...state.filters, ...action.payload };
		},
		// Neteja el producte actual
		clearCurrent(state) {
			state.current = null;
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
				state.items = action.payload; // la llista que ve de l'API
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
			.addCase(createProduct.fulfilled, (state, action) => {
				state.items.unshift(action.payload);
			})

			// Gestió de updateProduct
			.addCase(updateProduct.fulfilled, (state, action) => {
				state.items = state.items.map((p) => (p.id === action.payload.id ? action.payload : p));
				state.current = action.payload;
			})

			// Gestió de deleteProduct
			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.items = state.items.filter((p) => p.id !== action.payload);
			});
	},
});

export const { setFilters, clearCurrent } = productsSlice.actions;
export default productsSlice.reducer;