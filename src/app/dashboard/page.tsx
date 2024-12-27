'use client';

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CiStar, FaStar, IoCreate, IoLogOut, RiDeleteBin2Fill, RiEdit2Fill } from '@/constants'

interface Project {
  _id: string;
  name: string;
  description: string;
  image: string;
  url: string;
  isStarred: boolean;
}

const Dashboard = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);

    try {
      const base64 = await convertToBase64(file);
      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64 }),
      });

      const data = await response.json();
      if (response.ok) {
        setNewProjectData((prevData) => ({ ...prevData, image: data.url }));
      } else {
        console.error('Upload failed:', data.error);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const [projects, setProjects] = React.useState<Project[]>([]);
  const router = useRouter();
  const [deleteDialog, setDeleteDialog] = React.useState(false);
  const [projectEditor, setProjectEditor] = React.useState(false);
  const [editorMode, setEditorMode] = React.useState('');
  const [selectedProjectId, setSelectedProjectId] = React.useState<String>('');
  const [newProjectData, setNewProjectData] = React.useState({
    name: '',
    description: '',
    image: '',
    url: '',
  })

  const handleLogout = () => {
    router.push('/api/logout');
  };

  const handleEdit = (id: String) => {
    setSelectedProjectId(id);
    setEditorMode('edit');
    setNewProjectData(() => {
      const thisProject = projects.find((project) => project._id === id);
      return {
        name: thisProject?.name || '',
        description: thisProject?.description || '',
        image: thisProject?.image || '',
        url: thisProject?.url || '',
      }
    })
    setProjectEditor(true);
  };

  const handleDelete = (projectId: String) => {
    setSelectedProjectId(projectId);
    setDeleteDialog(true);
  };

  const deleteProject = async () => {
    try {
      await axios.post('/api/deleteProject', { projectId: selectedProjectId });
      await getProjects();
      setSelectedProjectId('');
      setDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  }

  const getProjects = async () => {
    try {
      const response = await axios.get('/api/getProjects');
      setProjects(response.data.projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }

  const handleToggleStar = async (id: String) => {
    try {
      await axios.post('/api/toggleStar', { projectId: id });
      await getProjects();
    } catch (error) {
      console.error('Error toggling star:', error);
    }
  }

  const handleSave = async () => {
    try {
      if (editorMode === 'edit') {
        await axios.post('/api/editProject', { projectData: newProjectData, projectId: selectedProjectId });
      } else if (editorMode === 'create') {
        await axios.post('/api/createProject', { projectData: newProjectData });
      } else {
        throw new Error('Invalid editor mode');
      }
    } catch (error) {
      console.error('Error saving project:', error);
    } finally {
      await getProjects();
      setSelectedProjectId('');
      setProjectEditor(false);
    }
  };

  const handleCreate = () => {
    setEditorMode('create');
    setProjectEditor(true);
  }

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
      {/* Project editor dialog box */}
      {projectEditor && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg h-[80vh] overflow-y-auto">
            <p className="text-lg font-semibold mb-2">Edit Project</p>
            <form className='flex flex-col w-96'>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor='name' >Name</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" name='name' value={newProjectData.name} onChange={(e) => setNewProjectData({ ...newProjectData, name: e.target.value })} placeholder='Project Name' />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor='description'>Description</label>
                <textarea className="w-full p-2 border border-gray-300 rounded-lg" rows={4} name='description' value={newProjectData.description} onChange={(e) => setNewProjectData({ ...newProjectData, description: e.target.value })} placeholder='Project Description' />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2" htmlFor='url'>URL</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded-lg" name='url' value={newProjectData.url} onChange={(e) => setNewProjectData({ ...newProjectData, url: e.target.value })} placeholder='Project URL' />
              </div>
              <div className='mb-4'>
                <label className="block text-gray-700 font-semibold mb-2" htmlFor='image'>Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
                {preview && (
                  <Image src={preview} alt="Preview" width={1280} height={720} className="mt-4 w-full rounded-lg" />
                )}
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
                {newProjectData.image && (
                  <p className="mt-4 text-green-600">Image URL: {newProjectData.image}</p>
                )}
              </div>
            </form>
            <div className="flex justify-end mt-4">
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg mr-2" onClick={() => { handleSave() }}>
                Save
              </button>
              <button className="px-4 py-2 bg-gray-400 text-white rounded-lg mr-2" onClick={() => { setProjectEditor(false); setEditorMode(''); setNewProjectData({ name: '', description: '', url: '', image: '' }); }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation dialog box */}
      {deleteDialog && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-lg font-semibold mb-2">Delete Project</p>
            <p className="text-gray-600">Are you sure you want to delete this project?</p>
            <div className="flex justify-end mt-4">
              <button className="px-4 py-2 bg-gray-400 text-white rounded-lg mr-2" onClick={() => { setDeleteDialog(false); }}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg" onClick={() => { deleteProject() }}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard content */}
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className='flex gap-2'>
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900"
            >
              <IoCreate />
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900"
            >
              <IoLogOut />
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-2">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-4 relative"
            >
              <Image
                width={1280}
                height={720}
                src={project.image}
                alt={project.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-bold text-gray-800 mt-4">{project.name}</h3>
              <p className="text-gray-600 mt-2">{project.description}</p>
              <p className='mt-2 text-gray-600 text-xs'>Project URL: <Link className='text-blue-500' href={project.url}>{project.url}</Link></p>
              <button className='absolute top-8 right-8' onClick={() => handleToggleStar(project._id)}>
                {project.isStarred ? (
                  <FaStar className='text-yellow-500' />
                ) : (
                  <CiStar className='text-yellow-500' />
                )}
              </button>
              {/* Edit and Delete buttons at the bottom of the card */}
              <div className="space-y-2 absolute top-8 left-8 flex flex-col">
                <button
                  onClick={() => handleEdit(project._id)}
                  className="text-blue-500"
                >
                  <RiEdit2Fill />
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="text-red-500"
                >
                  <RiDeleteBin2Fill />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
