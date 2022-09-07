import { useState, useContext, useEffect } from 'react';
import { APIContext } from '../APIContext';
import { getList } from '../axios';
import MovieListViewer from './MovieListViewer';

const IMDBListViewer = ({ listId }) => {
	const [listDetails, setListDetails] = useState(null);

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

	return listDetails ? (
		<MovieListViewer
			list={listDetails.items}
			title={
				<>
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
