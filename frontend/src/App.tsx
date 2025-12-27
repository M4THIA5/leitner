import { CardServiceProvider } from '@/presentation/contexts/CardServiceContext';
import { AppRouter } from '@/presentation/router/AppRouter';
import './index.css';

function App() {
  return (
    <CardServiceProvider>
      <AppRouter />
    </CardServiceProvider>
  );
}

export default App;

