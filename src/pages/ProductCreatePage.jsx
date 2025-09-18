import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ProductForm from '../components/products/productForm/ProductForm';
import { createProduct } from '../features/products/productsSlice';
import './ProductPages.css';

export default function ProductCreatePage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [submitting, setSubmitting] = useState(false);
	const [formValues, setFormValues] = useState({ name: '', price: '', category: '', imageUrl: '' });

	const onSubmit = async (data) => {
		setSubmitting(true);
		await dispatch(createProduct(data));
		setSubmitting(false);
		navigate('/');
	};

	const handleFormChange = (values) => {
		setFormValues(values);
	};

	return (
		<div className="container">
			<header className="header">
				<h1>New product</h1>
				<Link className="btn" to="/"><span className="back-arrow">←</span> Back to Products</Link>
			</header>

			<div className="panel">
				<div className="preview-data">
					Complete the form to create a new product
				</div>
				<div className="two-col">
					<div className="col left">
						<div className="preview">
							{formValues.imageUrl ? (
								<img 
									src={formValues.imageUrl} 
									alt={formValues.name || "Product image"} 
								/>
							) : (
								<div className="image-placeholder">
									<div className="placeholder-icon">📷</div>
									<div className="placeholder-text">No image selected</div>
									<div className="placeholder-subtext">Add an image URL to see preview</div>
								</div>
							)}
						</div>
					</div>
					<div className="col right">
						<ProductForm
							onSubmit={onSubmit}
							submitting={submitting}
							onFormChange={handleFormChange}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}