import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NavbarLayout from './pages/NavbarLayout';
import { AppThemeProvider, useAppTheme } from './context/AppThemeContext';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';
import { SearchProvider } from './context/SearchContext.tsx';
import NotFound from './pages/NotFound.tsx';
import Footer from './components/Footer.tsx';

const ThemedApp: React.FC = () => {
  const { mode } = useAppTheme();
  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <SearchProvider>
          <Routes>
            <Route element={<NavbarLayout />}>
              <Route path='/' element={<HomePage />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </SearchProvider>
      </Router>
      <Footer />
    </ThemeProvider>
  );
};

const App: React.FC = () => (
  <AppThemeProvider>
    <ThemedApp />
  </AppThemeProvider>
);

export default App;
