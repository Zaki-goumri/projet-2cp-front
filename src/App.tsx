import { lazy, useEffect } from 'react';
import './index.css';

const LandingPage = lazy(() => import('./modules/landingPage/page'));

const App = () => {
  return <LandingPage />;
};

export default App;
