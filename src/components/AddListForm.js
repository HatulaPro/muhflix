import { Dialog, DialogTitle, TextField, Button, DialogContentText, DialogActions, DialogContent, CircularProgress } from '@mui/material';
import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { getList } from '../axios';
import { APIContext } from '../contexts/APIContext';
import AddIcon from '@mui/icons-material/Add';

const AddListForm = ({ lists, setLists, onClose }) => {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState('');
	const [apiKey] = useContext(APIContext);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	function onValueChange(e) {
		setValue(e.target.value);
		setError(null);
	}

	function addList() {
		setError(null);
		if (lists.includes(value)) {
			setError('List already registered');
			return;
		}
		if (!value.startsWith('ls')) {
			setError('List ID must start with `ls`');
			return;
		}

		setLoading(true);
		getList(apiKey, value).then((list) => {
			setLoading(false);
			if (list.data.errorMessage) {
				setError('Can not access list');
				return;
			}
			setLists((prev) => [...prev, value]);
			setValue('');
			setOpen(false);
			setTimeout(onClose, 100);
		});
	}

	return (
		<div style={{ margin: '20px' }}>
			<Button variant="outlined" onClick={() => setOpen(true)} startIcon={<AddIcon />} color="success">
				Add New List
			</Button>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>Add New List</DialogTitle>
				<DialogContent>
					<DialogContentText>Enter the chosen list's ID. </DialogContentText>
					<TextField error={Boolean(error)} helperText={error} value={value} onChange={onValueChange} label="New List ID" variant="standard" margin="dense" autoFocus fullWidth placeholder="ls004285275" />
				</DialogContent>
				<DialogActions>
					{loading ? (
						<CircularProgress style={{ margin: '10px auto' }} color="warning" />
					) : (
						<>
							<Button onClick={() => setOpen(false)}>Cancel</Button>
							<Button onClick={addList}>Add</Button>
						</>
					)}
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default AddListForm;
