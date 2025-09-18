import { Link } from 'react-router-dom';
import './ProductDetailModal.css';

export default function ProductDetailModal({ product, open, onClose, onDelete }) {
	if (!open || !product) return null;

	return (
		<div className="modal-backdrop" onClick={onClose}>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				<button className="modal-close" onClick={onClose} aria-label="Close">×</button>
				<div className="product-detail">
					{/* Imatge del producte */}
					<img src={product.imageUrl} alt={product.name} className="detail-image" />

					{/* Detalls del producte: NOM, CATEGORIA, PREU */}
					<h2>{product.name}</h2>
					<p className="muted">Category: {product.category}</p>
					<p className="price">{Number(product.price).toFixed(2)} €</p>

					{/* Botons EDITAR i ELIMINAR */}
					<div className="form-actions">
						<Link
							style={{ marginRight: '10px' }}
							className="btn"
							to={`/products/${product.id}/edit`}
							onClick={onClose}
							title="Edit"
						>
							✏️
						</Link>
						<button
							className="btn danger"
							onClick={() => onDelete(product.id)}
							title="Delete"
						>
							🗑️
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
