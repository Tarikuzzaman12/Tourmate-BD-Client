import { useState } from "react";
import { toast } from "react-toastify";

const AddPackageForm = () => {
  const [newPackage, setNewPackage] = useState({
    serial: "",
    photo: "",
    tourType: "",
    tripTitle: "",
    price: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPackage({ ...newPackage, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://tour-mate-bd-server-site.vercel.app/packages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPackage),
      });

      if (!response.ok) throw new Error("Failed to add package");

      toast.success("Package added successfully!");
      setNewPackage({
        serial: "",
        photo: "",
        tourType: "",
        tripTitle: "",
        price: "",
      }); // Reset form fields
    } catch (error) {
      console.error(error);
      toast.error("Failed to add package. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Package</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Photo URL</label>
          <input
            type="text"
            name="photo"
            value={newPackage.photo}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tour Type</label>
          <input
            type="text"
            name="tourType"
            value={newPackage.tourType}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Trip Title</label>
          <input
            type="text"
            name="tripTitle"
            value={newPackage.tripTitle}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={newPackage.price}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-2"
        >
          Add Package
        </button>
      </form>
    </div>
  );
};

export default AddPackageForm;
