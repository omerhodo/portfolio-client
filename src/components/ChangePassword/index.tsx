import InputField from '@components/InputField';
import { FormEvent, useState } from 'react';

interface ChangePasswordProps {
  onPasswordChanged?: () => void;
}

const ChangePassword = ({ onPasswordChanged }: ChangePasswordProps) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Tüm alanları doldurun');
      return;
    }

    if (newPassword.length < 6) {
      setError('Yeni şifre en az 6 karakter olmalı');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Yeni şifreler eşleşmiyor');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Şifre değiştirme başarısız');
      }

      setSuccess('Şifre başarıyla değiştirildi!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      if (onPasswordChanged) {
        setTimeout(() => {
          onPasswordChanged();
        }, 2000);
      }
    } catch (err: any) {
      setError(err.message || 'Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        maxWidth: '500px',
      }}
    >
      <h3
        style={{
          marginBottom: '1.5rem',
          fontSize: '1.25rem',
          fontWeight: 'bold',
        }}
      >
        Şifre Değiştir
      </h3>

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

      {success && (
        <div
          style={{
            backgroundColor: '#efe',
            color: '#383',
            padding: '0.75rem',
            borderRadius: '4px',
            marginBottom: '1rem',
            fontSize: '0.875rem',
          }}
        >
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <InputField
          type="password"
          value={currentPassword}
          label="Mevcut Şifre"
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          disabled={loading}
          boxStyle={{ marginBottom: '1.5rem' }}
        />
        <InputField
          type="password"
          value={newPassword}
          label="Yeni Şifre"
          onChange={(e) => setNewPassword(e.target.value)}
          required
          disabled={loading}
          warningText="En az 6 karakter olmalı"
          warningStyle={{ color: '#666', fontSize: '0.75rem' }}
        />
        <InputField
          type="password"
          label="Yeni Şifre (Tekrar)"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={loading}
          boxStyle={{ marginBottom: '1.5rem' }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: loading ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.backgroundColor = '#218838';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.backgroundColor = '#28a745';
            }
          }}
        >
          {loading ? 'Değiştiriliyor...' : 'Şifreyi Değiştir'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
