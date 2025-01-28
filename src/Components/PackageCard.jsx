import React from 'react';
import { Link } from 'react-router-dom';

const PackageCard = ({ pkg }) => {
    return (
        <div className="card card-compact bg-base-100 w-96 shadow-xl">
            <figure>
                <img className='h-[256px] w-[384px]'
                    src={pkg.photo}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{pkg.tripTitle}</h2>
                <p className='text-2xl'>{pkg.tourType}</p>
                <p className='text-xl'>$ {pkg.price}</p>

                <div className="card-actions justify-end">
                    <Link to={`/packages/${pkg._id}`} className="btn btn-primary">Details</Link>
                </div>
            </div>
        </div>
    );
};

export default PackageCard;