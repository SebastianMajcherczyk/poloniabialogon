import { createContext } from 'react';

export const AdminContext = createContext({
	news: [],
	getNews: () => true
});
