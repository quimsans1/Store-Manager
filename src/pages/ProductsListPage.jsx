import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, fetchProducts, setFilters } from '../features/products/productsSlice';
import { PRODUCT_CATEGORIES } from '../features/products/constants';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';
import ConfirmModal from '../components/ConfirmModal';

export default function ProductsListPage() {
	const dispatch = useDispatch();
	const { items, loading, error, filters } = useSelector((s) => s.products);
	const [inputSearch, setInputSearch] = useState(filters.search || '');
	const [inputCategory, setInputCategory] = useState(filters.category || '');
	const [selected, setSelected] = useState(null);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [productToDelete, setProductToDelete] = useState(null);

	// FILTER PRODUCTS
	useEffect(() => {
		dispatch(fetchProducts(filters));
	}, [dispatch, filters]);

	// ALL CATEGORIES
	const categories = useMemo(() => {
		return ['', ...PRODUCT_CATEGORIES];
	}, []);

	// UPDATE FILTERS when STATE changes
	useEffect(() => {
		dispatch(setFilters({ search: inputSearch, category: inputCategory }));
	}, [dispatch, inputSearch, inputCategory]);

	// --- DELETE PRODUCT ---
	const handleDelete = (id) => {
		const product = items.find(p => p.id === id);
		setProductToDelete(product);
		setShowDeleteConfirm(true);
	};
	const confirmDelete = () => {
		if (productToDelete) {
			dispatch(deleteProduct(productToDelete.id));
			setShowDeleteConfirm(false);
			setProductToDelete(null);
			setSelected(null);
		}
	};
	const cancelDelete = () => {
		setShowDeleteConfirm(false);
		setProductToDelete(null);
	};

	return (
		<div className="container">
			<header className="header">
				<h1>Products</h1>
			</header>

			<div className="filters">
				<input
					type="text"
					placeholder="Search by name, price, or category"
					value={inputSearch}
					onChange={(e) => setInputSearch(e.target.value)}
				/>
				<select value={inputCategory} onChange={(e) => setInputCategory(e.target.value)}>
					{categories.map((c) => (
						<option key={c || 'all'} value={c}>{c || 'All categories'}</option>
					))}
				</select>
				<Link className="btn accent" to="/products/new">New Product</Link>
			</div>

			{loading && <p>Loading...</p>}
			{error && <p className="error">{error}</p>}

			<div className="grid">
				{items.map((p) => (
					<ProductCard
						key={p.id}
						product={p}
						onClick={setSelected}
						onDelete={handleDelete}
					/>
				))}
			</div>

			<ProductDetailModal
				product={selected}
				open={!!selected}
				onClose={() => setSelected(null)}
				onDelete={handleDelete}
			/>

			<ConfirmModal
				open={showDeleteConfirm}
				onClose={cancelDelete}
				onConfirm={confirmDelete}
				title="Delete Product"
				message={productToDelete ? `Are you sure you want to delete "${productToDelete.name}"?` : ''}
				confirmText="Delete"
				cancelText="Cancel"
			/>
		</div>
	);
}


