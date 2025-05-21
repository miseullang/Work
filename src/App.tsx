import { BrowserRouter } from 'react-router-dom';
import Router from '@/routes/Router';
import { ErrorProvider } from '@/contexts/ErrorContext';

function App() {
  return (
    <ErrorProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ErrorProvider>
  );
}

export default App;
