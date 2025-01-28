import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../Components/Provider/AuthProvider';
import axios from 'axios';

const AddStory = () => {
  const { user } = useContext(AuthContext);
  const [imageLink, setImageLink] = useState(''); // Store image URL
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      toast.error('Please log in to add a story!');
      navigate('/login');
    }
  }, [user, navigate]);

  const handleImageLinkChange = (e) => {
    const url = e.target.value;
    setImageLink(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;

    const currentDate = new Date().toLocaleDateString();

    if (!imageLink || !imageLink.startsWith('http')) {
      toast.error('Please provide a valid image URL!');
      return;
    }

    const formData = {
      title,
      description,
      image: imageLink, // Use the provided image URL
      authorName: user?.displayName || 'Unknown',
      email: user?.email || 'No email provided',
      date: currentDate,
    };

    setLoading(true);
    try {
      const response = await axios.post('https://tour-mate-bd-server-site.vercel.app/stories', formData);

      if (response.data) {
        toast.success('Story added successfully!');
        navigate('/dashboard/user/manage-stories');
      } else {
        throw new Error(response.data.message || 'Failed to add story');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      toast.error(error.message || 'An error occurred while adding the story');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">Title:</label>
        <input
          type="text"
          name="title"
          required
          className="input input-bordered w-full mt-2"
          placeholder="Enter story title"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium">Description:</label>
        <textarea
          name="description"
          required
          className="textarea textarea-bordered w-full mt-2"
          rows="4"
          placeholder="Enter story description"
        />
      </div>
      <div>
        <label htmlFor="image" className="block text-sm font-medium">Image URL:</label>
        <input
          type="url"
          name="image"
          placeholder="Enter image URL"
          value={imageLink}
          onChange={handleImageLinkChange}
          className="input input-bordered w-full mt-2"
        />
      </div>
      <button
        type="submit"
        className={`btn text-white btn-primary w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Add Story'}
      </button>
    </form>
  );
};

export default AddStory;
