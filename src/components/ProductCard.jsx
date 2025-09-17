import { Link } from 'react-router-dom';

export default function ProductCard({ product, onClick, onDelete }) {
	return (
		<div className="card-item" role="button" tabIndex={0} onClick={() => onClick(product)} onKeyDown={(e) => { if (e.key === 'Enter') onClick(product) }}>
			<div className="card-image-wrap">
				<img
					src={product.imageUrl}
					alt={product.name}
					className="card-image"
				/>
				<div className="card-overlay">
					<Link
						className="btn overlay-btn left"
						to={`/products/${product.id}/edit`}
						onClick={(e) => e.stopPropagation()}
						title="Edit"
					>
						✏️
					</Link>
					<button
						className="btn danger overlay-btn right"
						onClick={(e) => { e.stopPropagation(); onDelete(product.id); }}
						title="Delete"
					>
						🗑️
					</button>
				</div>
			</div>
			<div className="card-meta">
				<div className="card-title">
					{product.name}
				</div>
				<div className="card-price">
					{Number(product.price).toFixed(2)} €
				</div>
			</div>
		</div>
	);
}


