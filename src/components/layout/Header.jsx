import { Link } from 'react-router-dom';

export default function Header() {
	return (
		<div className="app-header">
			<Link to="/" className="logo-app-header">OptimalWay Store Manager</Link>
		</div>
	);
}
