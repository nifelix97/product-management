import NavBar from './NavBar';

interface LayoutProps {
  children: React.ReactNode;
  onSearch?: (query: string) => void;
}

export default function Layout({ children, onSearch }: LayoutProps) {
  return (
    <div>
      <NavBar onSearch={onSearch} />
      <main>
        {children}
      </main>
    </div>
  );
}