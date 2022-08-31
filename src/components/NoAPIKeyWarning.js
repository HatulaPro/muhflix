import { Link } from 'react-router-dom';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import './NoAPIKeyWarning.css';
import { useEffect, useMemo, useState } from 'react';

const API_KEY_WARNING_ITEM = 'API_KEY_WARNING_ITEM';

const NoAPIKeyWarning = () => {
	const [isOpen, setIsOpen] = useState(true);

	const seenWarning = useMemo(() => localStorage.getItem(API_KEY_WARNING_ITEM), []);
	useEffect(() => {
		localStorage.setItem(API_KEY_WARNING_ITEM, true);
	}, []);

	function close() {
		setIsOpen(false);
	}
	return seenWarning ? null : (
		<div className={`noAPIkeyWarning ${!isOpen && 'noAPIkeyWarning_hide'}`}>
			<WarningAmberIcon htmlColor="yellow" />
			<p>
				<b>NOTE: </b> showing a cached page. Put your own API key in the <Link to="/settings">settings</Link> tab to use up to date information
			</p>
			<IconButton onClick={close}>
				<CloseIcon htmlColor="white" />
			</IconButton>
		</div>
	);
};

export default NoAPIKeyWarning;
