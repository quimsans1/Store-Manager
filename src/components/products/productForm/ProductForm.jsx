import { useEffect, useMemo, useState } from 'react';
import { PRODUCT_CATEGORIES } from '../../../features/constants/constants';
import Spinner from '../../ui/spinner/Spinner';
import './ProductForm.css';

export default function ProductForm({ initialValues, onSubmit, submitting, onFormChange }) {
	const [values, setValues] = useState(
		initialValues || { name: '', price: '', category: '', imageUrl: '' }
	);
	const [errors, setErrors] = useState({});
	const [touched, setTouched] = useState({});

	useEffect(() => {
		if (initialValues) {
			setValues(
				{ 
					...initialValues,
					price: String(initialValues.price)
				}
			);
		}
	}, [initialValues]);

	// NOTIFY PARENT COMPONENT about FORM CHANGES
	useEffect(() => {
		if (onFormChange) {
			onFormChange(values);
		}
	}, [values, onFormChange]);

	// BASIC VALIDATION of THE FORM (required fields, numeric format, etc.)
	const validate = useMemo(() => (vals) => {
		const e = {};
		const name = vals.name?.trim() || '';
		const category = vals.category?.trim() || '';
		const imageUrl = vals.imageUrl?.trim() || '';
		const priceStr = String(vals.price ?? '').trim();
		const priceNum = Number(priceStr);
		const priceRegex = /^\d+(?:\.[0-9]{1,2})?$/;
		const urlRegex = /^https?:\/\/.+/; // More flexible URL validation that accepts various image hosting services

		if (!name) e.name = 'Name is required';
		else if (name.length < 2) e.name = 'Name must be at least 2 characters';
		else if (name.length > 80) e.name = 'Name must be 80 characters max';

		if (!priceStr) e.price = 'Price is required';
		else if (!priceRegex.test(priceStr)) e.price = 'Use a valid number (max 2 decimals)';
		else if (isNaN(priceNum)) e.price = 'Price must be a number';
		else if (priceNum <= 0) e.price = 'Price must be higher than 0';
		else if (priceNum > 1000000) e.price = 'Price is too large';

		if (!category) e.category = 'Category is required';

		if (!imageUrl) e.imageUrl = 'Image URL is required';
		else if (!urlRegex.test(imageUrl)) e.imageUrl = 'Please enter a valid URL';

		return e;
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		const eObj = validate(values);
		setErrors(eObj);
		if (Object.keys(eObj).length > 0) return;
		onSubmit({
			name: values.name.trim(),
			price: Number(values.price),
			category: values.category.trim(),
			imageUrl: values.imageUrl.trim(),
		});
	};

	const setField = (field, value) => {
		setValues((v) => {
			const next = { ...v, [field]: value };
			setErrors(validate(next));
			return next;
		});
	};

	// Dir què fa el markTouched
	const markTouched = (field) => setTouched((t) => ({ ...t, [field]: true }));

	return (
		<form className="form" onSubmit={handleSubmit} noValidate>
			<label>
				<span>Name</span>
				<input
					type="text"
					required
					minLength={2}
					maxLength={80}
					value={values.name}
					onChange={(e) => setField('name', e.target.value)}
					onBlur={() => markTouched('name')}
					aria-invalid={!!errors.name}
					aria-describedby="name-error"
				/>
				{(touched.name || submitting) && errors.name && <small id="name-error" className="error">{errors.name}</small>}
			</label>
			<label>
				<span>Price</span>
				<input
					type="number"
					required
					inputMode="decimal"
					min={0.01}
					step="0.01"
					value={values.price}
					onChange={(e) => setField('price', e.target.value)}
					onBlur={() => markTouched('price')}
					aria-invalid={!!errors.price}
					aria-describedby="price-error"
				/>
				{(touched.price || submitting) && errors.price && <small id="price-error" className="error">{errors.price}</small>}
			</label>
			<label>
				<span>Category</span>
				<select
					required
					value={values.category}
					onChange={(e) => setField('category', e.target.value)}
					onBlur={() => markTouched('category')}
					aria-invalid={!!errors.category}
					aria-describedby="category-error"
				>
					<option value="">Select a category</option>
					{PRODUCT_CATEGORIES.map((category) => (
						<option key={category} value={category}>
							{category}
						</option>
					))}
				</select>
				{(touched.category || submitting) && errors.category && <small id="category-error" className="error">{errors.category}</small>}
			</label>
			<label>
				<span>Image URL</span>
				<input
					type="url"
					required
					placeholder="https://example.com/image.jpg"
					value={values.imageUrl}
					onChange={(e) => setField('imageUrl', e.target.value)}
					onBlur={() => markTouched('imageUrl')}
					aria-invalid={!!errors.imageUrl}
					aria-describedby="imageUrl-error"
				/>
				{(touched.imageUrl || submitting) && errors.imageUrl && <small id="imageUrl-error" className="error">{errors.imageUrl}</small>}
			</label>
			<div className="form-actions">
				<button className="btn accent" type="submit" disabled={submitting || Object.keys(errors).length > 0}>
					{submitting && <Spinner size="small" className="inline" />}
					{submitting ? 'Saving...' : 'Save'}
				</button>
			</div>
		</form>
	);
}
