import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../../../contexts/App.context';

import { Box, Button } from '@mui/material';

import MaterialReactTable from 'material-react-table';
import { useMemo } from 'react';
import { firestoreService } from '../../../services/firestore.services';
import { AdminContext } from '../../../contexts/Admin.Context';
import { ConfirmToast } from 'react-confirm-toast';
import { storageService } from '../../../services/storage.services';

export const AdminArticleList = () => {
  const { loggedIn } = useContext(AppContext);
  const { news, getNews } = useContext(AdminContext);
  const navigate = useNavigate();
  const [newsWithImages, setNewsWithImages] = useState([]);
  const convertToDate = (time) => {
    const fireBaseTime = new Date(time.seconds * 1000 + time.nanoseconds / 1000000);
    const date = fireBaseTime.toLocaleDateString();
    return date;
  };

  const deleteArticle = async (id) => {
   
    await firestoreService.deleteDocumentAndConnectedPhotos(id);
    getNews();
  };

  useEffect(() => {
    ( async () => {
      try {
        if (news) {
          const data = await Promise.all(
            news.map(async (article) => {
              const articleOnPage = { ...article };
              const mainPhoto =
                article.photos.find((element) => element.type === 'main') ||
                article.photos.find((element) => element.type === 'standard');
              if (mainPhoto) {
                const serverFilePath = `articles-photos/${article.id}/${mainPhoto.fileName}`;
                const url = await storageService.getImageByPath(serverFilePath);
                articleOnPage.mainPhotoUrl = url;
              } else {
                articleOnPage.mainPhotoUrl = ''; // Fallback when no photo available
              }
              return articleOnPage;
            })
          );
          setNewsWithImages(data);
        }
      } catch (error) {
        console.log(error);
      }
    })();

  }, [news]);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'firestoreId',
        header: 'Firestore ID',
      },
      {
        accessorFn: (row) => convertToDate(row.createdAt),
        header: 'Data publikacji',
        muiTableHeadCellProps: {
          align: 'center',
        },
        muiTableBodyCellProps: {
          align: 'center',
        },
        maxSize: 100,
        size: 50,
      },
      {
        accessorKey: 'title',
        header: 'Tytuł',
        muiTableHeadCellProps: {
          align: 'center',
        },
        muiTableBodyCellProps: {
          align: 'left',
        },
        size: 200,
      },
      {
        accessorFn: (row) => {
          const value = row.description;
          if (!value) return '';
          const truncatedValue = value.length > 150 ? value.substring(0, 150) + '...' : value;
          return truncatedValue;
        },
        header: 'Treść',
        muiTableHeadCellProps: {
          align: 'center',
        },
		muiTableBodyCellProps: {
			align: 'left',
		  },
		  size: 500,
		},
		{
		  header: 'Thumbnail',
		  accessor: 'mainPhotoUrl',
		  Cell: ({ row }) => {
			const imageSrc = row.original.mainPhotoUrl || ''; // Use empty string if mainPhotoUrl is falsy
			return imageSrc ? (
			  <img
				src={imageSrc}
				alt={row.original.title}
				style={{ maxWidth: '100px' }}
			  />
			) : (
			  <span>Brak zdjęć</span>
			);
		  },
		  muiTableHeadCellProps: {
			align: 'center',
		  },
		  muiTableBodyCellProps: {
			align: 'center',
		  },
		  size: 100,
		},
		],
		[newsWithImages]
		);
		
		return (
		<Box>
		  {loggedIn && (
			<Box>
			  <Button onClick={() => navigate('/admin/articles/article/add')} >
				Dodaj nowy artykuł
			  </Button>
			  <MaterialReactTable
				columns={columns}
				data={newsWithImages}
				globalFilterFn="contains"
				enablePagination={true}
				enableEditing={true}
				editingMode="row"
				initialState={{ columnVisibility: { firestoreId: false } }}
				displayColumnDefOptions={{
				  'mrt-row-actions': {
					header: 'Akcje',
					Cell: ({ row, table }) => (
					  <div>
						<Button
						  onClick={() => {
							navigate(`/admin/articles/article/edit/${row.original.id}`);
						  }}
						  sx={{color: 'text.primary'}}
						>
						  Edytuj
						</Button>
						<ConfirmToast
						  asModal={true}
						  customCancel={'Nie usuwaj'}
						  customConfirm={'Usuń'}
						  message={'Czy na pewno chcesz usunąć artykuł?'}
						  theme={'light'}
						  showCloseIcon={false}
						  customFunction={() =>
							deleteArticle(row.original.firestoreId)
						  }
						>
						  <Button sx={{color: 'text.primary'}}>Usuń</Button>
						</ConfirmToast>
					  </div>
					),
				  },
				}}
			  />
			</Box>
		  )}
		</Box>
		);
		};