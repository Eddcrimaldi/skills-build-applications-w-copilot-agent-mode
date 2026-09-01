import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import logo from '../../../docs/octofitapp-small.png';

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload;
  if (payload && Array.isArray(payload.results)) return payload.results;
  if (payload && Array.isArray(payload.data)) return payload.data;
  return [];
}

export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName && codespaceName.trim() !== '') {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  return 'http://localhost:8000/api';
}

function AppLayout() {
  const navItems = [
    { to: '/', label: 'Users' },
    { to: '/activities', label: 'Activities' },
    { to: '/teams', label: 'Teams' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/workouts', label: 'Workouts' },
  ];

  return (
    <div className="container py-4">
      <header className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 mb-4">
        <div className="d-flex align-items-center gap-3">
          <img src={logo} alt="Octofit Tracker logo" className="img-fluid" style={{ width: 64, height: 64 }} />
          <div>
            <p className="text-uppercase text-muted mb-0 small fw-semibold">Mergington High</p>
            <h1 className="h3 mb-0">Octofit Tracker</h1>
          </div>
        </div>

        <nav className="nav nav-pills flex-wrap gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
