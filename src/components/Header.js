import './Header.css';
import { useLocation, Link } from 'react-router-dom';

const Header = () => {
	const location = useLocation();
	console.log(location.pathname);
	return (
		<div className="header">
			<div className="header_logo">Muhflix</div>
			<Link to="/" className={`header_link ${location.pathname === '/' && 'header_linkSelected'}`}>
				Home
			</Link>
			<Link to="/search" className={`header_link ${location.pathname === '/search' && 'header_linkSelected'}`}>
				Search
			</Link>
		</div>
	);
};

export default Header;
