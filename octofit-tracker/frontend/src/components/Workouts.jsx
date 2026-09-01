import { useEffect, useState } from 'react';
import { normalizeCollection } from '../App';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const apiUrl = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
      : 'http://localhost:8000/api/workouts/';

    async function loadWorkouts() {
      try {
        const response = await fetch(apiUrl, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setWorkouts(normalizeCollection(payload));
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError('Unable to load workouts from the API.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();
    return () => controller.abort();
  }, []);

  if (loading) return <div className="alert alert-info">Loading workouts...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Workouts</h2>
        <div className="row g-3">
          {workouts.map((workout) => (
            <div className="col-md-6" key={workout._id || workout.title}>
              <div className="border rounded p-3 h-100">
                <div className="d-flex justify-content-between align-items-start gap-3 mb-2">
                  <h3 className="h5 mb-0">{workout.title}</h3>
                  <span className="badge text-bg-primary">{workout.difficulty || 'beginner'}</span>
                </div>
                <p className="text-muted mb-2">{workout.description || 'No description available.'}</p>
                <div className="small text-body-secondary">
                  {workout.category} • {workout.durationMinutes} min • {workout.focusArea}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Workouts;
