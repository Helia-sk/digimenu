import { Menu } from './components/Menu';
import { AuthProvider } from './components/Auth';

function App() {
  return (
    <AuthProvider>
      <Menu />
    </AuthProvider>
  );
}

export default App;