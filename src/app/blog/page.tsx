'use client'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '@/components/DashboardLayout';
import { useRouter } from 'next/navigation';

const BlogPage = () => {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all blogs from the API.
  const fetchBlogs = async () => {
    try {
      const response = await axios.get('https://backend-api-auvp.onrender.com/api/blogs'); // Adjust the API endpoint as needed
      setBlogs(response.data.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  // Fetch blogs on component mount.
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Filter blogs based on search term.
  const filteredBlogs = blogs.filter((blog:any) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Navigate to the "create new blog" page.
  const handleCreateNew = () => {
    router.push('/blog/new');
  };

  // Navigate to the edit page for the selected blog.
  const handleEdit = (blogId: any) => {
    router.push(`/blog/new?id=${blogId}`);
  };

  // Delete a blog and refresh the list.
  const handleDelete = async (blogId: any) => {
    try {
      await axios.delete(`https://backend-api-auvp.onrender.com/api/blogs/${blogId}`);
      // Refresh the blogs after deletion.
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-4">
        {/* Search and Create New Blog */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded-md w-full sm:max-w-md mb-3 sm:mb-0"
          />
          <button
            onClick={handleCreateNew}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Create New Blog
          </button>
        </div>

        {/* Blog List */}
        <div>
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog:any) => (
              <div
                key={blog._id}
                className="border rounded-md p-4 mb-4 flex flex-col md:flex-row md:items-center"
              >
                {blog.image && (
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full md:w-48 h-32 object-cover rounded-md mb-3 md:mb-0 md:mr-4"
                  />
                )}
                <div className="flex-1">
                  <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                  <p className="text-gray-600 mb-2">
                    {blog.description.length > 100
                      ? blog.description.substring(0, 100) + '...'
                      : blog.description}
                  </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(blog._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded-md"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-6">No blogs found.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BlogPage;
