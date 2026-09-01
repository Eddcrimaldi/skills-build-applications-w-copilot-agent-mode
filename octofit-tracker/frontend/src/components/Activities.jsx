import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../App';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadActivities() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/activities/`, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setActivities(normalizeCollection(payload));
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError('Unable to load activities from the API.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadActivities();
    return () => controller.abort();
  }, []);

  if (loading) return <div className="alert alert-info">Loading activities...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Activities</h2>
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Minutes</th>
                <th>Distance</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.date}>
                  <td>{activity.user?.name || 'Unknown user'}</td>
                  <td>{activity.type}</td>
                  <td>{activity.durationMinutes}</td>
                  <td>{activity.distanceKm ?? 0} km</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Activities;
