import { BrowserRouter } from 'react-router-dom';

import { ErrorProvider } from '@/contexts/ErrorContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Router from '@/routes/Router';

function App() {
  return (
    <ErrorProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </LanguageProvider>
    </ErrorProvider>
  );
}

export default App;
