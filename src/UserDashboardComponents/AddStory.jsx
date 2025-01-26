import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddStory = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [authorName, setAuthorName] = useState('');  // New state for author's name
  const [date, setDate] = useState('');  // New state for date
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Assuming you fetch the author's name (e.g., from localStorage or an auth service)
    const name = localStorage.getItem('userName') || 'Guest';  // Example logic to get user name
    setAuthorName(name);

    // Set the current date when the component loads
    const currentDate = new Date().toLocaleDateString();
    setDate(currentDate);
  }, []);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || images.length === 0) {
      toast.error('Please fill all fields and upload at least one image');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('authorName', authorName);  // Add author's name to the form data
    formData.append('date', date);  // Add the current date to the form data
    images.forEach((image) => formData.append('images', image));

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/stories', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Story added successfully!');
        navigate('/dashboard/user/manage-stories'); // Redirect to manage stories page
      } else {
        throw new Error(data.message || 'Failed to add story');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'An error occurred while adding the story');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add a New Story</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="block text-sm font-medium">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="images" className="block text-sm font-medium">Upload Images</label>
          <input
            type="file"
            id="images"
            onChange={handleImageUpload}
            multiple
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 px-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Add Story'}
        </button>
      </form>
    </div>
  );
};

export default AddStory;
