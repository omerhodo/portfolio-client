import ChangePassword from '@components/ChangePassword';
import Loading from '@components/Loading';
import Login from '@components/Login';
import ProjectForm from '@components/ProjectForm';
import ProjectList from '@components/ProjectList';
import Tabs from '@components/Tabs';
import { useEffect, useRef, useState } from 'react';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const projectsTabRef = useRef<HTMLDivElement>(null);

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
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b border-gray-300 pb-4">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white border-none rounded cursor-pointer transition-colors text-sm flex items-center gap-2 no-underline"
            >
              <span>←</span>
            </a>
            <div>
              <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
              <p className="text-gray-600">Welcome, {user?.username}!</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white border-none rounded cursor-pointer transition-colors text-sm"
          >
            Logout
          </button>
        </div>

        <Tabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabs={[
            {
              id: 'dashboard',
              label: 'Dashboard',
              icon: '📊',
              content: (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gray-50 p-8 rounded-lg">
                    <h2 className="mb-4 text-xl font-bold">Dashboard</h2>
                    <p>Welcome to the admin panel!</p>

                    <div className="mt-8">
                      <h3 className="mb-2 font-semibold">User Information:</h3>
                      <ul className="list-none p-0 space-y-1">
                        <li>
                          <strong>ID:</strong> {user?._id}
                        </li>
                        <li>
                          <strong>Username:</strong> {user?.username}
                        </li>
                        <li>
                          <strong>Email:</strong> {user?.email}
                        </li>
                        <li>
                          <strong>Role:</strong> {user?.role}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              id: 'projects',
              label: 'Projects',
              icon: '📁',
              content: (
                <div ref={projectsTabRef}>
                  <ProjectForm
                    onProjectCreated={() => {
                      // Scroll to top
                      if (projectsTabRef.current) {
                        projectsTabRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                      // Refresh project list
                      setRefreshTrigger((prev) => prev + 1);
                    }}
                  />
                  <ProjectList
                    refreshTrigger={refreshTrigger}
                    onProjectUpdated={() => {
                      setRefreshTrigger((prev) => prev + 1);
                    }}
                  />
                </div>
              ),
            },
            {
              id: 'settings',
              label: 'Settings',
              icon: '⚙️',
              content: (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <ChangePassword />
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Admin;
