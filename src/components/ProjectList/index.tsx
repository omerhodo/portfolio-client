import { Project } from '@/types';
import Modal from '@components/Modal';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface ProjectListProps {
  onProjectUpdated?: () => void;
  refreshTrigger?: number;
}

const ProjectList = ({ onProjectUpdated, refreshTrigger }: ProjectListProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectType: '',
    technologies: '',
    projectUrl: '',
    githubUrl: '',
    privacyPolicy: '',
    featured: false,
    order: 0,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateError, setUpdateError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState('');
  const [draggedItem, setDraggedItem] = useState<Project | null>(null);
  const [draggedOverItem, setDraggedOverItem] = useState<Project | null>(null);

  const projectTypeOptions = [
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'fullstack', label: 'Fullstack' },
    { value: 'mobile', label: 'Mobile' },
    { value: 'wordpress', label: 'WordPress' },
    { value: 'ai', label: 'AI' },
    { value: 'other', label: 'Other' },
  ];

  useEffect(() => {
    fetchProjects();
  }, [refreshTrigger]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/projects`);
      setProjects(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(projects.filter((p) => p._id !== id));
      if (onProjectUpdated) {
        onProjectUpdated();
      }
    } catch (err: any) {
      alert(err.response?.data?.message || err.message || 'Failed to delete project');
    }
  };

  const toggleFeatured = async (project: Project) => {
    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();

      formDataToSend.append('title', project.title);
      formDataToSend.append('description', project.description);
      formDataToSend.append('projectType', project.projectType || '');
      formDataToSend.append('technologies', Array.isArray(project.technologies) ? project.technologies.join(', ') : '');
      formDataToSend.append('projectUrl', project.projectUrl || '');
      formDataToSend.append('githubUrl', project.githubUrl || '');
      formDataToSend.append('privacyPolicy', project.privacyPolicy || '');
      formDataToSend.append('featured', String(!project.featured));
      formDataToSend.append('order', String(project.order || 0));

      await axios.put(`${import.meta.env.VITE_API_URL}/projects/${project._id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchProjects();
      if (onProjectUpdated) {
        onProjectUpdated();
      }
    } catch (err: any) {
      alert(err.message || 'Failed to update featured status');
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, project: Project) => {
    setDraggedItem(project);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>, project: Project) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDraggedOverItem(project);
  };

  const handleDragEnd = async (e: React.DragEvent<HTMLTableRowElement>) => {
    e.preventDefault();

    if (!draggedItem || !draggedOverItem || draggedItem._id === draggedOverItem._id) {
      setDraggedItem(null);
      setDraggedOverItem(null);
      return;
    }

    // Get projects of the same type
    const sameTypeProjects = projects.filter((p) => p.projectType === draggedItem.projectType);
    const draggedIndex = sameTypeProjects.findIndex((p) => p._id === draggedItem._id);
    const targetIndex = sameTypeProjects.findIndex((p) => p._id === draggedOverItem._id);

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedItem(null);
      setDraggedOverItem(null);
      return;
    }

    // Reorder within the same type
    const reordered = [...sameTypeProjects];
    const [removed] = reordered.splice(draggedIndex, 1);
    reordered.splice(targetIndex, 0, removed);

    // Update order numbers
    const updatedProjects = reordered.map((p, index) => ({ ...p, order: index }));

    // Update all projects with new order
    const otherProjects = projects.filter((p) => p.projectType !== draggedItem.projectType);
    const allProjects = [...otherProjects, ...updatedProjects].sort((a, b) => {
      if (a.projectType !== b.projectType) {
        return (a.projectType || '').localeCompare(b.projectType || '');
      }
      return (a.order || 0) - (b.order || 0);
    });

    setProjects(allProjects);
    setDraggedItem(null);
    setDraggedOverItem(null);

    // Send update requests for reordered projects
    try {
      const token = localStorage.getItem('token');
      await Promise.all(
        updatedProjects.map(async (project) => {
          const formDataToSend = new FormData();
          formDataToSend.append('title', project.title);
          formDataToSend.append('description', project.description);
          formDataToSend.append('projectType', project.projectType || '');
          formDataToSend.append(
            'technologies',
            Array.isArray(project.technologies) ? project.technologies.join(', ') : ''
          );
          formDataToSend.append('projectUrl', project.projectUrl || '');
          formDataToSend.append('githubUrl', project.githubUrl || '');
          formDataToSend.append('featured', String(project.featured || false));
          formDataToSend.append('order', String(project.order || 0));

          await axios.put(`${import.meta.env.VITE_API_URL}/projects/${project._id}`, formDataToSend, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        })
      );

      if (onProjectUpdated) {
        onProjectUpdated();
      }
    } catch (err: any) {
      alert(err.message || 'Failed to update order');
      fetchProjects(); // Reload on error
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      projectType: project.projectType || '',
      technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
      projectUrl: project.projectUrl || '',
      githubUrl: project.githubUrl || '',
      privacyPolicy: project.privacyPolicy || '',
      featured: project.featured || false,
      order: project.order || 0,
    });
    setImagePreview(project.imageUrl || '');
    setImageFile(null);
    setUpdateError('');
    setUpdateSuccess('');
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setUpdateError('File size must be less than 5MB');
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        setUpdateError('Only image files are allowed (jpeg, jpg, png, gif, webp)');
        return;
      }

      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setUpdateError('');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    setUpdateLoading(true);
    setUpdateError('');
    setUpdateSuccess('');

    try {
      const token = localStorage.getItem('token');
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

      await axios.put(`${import.meta.env.VITE_API_URL}/projects/${editingProject._id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUpdateSuccess('Project updated successfully!');

      setTimeout(() => {
        setIsModalOpen(false);
        fetchProjects();
        if (onProjectUpdated) {
          onProjectUpdated();
        }
      }, 1500);
    } catch (err: any) {
      setUpdateError(err.message || 'Failed to update project');
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <p className="text-gray-600">No projects found. Create your first project above!</p>
      </div>
    );
  }

  // Group projects by type
  const groupedProjects = projects.reduce((acc, project) => {
    const type = project.projectType || 'other';
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(project);
    return acc;
  }, {} as Record<string, Project[]>);

  // Sort projects within each group by order
  Object.keys(groupedProjects).forEach((type) => {
    groupedProjects[type].sort((a, b) => (a.order || 0) - (b.order || 0));
  });

  return (
    <>
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-6">Existing Projects</h3>

        {projectTypeOptions.map((typeOption) => {
          const typeProjects = groupedProjects[typeOption.value];
          if (!typeProjects || typeProjects.length === 0) return null;

          return (
            <div key={typeOption.value} className="mb-8">
              <h4 className="text-xl font-semibold mb-3 text-gray-800">
                {typeOption.label} Projects ({typeProjects.length})
              </h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Image</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Featured</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Order</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {typeProjects.map((project) => (
                      <tr
                        key={project._id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, project)}
                        onDragOver={(e) => handleDragOver(e, project)}
                        onDragEnd={handleDragEnd}
                        className={`border-t border-gray-200 hover:bg-gray-50 cursor-move transition-colors ${
                          draggedOverItem?._id === project._id ? 'bg-blue-50' : ''
                        }`}
                      >
                        <td className="px-4 py-3">
                          {project.imageUrl ? (
                            <img
                              src={project.imageUrl}
                              alt={project.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
                              No image
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">{project.title}</div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">{project.description}</div>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => toggleFeatured(project)}
                            className="text-2xl hover:scale-110 transition-transform cursor-pointer"
                            title={project.featured ? 'Remove from featured' : 'Mark as featured'}
                          >
                            {project.featured ? (
                              <span className="text-yellow-500">⭐</span>
                            ) : (
                              <span className="text-gray-300">☆</span>
                            )}
                          </button>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{project.order || 0}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(project)}
                              className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(project._id)}
                              className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit Project">
        <form onSubmit={handleUpdate}>
          {updateError && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{updateError}</div>}

          {updateSuccess && <div className="bg-green-50 text-green-600 p-3 rounded mb-4 text-sm">{updateSuccess}</div>}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                disabled={updateLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                disabled={updateLoading}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Type *</label>
              <select
                value={formData.projectType}
                onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                required
                disabled={updateLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a type</option>
                {projectTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Technologies</label>
              <input
                type="text"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                disabled={updateLoading}
                placeholder="React, TypeScript, Node.js"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project URL</label>
                <input
                  type="url"
                  value={formData.projectUrl}
                  onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                  disabled={updateLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  disabled={updateLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Privacy Policy <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <textarea
                value={formData.privacyPolicy}
                onChange={(e) => setFormData({ ...formData, privacyPolicy: e.target.value })}
                disabled={updateLoading}
                rows={6}
                placeholder="Enter privacy policy text here (optional)..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
              />
              <p className="text-xs text-gray-500 mt-1">
                Only add if this project has a privacy policy. Leave empty otherwise.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={updateLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img src={imagePreview} alt="Preview" className="max-w-full max-h-48 rounded border" />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    disabled={updateLoading}
                  />
                  <span className="text-sm font-medium text-gray-700">Featured Project</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                  disabled={updateLoading}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={updateLoading}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {updateLoading ? 'Updating...' : 'Update Project'}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default ProjectList;
