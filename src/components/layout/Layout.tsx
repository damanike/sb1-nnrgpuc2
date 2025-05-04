import { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useTheme } from '../../context/ThemeContext';

type LayoutProps = {
  children: ReactNode;
  activePage: string;
  setActivePage: (page: string) => void;
};

const Layout = ({ children, activePage, setActivePage }: LayoutProps) => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen`}>
      <div className="flex h-screen bg-slate-100 dark:bg-slate-900">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;