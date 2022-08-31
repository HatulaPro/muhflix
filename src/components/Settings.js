import React, { useContext, useState } from 'react';
import './Settings.css';

import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { APIContext, API_KEY_FILLER } from '../APIContext';
import { CircularProgress } from '@mui/material';
// import DoneIcon from '@mui/icons-material/Done';
import DoneIcon from '@mui/icons-material/Done';
import { validateAPIKey } from '../axios';

const CHECKING_STATUSES = {
	default: 0,
	fail: 1,
	success: 2,
	ongoing: 3,
};

const Settings = () => {
	const [{ value: apiKeyValue, enabled: apiKeyEnabled }, setApiKey] = useContext(APIContext);
	const [inputApiKey, setInputApiKey] = useState(apiKeyValue);
	const [apiEnabled, setApiEnabled] = useState(apiKeyEnabled);
	const [checkingStatus, setCheckingStatus] = useState(CHECKING_STATUSES.default);

	function updateEnabled() {
		setApiEnabled((prev) => !prev);
		setApiKey((apiKey) => {
			return { ...apiKey, enabled: !apiKey.enabled };
		});
	}

	function updateApiKey(e) {
		setInputApiKey(e.target.value);
		setCheckingStatus(CHECKING_STATUSES.default);
	}

	function handleSubmit(e) {
		e.preventDefault();
		setCheckingStatus(CHECKING_STATUSES.ongoing);
		validateAPIKey(inputApiKey).then((result) => {
			if (result) {
				setApiKey({ value: inputApiKey, enabled: apiEnabled });
				// All Good
				setCheckingStatus(CHECKING_STATUSES.success);
			} else {
				setApiKey(API_KEY_FILLER);
				// Bad API key
				setCheckingStatus(CHECKING_STATUSES.fail);
			}
		});
	}

	return (
		<div className="settings">
			<h1>Settings</h1>
			<form className="settings_form" onSubmit={handleSubmit}>
				<TextField disabled={checkingStatus === CHECKING_STATUSES.ongoing} label="API Key" variant="standard" color="secondary" error={checkingStatus === CHECKING_STATUSES.fail} helperText={checkingStatus === CHECKING_STATUSES.fail && 'Invalid API Key'} defaultValue={inputApiKey} onChange={updateApiKey} />
				<FormControlLabel checked={apiEnabled} onChange={updateEnabled} control={<Switch color="secondary" />} label="Use API" />

				<button type="submit" disabled={checkingStatus === CHECKING_STATUSES.ongoing} className="btn" style={{ width: 'min-content', margin: 'auto' }}>
					SAVE
				</button>
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
					</div>
				)}
			</form>
		</div>
	);
};

export default Settings;