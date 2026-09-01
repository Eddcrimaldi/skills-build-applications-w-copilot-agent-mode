import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../App';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadLeaderboard() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/leaderboard/`, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setEntries(normalizeCollection(payload));
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError('Unable to load leaderboard from the API.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadLeaderboard();
    return () => controller.abort();
  }, []);

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Leaderboard</h2>
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Student</th>
                <th>Points</th>
                <th>Streak</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id || entry.user?._id || entry.rank}>
                  <td>{entry.rank || 1}</td>
                  <td>{entry.user?.name || 'Unknown athlete'}</td>
                  <td>{entry.points || 0}</td>
                  <td>{entry.streakDays || 0} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
