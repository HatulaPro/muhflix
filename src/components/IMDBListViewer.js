import { useState, useContext, useEffect } from 'react';
import { APIContext } from '../contexts/APIContext';
import { getList } from '../axios';
import MovieListViewer from './MovieListViewer';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useLocalStorage } from 'usehooks-ts';

const IMDBListViewer = ({ listId, removable }) => {
	const [listDetails, setListDetails] = useState(null);
	const setImdbLists = useLocalStorage('IMDB_LISTS', ['ls004285275', 'ls504069050', 'ls063385017', 'ls058726648', 'ls043300993'])[1];
	const [apiKey] = useContext(APIContext);

	useEffect(() => {
		async function getData() {
			const res = await getList(apiKey, listId);
			if (res) {
				setListDetails(res.data);
			}
		}
		if (listId) {
			getData();
		}
	}, [listId, apiKey]);

	function deleteSelf() {
		setImdbLists((prev) => {
			return prev.filter((id) => id !== listId);
		});
	}

	return listDetails ? (
		<MovieListViewer
			list={listDetails.items}
			title={
				<>
					{removable && (
						<IconButton onClick={deleteSelf}>
							<CloseIcon htmlColor="red" />
						</IconButton>
					)}
					{listDetails.title}{' '}
					<span style={{ fontSize: '16px' }}>
						by{' '}
						<a href={`https://www.imdb.com/list/${listId}/`} target="_blank" rel="noopener noreferrer">
							{listDetails.by}
						</a>
					</span>
				</>
			}
		/>
	) : (
		<></>
	);
};

export default IMDBListViewer;
