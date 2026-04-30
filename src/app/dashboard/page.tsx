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
    <div className="min-h-screen p-4 md:p-8 relative">
      {/* ═══ Project Editor Dialog ═══ */}
      {projectEditor && (
        <div className="fixed inset-0 flex items-center justify-center bg-void/80 backdrop-blur-sm z-50 animate-scale-in">
          <div className="relative glass-panel p-6 w-[90vw] max-w-md max-h-[85vh] overflow-y-auto">
            {/* LCARS header bar */}
            <div className='flex items-center gap-2 mb-6'>
              <div className='h-2 w-12 rounded-full bg-lcars-amber/60' />
              <div className='h-2 w-4 rounded-full bg-warp-cyan/40' />
              <div className='h-2 flex-1 rounded-full bg-panel' />
            </div>

            <p className="text-lg font-orbitron font-semibold mb-6 tracking-wider text-text-primary">
              {editorMode === 'edit' ? 'Edit' : 'Create'} Project
            </p>

            <form className='flex flex-col w-full gap-4'>
              <div>
                <label className="font-mono text-xs text-text-secondary tracking-wider uppercase mb-2 block" htmlFor='name'>Name</label>
                <input 
                  type="text" 
                  className="input-warp w-full" 
                  name='name' 
                  value={newProjectData.name} 
                  onChange={(e) => setNewProjectData({ ...newProjectData, name: e.target.value })} 
                  placeholder='Project Name' 
                />
              </div>

              <div>
                <label className="font-mono text-xs text-text-secondary tracking-wider uppercase mb-2 block" htmlFor='description'>Description</label>
                <textarea 
                  className="input-warp w-full resize-none" 
                  rows={4} 
                  name='description' 
                  value={newProjectData.description} 
                  onChange={(e) => setNewProjectData({ ...newProjectData, description: e.target.value })} 
                  placeholder='Project Description' 
                />
              </div>

              <div>
                <label className="font-mono text-xs text-text-secondary tracking-wider uppercase mb-2 block" htmlFor='url'>URL</label>
                <input 
                  type="text" 
                  className="input-warp w-full" 
                  name='url' 
                  value={newProjectData.url} 
                  onChange={(e) => setNewProjectData({ ...newProjectData, url: e.target.value })} 
                  placeholder='Project URL' 
                />
              </div>

              <div>
                <label className="font-mono text-xs text-text-secondary tracking-wider uppercase mb-2 block" htmlFor='image'>Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-text-secondary 
                    file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-dim 
                    file:text-sm file:bg-panel file:text-warp-cyan 
                    hover:file:bg-warp-cyan/10 hover:file:border-active
                    file:transition-all file:duration-300 file:cursor-pointer
                    file:font-mono file:text-xs file:tracking-wider file:uppercase"
                />
                {preview && (
                  <Image src={preview} alt="Preview" width={1280} height={720} className="mt-4 w-full rounded-lg border border-dim" />
                )}
                <button
                  onClick={handleUpload}
                  disabled={uploading}
                  type="button"
                  className="btn-warp w-full justify-center mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <span className='flex items-center gap-2'>
                      <div className='w-4 h-4 border-2 border-warp-cyan border-t-transparent rounded-full animate-spin' />
                      Uploading...
                    </span>
                  ) : (
                    'Upload'
                  )}
                </button>
                {newProjectData.image && (
                  <div className='mt-3 flex items-center gap-2 bg-status-green/10 border border-status-green/20 rounded-lg px-3 py-2'>
                    <div className='w-2 h-2 rounded-full bg-status-green' />
                    <p className="text-sm text-status-green font-mono text-xs truncate">Image uploaded successfully</p>
                  </div>
                )}
              </div>
            </form>

            <div className="flex gap-3 mt-6">
              <button 
                className="btn-lcars flex-1 justify-center" 
                onClick={() => { handleSave() }}
              >
                Save
              </button>
              <button 
                className="btn-warp flex-1 justify-center text-text-secondary border-text-muted hover:text-text-primary" 
                onClick={() => { setProjectEditor(false); setEditorMode(''); setNewProjectData({ name: '', description: '', url: '', image: '' }); }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Delete Confirmation Dialog ═══ */}
      {deleteDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-void/80 backdrop-blur-sm z-50 animate-scale-in">
          <div className="glass-panel p-6 w-[90vw] max-w-sm">
            {/* Alert header */}
            <div className='flex items-center gap-2 mb-4'>
              <div className='h-2 w-12 rounded-full bg-alert-red/60' />
              <div className='h-2 flex-1 rounded-full bg-panel' />
            </div>

            <div className='flex items-center gap-3 mb-2'>
              <div className='w-3 h-3 rounded-full bg-alert-red animate-warp-pulse' />
              <p className="text-lg font-orbitron font-semibold text-alert-red tracking-wider">Delete Project</p>
            </div>
            <p className="text-text-secondary font-rajdhani text-base mt-2">Are you sure you want to delete this project? This action cannot be undone.</p>

            <div className="flex gap-3 mt-6">
              <button 
                className="btn-warp flex-1 justify-center text-text-secondary border-text-muted hover:text-text-primary" 
                onClick={() => { setDeleteDialog(false); }}
              >
                Cancel
              </button>
              <button 
                className="flex-1 px-4 py-3 font-orbitron text-xs font-semibold tracking-[0.15em] uppercase bg-alert-red/20 text-alert-red border border-alert-red/30 rounded hover:bg-alert-red/30 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-300 cursor-pointer" 
                onClick={() => { deleteProject() }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Dashboard Content ═══ */}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="glass-panel p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className='flex items-center gap-4'>
              {/* LCARS decorative element */}
              <div className='hidden md:flex items-center gap-1'>
                <div className='w-3 h-3 rounded-full bg-status-green animate-warp-pulse' />
                <div className='w-8 h-1 rounded-full bg-lcars-amber' />
              </div>
              <h1 className="text-xl md:text-2xl font-orbitron font-bold text-text-primary tracking-wider">
                Dashboard
              </h1>
              <span className='hidden md:block font-mono text-[10px] text-text-muted tracking-[0.2em] uppercase'>
                Command Center
              </span>
            </div>

            <div className='flex gap-2'>
              <button
                onClick={handleCreate}
                className="group flex items-center justify-center w-10 h-10 rounded-lg border border-dim hover:border-active transition-all duration-300 hover:shadow-glow-cyan"
                title="Create Project"
              >
                <IoCreate className='text-lg text-text-secondary group-hover:text-warp-cyan transition-colors duration-300' />
              </button>
              <button
                onClick={handleLogout}
                className="group flex items-center justify-center w-10 h-10 rounded-lg border border-dim hover:border-alert-red/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                title="Logout"
              >
                <IoLogOut className='text-lg text-text-secondary group-hover:text-alert-red transition-colors duration-300' />
              </button>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project._id}
              className="glass-panel overflow-hidden card-hover relative group holo-shimmer"
            >
              {/* Image */}
              <div className='relative overflow-hidden'>
                <Image
                  width={1280}
                  height={720}
                  src={project.image}
                  alt={project.name}
                  className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className='absolute inset-0 bg-gradient-to-t from-panel via-transparent to-transparent opacity-60' />
              </div>

              {/* Content */}
              <div className='p-4'>
                <h3 className="text-lg font-orbitron font-bold text-text-primary mt-2 group-hover:text-warp-cyan transition-colors duration-300">
                  {project.name}
                </h3>
                <p className="text-text-secondary font-rajdhani mt-2 text-sm leading-relaxed">{project.description}</p>
                <p className='mt-3 text-text-muted text-xs font-mono'>
                  URL: <Link className='text-warp-cyan hover:text-warp-teal transition-colors' href={project.url}>{project.url}</Link>
                </p>
              </div>

              {/* Star toggle - top right */}
              <button 
                className='absolute top-3 right-3 w-8 h-8 rounded-full bg-void/60 backdrop-blur-sm border border-dim flex items-center justify-center hover:border-lcars-amber/50 hover:shadow-glow-amber transition-all duration-300' 
                onClick={() => handleToggleStar(project._id)}
              >
                {project.isStarred ? (
                  <FaStar className='text-lcars-amber text-sm' />
                ) : (
                  <CiStar className='text-text-muted text-sm hover:text-lcars-amber transition-colors' />
                )}
              </button>

              {/* Edit and Delete buttons - top left */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                <button
                  onClick={() => handleEdit(project._id)}
                  className="w-8 h-8 rounded-full bg-void/60 backdrop-blur-sm border border-dim flex items-center justify-center hover:border-active hover:shadow-glow-cyan transition-all duration-300"
                >
                  <RiEdit2Fill className='text-sm text-text-muted hover:text-warp-cyan transition-colors' />
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="w-8 h-8 rounded-full bg-void/60 backdrop-blur-sm border border-dim flex items-center justify-center hover:border-alert-red/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-all duration-300"
                >
                  <RiDeleteBin2Fill className='text-sm text-text-muted hover:text-alert-red transition-colors' />
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
