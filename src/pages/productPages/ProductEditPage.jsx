import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductForm from '../../components/products/productForm/ProductForm';
import { clearCurrent, fetchProductById, updateProduct } from '../../features/products/productsSlice';
import { CircularProgress } from '@mui/material';
import './ProductPages.css';

export default function ProductEditPage() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { current, loading } = useSelector((s) => s.products);
	const [submitting, setSubmitting] = useState(false);
	const [formValues, setFormValues] = useState({ name: '', price: '', category: '', imageUrl: '' });

	useEffect(() => {
		dispatch(fetchProductById(id));
		return () => dispatch(clearCurrent());
	}, [dispatch, id]);

	// Actualitza els valors del formulari quan el producte actual carrega (current)
	useEffect(() => {
		if (current) {
			setFormValues({
				name: current.name || '',
				price: current.price || '',
				category: current.category || '',
				imageUrl: current.imageUrl || ''
			});
		}
	}, [current]);

	const onSubmit = async (data) => {
		setSubmitting(true);
		await dispatch(updateProduct({ id, data }));
		setSubmitting(false);
		navigate('/');
	};

	const handleFormChange = (values) => {
		setFormValues(values);
	};

	return (
		<div className="container">
			<header className="header">
				<h1>Edit product</h1>
				<Link className="btn" to="/">
					<span className="back-arrow">←</span> Back to Products
				</Link>
			</header>

			{loading && <CircularProgress size={40} sx={{ color: 'var(--primary, #3b82f6)', display: 'flex', margin: '50px auto' }} />}

			{current && (
				<div className="panel">
					<div className="two-col">
						<div className="col left">
							<div className="preview">
								{(formValues.imageUrl || current.imageUrl) ? (
									<img 
										src={formValues.imageUrl || current.imageUrl} 
										alt={formValues.name || current.name} 
									/>
								) : (
									<div className="image-placeholder">
										<div className="placeholder-icon">📷</div>
										<div className="placeholder-text">No image available</div>
										<div className="placeholder-subtext">Add an image URL to see preview</div>
									</div>
								)}
							</div>
							<div className="preview-data">
								<h2 style={{ margin: 0 }}>{formValues.name || current.name}</h2>
								<p className="muted" style={{ margin: '4px 0 0' }}>Category: {formValues.category || current.category}</p>
								<p className="price" style={{ margin: '8px 0 0' }}>{Number(formValues.price || current.price).toFixed(2)} €</p>
							</div>
						</div>
						<div className="col right">
							<ProductForm 
								initialValues={current} 
								onSubmit={onSubmit} 
								submitting={submitting}
								onFormChange={handleFormChange}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}


