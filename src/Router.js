import Main from './Routes/Main';
import Search from './Routes/Search';
import LoadingScreen from './Routes/LoadingScreen';
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
					<Route exact path="/load_debug" element={<LoadingScreen />} />
				</Routes>
			</CSSTransition>
		</TransitionGroup>
	);
};

export default Router;
