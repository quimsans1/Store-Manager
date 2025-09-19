import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../../features/products/productsSlice';
import './Pagination.css';

export default function Pagination() {
	const dispatch = useDispatch();
	
	// OBTENIM LES DADES DE PÀGINACIÓ DE REDUX
	const { pagination } = useSelector((state) => state.products);	
	const { currentPage, totalPages, totalItems, itemsPerPage } = pagination;

	// No mostrar paginació si només hi ha una pàgina o zero productes
	if (totalPages <= 1) {
		return null;
	}

	{/* HANDLES PER NAVEGACIÓ DE PÀGINES */}
	const handlePreviousPage = () => {
		if (currentPage > 1) {
			dispatch(setCurrentPage(currentPage - 1));
		}
	};
	const handleNextPage = () => {
		if (currentPage < totalPages) {
			dispatch(setCurrentPage(currentPage + 1));
		}
	};

	// Calcular el rang de productes mostrats
	const startItem = (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(currentPage * itemsPerPage, totalItems);

	return (
		<div className="pagination">
			{/* INFORMACIÓ SOBRE LA PÀGINACIÓ */}
			<div className="pagination-info">
				Showing {startItem}-{endItem} of {totalItems} products
			</div>
			
			<div className="pagination-controls">
				{/* PERVIOUS PAGE BUTTON*/}
				<button
					className="btn"
					onClick={handlePreviousPage}
					disabled={currentPage === 1}
					aria-label="Previous page"
				>
					← Previous
				</button>
				
				{/* Page X of X */}
				<div className="pagination-pages">
					<span className="current-page">
						Page {currentPage} of {totalPages}
					</span>
				</div>
				
				{/* NEXT PAGE BUTTON*/}
				<button
					className="btn"
					onClick={handleNextPage}
					disabled={currentPage === totalPages}
					aria-label="Next page"
				>
					Next →
				</button>
			</div>
		</div>
	);
}
