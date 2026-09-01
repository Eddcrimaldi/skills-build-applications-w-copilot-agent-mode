import { useEffect, useState } from 'react';
import { normalizeCollection } from '../App';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const apiUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
      : 'http://localhost:8000/api/teams/';

    async function loadTeams() {
      try {
        const response = await fetch(apiUrl, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setTeams(normalizeCollection(payload));
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError('Unable to load teams from the API.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadTeams();
    return () => controller.abort();
  }, []);

  if (loading) return <div className="alert alert-info">Loading teams...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Teams</h2>
        <div className="row g-3">
          {teams.map((team) => (
            <div className="col-md-6" key={team._id || team.name}>
              <div className="border rounded p-3 h-100">
                <h3 className="h5 mb-2">{team.name}</h3>
                <p className="text-muted mb-2">{team.description || 'No description provided.'}</p>
                <small className="text-body-secondary">
                  {team.members?.length ?? 0} member(s)
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Teams;
