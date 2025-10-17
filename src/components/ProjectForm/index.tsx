import InputField from '@components/InputField';
import SelectField from '@components/SelectField';
import TextAreaField from '@components/TextAreaField';
import axios from 'axios';
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
    privacyPolicy: '',
    featured: false,
    order: 0,
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setError('Only image files are allowed (jpeg, jpg, png, gif, webp)');
        return;
      }

      setImageFile(file);

      // Preview oluştur
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');

      // Check required fields
      if (!formData.title || !formData.description || !formData.projectType) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('projectType', formData.projectType);
      formDataToSend.append('technologies', formData.technologies);
      formDataToSend.append('projectUrl', formData.projectUrl);
      formDataToSend.append('githubUrl', formData.githubUrl);
      formDataToSend.append('privacyPolicy', formData.privacyPolicy);
      formDataToSend.append('featured', String(formData.featured));
      formDataToSend.append('order', String(formData.order));

      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }

      console.log('Form Data being sent:');
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      await axios.post(`${import.meta.env.VITE_API_URL}/projects`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess('Project created successfully!');

      setFormData({
        title: '',
        description: '',
        projectType: '',
        technologies: '',
        imageUrl: '',
        projectUrl: '',
        githubUrl: '',
        privacyPolicy: '',
        featured: false,
        order: 0,
      });
      setImageFile(null);
      setImagePreview('');

      if (onProjectCreated) {
        setTimeout(() => {
          onProjectCreated();
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
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
        Add New Project
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
          label="Project Title *"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          disabled={loading}
          placeholder="My Awesome Project"
          warningText="Max 100 characters"
        />

        <TextAreaField
          label="Description *"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
          disabled={loading}
          placeholder="About my awesome project..."
          rows={4}
          maxLength={500}
          warningText="Max 500 characters"
        />

        <SelectField
          label="Project Type *"
          value={formData.projectType}
          onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
          required
          disabled={loading}
          options={projectTypeOptions}
        />

        <InputField
          type="text"
          label="Technologies"
          value={formData.technologies}
          onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
          disabled={loading}
          placeholder="React, TypeScript, Node.js (separate with commas)"
          warningText="Please separate with commas"
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <InputField
            type="url"
            label="Project URL"
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

        <TextAreaField
          label="Privacy Policy"
          value={formData.privacyPolicy}
          onChange={(e) => setFormData({ ...formData, privacyPolicy: e.target.value })}
          disabled={loading}
          placeholder="Enter privacy policy text here (optional)..."
          rows={6}
          warningText="Optional - Only add if this project has a privacy policy"
        />

        <div style={{ marginBottom: '1.5rem' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#333',
            }}
          >
            Project Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.5rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '0.875rem',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          />
          {imagePreview && (
            <div style={{ marginTop: '1rem' }}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '200px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                }}
              />
            </div>
          )}
          <p
            style={{
              marginTop: '0.25rem',
              fontSize: '0.75rem',
              color: '#666',
            }}
          >
            Maximum file size: 5MB (jpeg, jpg, png, gif, webp)
          </p>
        </div>

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
              <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Featured Project</span>
            </label>
          </div>

          <InputField
            type="number"
            label="Order"
            value={String(formData.order)}
            onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
            disabled={loading}
            placeholder="0"
            warningText="Smaller numbers will be shown first"
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
          {loading ? 'Creating...' : 'Create Project'}
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
