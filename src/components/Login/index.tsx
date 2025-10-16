import InputField from '@components/InputField';
import axios from 'axios';
import { FormEvent, useState } from 'react';

interface LoginProps {
  onLoginSuccess: (token: string, user: any) => void;
}

const Login = ({ onLoginSuccess }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        username,
        password,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));

      onLoginSuccess(response.data.token, response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          width: '100%',
          maxWidth: '400px',
        }}
      >
        <h2
          style={{
            marginBottom: '1.5rem',
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
          }}
        >
          Admin Girişi
        </h2>

        {error && (
          <div
            style={{
              backgroundColor: '#fee',
              color: '#c33',
              padding: '0.75rem',
              borderRadius: '4px',
              marginBottom: '1rem',
              fontSize: '0.875rem',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <InputField
            type="text"
            value={username}
            label="Kullanıcı Adı"
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
            inputStyle={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
            boxStyle={{ marginBottom: '1.5rem' }}
          />
          <InputField
            type="password"
            label="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            boxStyle={{ marginBottom: '1.5rem' }}
            inputStyle={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '1rem',
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: loading ? '#ccc' : '#333',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
