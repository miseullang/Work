import { BrowserRouter } from 'react-router-dom';

import { ErrorProvider } from '@/contexts/ErrorContext';
import Router from '@/routes/Router';

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
