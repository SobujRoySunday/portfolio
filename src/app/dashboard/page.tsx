'use client';

import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { CiStar, FaStar, RiDeleteBin2Fill, RiEdit2Fill } from '@/constants'

interface Project {
  _id: string;
  name: string;
  description: string;
  image: string;
  url: string;
  isStarred: boolean;
}

const Dashboard = () => {
  const [projects, setProjects] = React.useState<Project[]>([]);
  const router = useRouter();
  const [deleteDialog, setDeleteDialog] = React.useState(false);
  const [selectedProjectId, setSelectedProjectId] = React.useState<String>('');

  const handleLogout = () => {
    router.push('/api/logout');
  };

  // TODO:
  const handleEdit = (id: String) => {
    console.log(`Editing project with id: ${id}`);
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

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">
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
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
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
