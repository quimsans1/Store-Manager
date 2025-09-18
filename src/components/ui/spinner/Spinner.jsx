import './Spinner.css';

export default function Spinner({ size = 'medium', className = '' }) {
	return (
		<div className={`spinner ${size} ${className}`} role="status" aria-label="Loading">
			<div className="spinner-circle"></div>
		</div>
	);
}
