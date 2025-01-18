import React from 'react';
import { Link } from 'react-router-dom';

const GuideCard = ({guide}) => {
    return (
        <div className="card card-compact bg-base-100 w-96 shadow-xl">
  <figure>
    <img
      src={guide.photo}
      alt="Shoes" />
  </figure>
  <div className="card-body">
  <h3 className="text-xl font-semibold mt-2">{guide.name}</h3>
      <p className="text-gray-500">Experience: {guide.experience}</p>
      <p className="text-gray-700">Specialty: {guide.specialty}</p> 
    <div className="card-actions justify-end">
      <Link to={`/guides/${guide._id}`} className="btn btn-primary">Details</Link>
    </div>
  </div>
</div>
    );
};

export default GuideCard;