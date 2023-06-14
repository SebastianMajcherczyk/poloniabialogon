import {
	collection,
	getDocs,
	doc,
	getDoc,
	updateDoc,
	addDoc,
	serverTimestamp,
	deleteDoc,
	where,
	query,
	arrayRemove,
	orderBy,
	limit,
} from 'firebase/firestore';
import { db } from './../index';
import { storageService } from './storage.services';

const firestoreServiceDef = () => {
	const getContentByCollectionName = async (
		collectionName,
		onlyActive,
		limitValue
	) => {
		try {
			const collectionRef = collection(db, collectionName);
			const queryParams = [];
			if (onlyActive) {
				queryParams.push(where('active', '==', true));
			}
			let q;
			if (limit) {
				q = query(
					collectionRef,
					orderBy('createdAt', 'desc'),
					limit(limitValue),
					...queryParams
				);
			} else {
				q = query(collectionRef, orderBy('createdAt', 'desc'), ...queryParams);
			}

			const snapshot = await getDocs(q);
			const newData = snapshot.docs.map(snap => ({
				...snap.data(),
				firestoreId: snap.id,
			}));
			return newData;
		} catch (error) {
			console.log(error);
		}
	};

	const getArticleById = async idValue => {
		try {
			const collectionRef = collection(db, 'blog-posts');
			const q = query(
				collectionRef,
				where('id', 'in', [Number(idValue), String(idValue)])
			);
			const snapshot = await getDocs(q);
			const docSnap = snapshot.docs[0];
			const data = {
				...docSnap.data(),
				firestoreId: docSnap.id,
			};

			return data;
		} catch (error) {
			console.log(error);
		}
	};
	const addArticle = async article => {
		try {
			const collectionRef = collection(db, 'blog-posts');
			const data = {
				...article,
				createdAt: serverTimestamp(),
			};
			await addDoc(collectionRef, data);
		} catch (error) {
			console.log(error);
		}
	};
	const editArticleByFirestoreId = async (firestoreId, article) => {
		try {
			const docRef = doc(db, 'blog-posts', firestoreId);
			const data = {
				title: article.title,
				description: article.description,
				photos: article.photos,
				active: article.active,
			};
			await updateDoc(docRef, data);
		} catch (error) {
			console.log(error);
		}
	};
	const deletePhotoDataByIdAndFileName = async (idValue, imageName) => {
		try {
			const collectionRef = collection(db, 'blog-posts');
			const q = query(collectionRef, where('id', '==', idValue));
			const snapshots = await getDocs(q);
			const productSnap = snapshots.docs[0];
			const productRef = productSnap.ref;
			const { photos } = productSnap.data();
			const photo = photos.find(element => element.fileName === imageName);

			await updateDoc(productRef, {
				photos: arrayRemove(photo),
			});
		} catch (error) {
			console.log(error);
		}
	};
	const deleteDocumentAndConnectedPhotos = async firestoreId => {
		try {
			const articleRef = doc(db, 'blog-posts', firestoreId);
			const snapshot = await getDoc(articleRef);
			const { photos, id } = snapshot.data();
			for await (const photo of photos) {
				if (photo.fileName) {
					const path = `articles-photos/${id}/${photo.fileName}`;
					await storageService.deleteImage(path);
				}

				await deleteDoc(articleRef);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const getAbout = async () => {
		const docRef = doc(db, 'about', 'FuwOSTzjS8VbqPxkQEF1');

		try {
			const snapshot = await getDoc(docRef);
			const data = snapshot.data();
			console.log(data);

			return data;
		} catch (err) {
			console.log(err);
		}
	};

	return {
		getContentByCollectionName,
		getArticleById,
		getAbout,
		addArticle,
		editArticleByFirestoreId,
		deletePhotoDataByIdAndFileName,
		deleteDocumentAndConnectedPhotos,
	};
};

export const firestoreService = firestoreServiceDef();
