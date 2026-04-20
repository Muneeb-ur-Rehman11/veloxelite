import React from 'react';
import { useParams } from 'react-router-dom';
import carsData from '../carsData';

const BrandPage = () => {
  const { brandName } = useParams();
  const filteredCars = carsData.filter(
    (car) => car.brand.toLowerCase() === brandName.toLowerCase()
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">{brandName} Cars</h1>
      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">
                {car.brand} {car.model}
              </h2>
              <p className="text-gray-400">{car.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No cars available for this brand.</p>
      )}
    </div>
  );
};

export default BrandPage;