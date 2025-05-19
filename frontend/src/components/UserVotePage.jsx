import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const UserVotePage = () => {
  const [candidates, setCandidates] = useState([]);
  const [votedCandidates, setVotedCandidates] = useState(new Set()); // Track voted candidates
  const [filepath, setFilepath] = useState('');

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('http://localhost:3000/get-candidates');
        if (Array.isArray(response.data.data)) {
          setCandidates(response.data.data);
          setFilepath(response.data.filepath);
        } else {
          console.error('Unexpected response data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };
    fetchCandidates();
  }, []);

  const voteForCandidate = async (candidateId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:3000/vote', 
        { candidateId }, 
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token here
          },
        }
      );

      // Show success message as toast
      toast.success(response.data.message);

      // Update the candidate's vote count locally after successful voting
      setCandidates(prevCandidates =>
        prevCandidates.map(candidate =>
          candidate._id === candidateId
            ? { ...candidate, votes: candidate.votes + 1 }
            : candidate
        )
      );

      // Mark the candidate as voted
      setVotedCandidates(prevVoted => new Set(prevVoted).add(candidateId));

    } catch (error) {
      // Show error message as toast
      toast.error(error.response?.data.message || 'Error voting for candidate');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Vote for Your Candidate</h1>

        {/* Card Layout for Candidates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {candidates.map(candidate => (
            <div key={candidate._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={filepath + '/' + candidate.image}
                alt={candidate.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{candidate.name}</h3>
                {/* <p className="text-gray-600 mt-2">Votes: {candidate.votes}</p> */}
                <button
                  onClick={() => voteForCandidate(candidate._id)}
                  className={`w-full mt-4 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 
                    ${votedCandidates.has(candidate._id) ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                  disabled={votedCandidates.has(candidate._id)} // Disable button if voted
                >
                  {votedCandidates.has(candidate._id) ? 'Voted' : 'Vote'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserVotePage;
