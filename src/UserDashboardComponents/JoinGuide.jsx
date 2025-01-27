import React, { useState } from "react";
import { toast } from "react-toastify";

const JoinGuide = () => {
  const [formData, setFormData] = useState({
    applicationTitle: "",
    reason: "",
    cvLink: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form fields
    if (!formData.applicationTitle || !formData.reason || !formData.cvLink) {
      toast.error("Please fill in all fields!");
      return;
    }

    // Show success modal on submission
    setShowModal(true);

    // Reset form fields
    setFormData({
      applicationTitle: "",
      reason: "",
      cvLink: "",
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Join as a Tour Guide
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="applicationTitle" className="block font-medium">
            Application Title
          </label>
          <input
            type="text"
            id="applicationTitle"
            name="applicationTitle"
            value={formData.applicationTitle}
            onChange={handleChange}
            className="input input-bordered w-full mt-2"
            placeholder="Enter application title"
            required
          />
        </div>
        <div>
          <label htmlFor="reason" className="block font-medium">
            Why do you want to be a Tour Guide?
          </label>
          <textarea
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="textarea textarea-bordered w-full mt-2"
            placeholder="Enter your reason"
            rows="4"
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="cvLink" className="block font-medium">
            CV Link
          </label>
          <input
            type="url"
            id="cvLink"
            name="cvLink"
            value={formData.cvLink}
            onChange={handleChange}
            className="input input-bordered w-full mt-2"
            placeholder="Enter CV link"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full text-white"
        >
          Submit
        </button>
      </form>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-4">
              Application Successful!
            </h3>
            <p className="text-gray-600 mb-6">
              Thank you for applying to be a tour guide. We will review your
              application and get back to you soon.
            </p>
            <button
              className="btn btn-primary text-white"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinGuide;
