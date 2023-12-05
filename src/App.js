import { Outlet } from 'react-router-dom';
import SearchHeader from './components/SearchHeader';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { YoutubeApiProvider } from './context/YoutubeApiContext';
import { AuthProvider } from './context/AuthContext';

const queryClient = new QueryClient();

function App() {
	return (
		<>
			<AuthProvider>
				<SearchHeader />
				<YoutubeApiProvider>
					<QueryClientProvider client={queryClient}>
						<Outlet />
					</QueryClientProvider>
				</YoutubeApiProvider>
			</AuthProvider>
		</>
	);
}

export default App;
