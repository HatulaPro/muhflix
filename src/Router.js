import Main from './Routes/Main';
import Search from './Routes/Search';
import Settings from './Routes/Settings';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';

const Router = () => {
	const location = useLocation();
	return (
		<TransitionGroup component={null}>
			<CSSTransition key={location.pathname} classNames="fade" timeout={300}>
				<Routes location={location}>
					<Route exact path="/" element={<Main />} />
					<Route exact path="/search" element={<Search />} />
					<Route exact path="/settings" element={<Settings />} />
				</Routes>
			</CSSTransition>
		</TransitionGroup>
	);
};

export default Router;
