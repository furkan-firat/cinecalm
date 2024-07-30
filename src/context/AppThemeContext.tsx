import {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  useEffect,
} from 'react';

type AppThemeContextValue = {
  mode: 'light' | 'dark';
  toggleAppTheme: () => void;
};

const AppThemeContext = createContext<AppThemeContextValue | undefined>(
  undefined
);

type AppThemeProviderProps = {
  children: ReactNode;
};

export function AppThemeProvider({ children }: AppThemeProviderProps) {
  const storedMode =
    localStorage.getItem('appTheme') === 'dark' ? 'dark' : 'light'; // Updated to reflect 'light' or 'dark'
  const [mode, setMode] = useState<'light' | 'dark'>(storedMode);

  useEffect(() => {
    localStorage.setItem('appTheme', mode);
  }, [mode]);

  const toggleAppTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const contextValue = useMemo(() => ({ mode, toggleAppTheme }), [mode]);

  return (
    <AppThemeContext.Provider value={contextValue}>
      {children}
    </AppThemeContext.Provider>
  );
}

export const useAppTheme = (): AppThemeContextValue => {
  const context = useContext(AppThemeContext);
  if (context === undefined) {
    throw new Error('useAppTheme must be used within an AppThemeProvider');
  }
  return context;
};
