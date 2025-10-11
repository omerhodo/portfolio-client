import ChangePassword from '@components/ChangePassword';
import Loading from '@components/Loading';
import Login from '@components/Login';
import { useEffect, useState } from 'react';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = (_token: string, userData: any) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            borderBottom: '1px solid #ddd',
            paddingBottom: '1rem',
          }}
        >
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Admin Panel</h1>
            <p style={{ color: '#666' }}>Hoş geldin, {user?.username}!</p>
          </div>
          <button
            onClick={handleLogout}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}
          >
            Çıkış Yap
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '2rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#f8f9fa',
              padding: '2rem',
              borderRadius: '8px',
            }}
          >
            <h2 style={{ marginBottom: '1rem' }}>Dashboard</h2>
            <p>Buraya admin paneli içeriğini ekleyebilirsin (proje yönetimi, vb.)</p>

            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Kullanıcı Bilgileri:</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li>
                  <strong>ID:</strong> {user?._id}
                </li>
                <li>
                  <strong>Kullanıcı Adı:</strong> {user?.username}
                </li>
                <li>
                  <strong>Email:</strong> {user?.email}
                </li>
                <li>
                  <strong>Rol:</strong> {user?.role}
                </li>
              </ul>
            </div>
          </div>
          <ChangePassword />
        </div>
      </div>
    </div>
  );
};

export default Admin;
