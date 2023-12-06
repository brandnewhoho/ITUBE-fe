import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import NotFound from './pages/NotFound';
import Videos from './pages/Videos';
import VideoDetail from './pages/VideoDetail';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Main from './pages/Main';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <NotFound />,
		children: [
			{ index: true, element: <Home /> },
			{ path: 'main', element: <Main /> },
			{ path: 'videos/:keyword', element: <Videos /> },
			{ path: 'videos/watch/:videoId', element: <VideoDetail /> },
			{ path: 'auth/sign_up', element: <SignUp /> },
			{ path: 'auth/sign_in', element: <LogIn /> },
		],
	},
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

reportWebVitals();
