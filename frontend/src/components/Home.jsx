import React from 'react';
import image from '../assets/online-voting.png'; 

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <img src={image} alt="Online Voting" className="max-w-full h-screen" />
    </div>
  );
};

export default Home;
