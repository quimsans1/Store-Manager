import { createBrowserRouter } from 'react-router-dom';
import ProductsListPage from '../pages/productPages/ProductsListPage';
import ProductCreatePage from '../pages/productPages/ProductCreatePage';
import ProductEditPage from '../pages/productPages/ProductEditPage';
import Layout from '../components/layout/Layout';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ index: true, element: <ProductsListPage /> },
			{ path: 'products/new', element: <ProductCreatePage /> },
			{ path: 'products/:id/edit', element: <ProductEditPage /> },
		],
	},
]);

export default router;


