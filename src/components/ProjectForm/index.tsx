import InputField from '@components/InputField';
import SelectField from '@components/SelectField';
import TextAreaField from '@components/TextAreaField';
import { FormEvent, useState } from 'react';

interface ProjectFormProps {
  onProjectCreated?: () => void;
}

const ProjectForm = ({ onProjectCreated }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectType: '',
    technologies: '',
    imageUrl: '',
    projectUrl: '',
    githubUrl: '',
    featured: false,
    order: 0,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const projectTypeOptions = [
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'fullstack', label: 'Fullstack' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'wordpress', label: 'WordPress' },
    { value: 'ai', label: 'AI' },
    { value: 'other', label: 'Other' },
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      // Technologies string'i array'e çevir
      const technologiesArray = formData.technologies
        .split(',')
        .map((tech) => tech.trim())
        .filter((tech) => tech !== '');

      const projectData = {
        ...formData,
        technologies: technologiesArray,
        order: Number(formData.order),
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Proje oluşturma başarısız');
      }

      setSuccess('Proje başarıyla oluşturuldu!');

      setFormData({
        title: '',
        description: '',
        projectType: '',
        technologies: '',
        imageUrl: '',
        projectUrl: '',
        githubUrl: '',
        featured: false,
        order: 0,
      });

      if (onProjectCreated) {
        setTimeout(() => {
          onProjectCreated();
        }, 1500);
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
        maxWidth: '800px',
      }}
    >
      <h3
        style={{
          marginBottom: '1.5rem',
          fontSize: '1.5rem',
          fontWeight: 'bold',
        }}
      >
        Yeni Proje Ekle
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
          type="text"
          label="Proje Başlığı *"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          disabled={loading}
          placeholder="Örn: Portfolio Website"
          warningText="Maksimum 100 karakter"
        />

        <TextAreaField
          label="Açıklama *"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          disabled={loading}
          placeholder="Proje hakkında detaylı açıklama..."
          rows={4}
          maxLength={500}
          warningText="Maksimum 500 karakter"
        />

        <SelectField
          label="Proje Tipi *"
          value={formData.projectType}
          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
          required
          disabled={loading}
          options={projectTypeOptions}
        />

        <InputField
          type="text"
          label="Teknolojiler"
          value={formData.technologies}
          onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
          disabled={loading}
          placeholder="React, TypeScript, Node.js (virgülle ayırın)"
          warningText="Virgülle ayırarak giriniz"
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <InputField
            type="url"
            label="Proje URL"
            value={formData.projectUrl}
            onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
            disabled={loading}
            placeholder="https://project-demo.com"
          />

          <InputField
            type="url"
            label="GitHub URL"
            value={formData.githubUrl}
            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
            disabled={loading}
            placeholder="https://github.com/username/repo"
          />
        </div>

        <InputField
          type="url"
          label="Görsel URL"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          disabled={loading}
          placeholder="https://example.com/image.jpg"
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                disabled={loading}
                style={{ cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Öne Çıkan Proje</span>
            </label>
          </div>

          <InputField
            type="number"
            label="Sıralama"
            value={String(formData.order)}
            onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
            disabled={loading}
            placeholder="0"
            warningText="Küçük numara önce gösterilir"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: loading ? '#ccc' : '#007bff',
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
              e.currentTarget.style.backgroundColor = '#0056b3';
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.backgroundColor = '#007bff';
            }
          }}
        >
          {loading ? 'Oluşturuluyor...' : 'Proje Oluştur'}
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
