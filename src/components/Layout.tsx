import NavBar from './NavBar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  onSearch?: (query: string) => void;
}

export default function Layout({ children, onSearch }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar onSearch={onSearch} />
      <main className="flex-1 pb-20"> 
        {children}
      </main>
      <Footer />
    </div>
  );
}