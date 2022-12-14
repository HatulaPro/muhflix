import React, { useContext, useEffect, useState } from 'react';
import './Settings.css';

import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { APIContext, API_KEY_FILLER } from '../contexts/APIContext';
import { Button, CircularProgress, InputAdornment } from '@mui/material';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import DoneIcon from '@mui/icons-material/Done';
import { validateAPIKey } from '../axios';
import { ThemeContext } from '../contexts/ThemeHandler';

const CHECKING_STATUSES = {
	default: 0,
	fail: 1,
	success: 2,
	ongoing: 3,
};

const Settings = () => {
	const [{ value: apiKeyValue, enabled: apiKeyEnabled }, setApiKey] = useContext(APIContext);
	const [isDark, setDark] = useContext(ThemeContext);
	const [inputApiKey, setInputApiKey] = useState(apiKeyValue);
	const [apiEnabled, setApiEnabled] = useState(apiKeyEnabled);
	const [checkingStatus, setCheckingStatus] = useState(CHECKING_STATUSES.default);
	const [requestsLeft, setRequestsLeft] = useState(-1);

	useEffect(() => {
		document.title = 'Muhflix | Settings';
	}, []);

	function updateEnabled() {
		setApiEnabled((prev) => !prev);
		setApiKey((apiKey) => {
			return { ...apiKey, enabled: !apiKey.enabled };
		});
	}

	function updateTheme() {
		setDark((prev) => !prev);
	}

	function updateApiKey(e) {
		setInputApiKey(e.target.value);
		setCheckingStatus(CHECKING_STATUSES.default);
	}

	function handleSubmit(e) {
		e.preventDefault();
		setCheckingStatus(CHECKING_STATUSES.ongoing);
		validateAPIKey(inputApiKey).then((result) => {
			if (!result.error) {
				setApiKey({ value: inputApiKey, enabled: apiEnabled });
				// All Good
				setCheckingStatus(CHECKING_STATUSES.success);
				setRequestsLeft(result.left);
			} else {
				setApiKey(API_KEY_FILLER);
				// Bad API key
				setCheckingStatus(CHECKING_STATUSES.fail);
				if (result.hasAccount) {
					setRequestsLeft(0);
				} else {
					setRequestsLeft(-1);
				}
			}
		});
	}

	return (
		<div className="settings">
			<h1>Settings</h1>
			<form className="settings_form" onSubmit={handleSubmit}>
				<TextField
					disabled={checkingStatus === CHECKING_STATUSES.ongoing}
					label="API Key"
					variant="standard"
					color="secondary"
					error={checkingStatus === CHECKING_STATUSES.fail}
					helperText={checkingStatus === CHECKING_STATUSES.fail && 'Invalid API Key'}
					defaultValue={inputApiKey}
					onChange={updateApiKey}
					InputProps={{
						endAdornment: (
							<InputAdornment>
								<Button type="submit" color="secondary" size="small" disabled={checkingStatus === CHECKING_STATUSES.ongoing}>
									VERIFY KEY
								</Button>
							</InputAdornment>
						),
					}}
				/>

				<FormControlLabel checked={apiEnabled} onChange={updateEnabled} control={<Switch color="secondary" />} label="Use API" />
				<FormControlLabel checked={isDark} onChange={updateTheme} control={<Switch color="secondary" />} label="Dark Mode" />

				<TransitionGroup component={null}>
					<CSSTransition key={checkingStatus + requestsLeft} classNames="fade" timeout={500}>
						<div>
							{checkingStatus === CHECKING_STATUSES.ongoing && (
								<div className="setting_verification">
									<span>Verifying API Key...</span>
									<CircularProgress color="warning" />
								</div>
							)}
							{checkingStatus === CHECKING_STATUSES.success && (
								<div className="setting_verification">
									<span>API Key Is Valid!</span>
									<DoneIcon htmlColor="lightgreen" />
									<div className="flexLineBreak"></div>
									{requestsLeft !== -1 && (
										<span>
											<small>You have {requestsLeft} requests left.</small>
										</span>
									)}
								</div>
							)}
						</div>
					</CSSTransition>
				</TransitionGroup>
			</form>
		</div>
	);
};

export default Settings;
