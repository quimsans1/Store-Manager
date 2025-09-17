import { Link } from 'react-router-dom';

export default function Header() {
	return (
		<div className="app-header">
			<Link to="/" className="brand">OptimalWay Store Manager</Link>
			<div className="spacer" />
			<button className="btn">Login</button>
		</div>
	);
}


