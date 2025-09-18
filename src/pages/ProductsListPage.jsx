import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, fetchProducts, setFilters } from '../features/products/productsSlice';
import { PRODUCT_CATEGORIES } from '../features/constants/constants';
import ProductCard from '../components/products/productCard/ProductCard';
import ProductDetailModal from '../components/products/productDetailModal/ProductDetailModal';
import ConfirmModal from '../components/ui/modals/ConfirmModal';
import Spinner from '../components/ui/spinner/Spinner';
import Pagination from '../components/ui/pagination/Pagination';

export default function ProductsListPage() {
	const dispatch = useDispatch();
	const { items, loading, error, filters, pagination } = useSelector((s) => s.products);
	const [inputSearch, setInputSearch] = useState(filters.search || '');
	const [inputCategory, setInputCategory] = useState(filters.category || '');
	const [selected, setSelected] = useState(null);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const [productToDelete, setProductToDelete] = useState(null);

	// FILTER PRODUCTS - only when filters or pagination actually change
	useEffect(() => {
		// Sempre recarreguem els productes quan canviem de pàgina o filtres
		// Això assegura que sempre tenim dades actualitzades
		dispatch(fetchProducts({ 
			filters, 
			pagination: { 
				page: pagination.currentPage, 
				itemsPerPage: pagination.itemsPerPage 
			} 
		}));
	}, [dispatch, filters, pagination.currentPage, pagination.itemsPerPage]);

	// ALL CATEGORIES
	const categories = useMemo(() => {
		return ['', ...PRODUCT_CATEGORIES];
	}, []);

	// Handle filter changes
	const handleSearchChange = (e) => {
		const value = e.target.value;
		setInputSearch(value);
		dispatch(setFilters({ search: value, category: inputCategory }));
	};

	const handleCategoryChange = (e) => {
		const value = e.target.value;
		setInputCategory(value);
		dispatch(setFilters({ search: inputSearch, category: value }));
	};

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
					onChange={handleSearchChange}
				/>
				<select value={inputCategory} onChange={handleCategoryChange}>
					{categories.map((c) => (
						<option key={c || 'all'} value={c}>{c || 'All categories'}</option>
					))}
				</select>
				<Link className="btn accent" to="/products/new">New Product</Link>
			</div>

			{loading && <Spinner size="large" className="center" />}
			{error && <p className="error">{error}</p>}

			{!loading && (
				<>
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
					<Pagination />
				</>
			)}

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


