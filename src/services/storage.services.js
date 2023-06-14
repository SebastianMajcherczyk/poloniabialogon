import {
	deleteObject,
	getDownloadURL,
	getStorage,
	listAll,
	ref,
	uploadBytes,
	updateMetadata,
	getMetadata
} from 'firebase/storage';
import { storage } from '..';

const storageServiceDef = () => {
	const getImageByPath = async path => {
		try {
			const storageRef = ref(storage, path);
			const url = await getDownloadURL(storageRef);
			return url;
		} catch (error) {
			console.log(error);
		}
	};
	const addImage = async (path, file) => {
		try {
			const storageRef = ref(storage, path);
			await uploadBytes(storageRef, file);
			
			
		} catch (error) {
			console.log(error);
		}
	};
	const deleteImage = async path => {
		try {
			const storageRef = ref(storage, path);
			await deleteObject(storageRef);
		} catch (error) {
			console.log(error);
		}
	};
	const getReferencesOfAllPicturesInFolder = async (path, withSortByDate = false) => {
		try {
			const pathRef = ref(getStorage(), path);
			const listOfElements = await listAll(pathRef);

			// todo: to delete
			listOfElements.items.forEach(item =>
				updateMetadata(item, {
					cacheControl: 'public, max-age=6000',
				})
			);
			
			
			if(withSortByDate){
				const items = []
				const metas = []
				listOfElements.items.forEach(el => {
					metas.push(getMetadata(el))
					items.push(el)
				})

				const responses = await Promise.all(metas);
				const data = responses.map((meta, index) => ({
					meta,
					item: items[index]
				}))
				
				console.log('Metas', data)

				return data.sort((a,b) => new Date(a.meta.timeCreated) > new Date(b.meta.dateCreate)).map(({item}) => item)

				return data.map(({item})=> item)

				//return data.sort((a, b) => a.meta)

			
			}

			return listOfElements.items;
		} catch (error) {
			console.log(error);
		}
	};
	return {
		getImageByPath,
		addImage,
		deleteImage,
		getReferencesOfAllPicturesInFolder,
	};
};

export const storageService = storageServiceDef();
