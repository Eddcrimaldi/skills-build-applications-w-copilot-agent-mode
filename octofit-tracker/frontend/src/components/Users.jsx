import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeCollection } from '../App';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      try {
        const response = await fetch(`${getApiBaseUrl()}/users/`, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        setUsers(normalizeCollection(payload));
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError('Unable to load users from the API.');
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadUsers();
    return () => controller.abort();
  }, []);

  if (loading) return <div className="alert alert-info">Loading users...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Users</h2>
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Fitness</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.email || user.name}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role || 'student'}</td>
                  <td>{user.fitnessLevel || 'beginner'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
