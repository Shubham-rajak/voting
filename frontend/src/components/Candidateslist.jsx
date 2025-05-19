import React, { useState, useEffect } from 'react';
import { MdDeleteForever } from "react-icons/md";
import axios from 'axios';
import toast from 'react-hot-toast'

const CandidatesList = () => {
  const [candidates, setCandidates] = useState([]);
  const [filepath, setFilepath] = useState('http://localhost:3000/uploads/');
  const [totalVotes, setTotalVotes] = useState(0); // Track total votes
  const [modalOpen, setModalOpen] = useState(false);
  const [newCandidate, setNewCandidate] = useState({
    name: '',
    image: null,
  });


  const fetchCandidates = async () => {
    try {
      const response = await axios.get('http://localhost:3000/get-candidates');
      console.log('API response:', response.data);
      if (response.data.data && Array.isArray(response.data.data)) {
        setCandidates(response.data.data);
        setFilepath(response.data.filepath);

        // Calculate total votes if available
        const total = response.data.data.reduce((acc, candidate) => acc + candidate.votes, 0);
        setTotalVotes(total);
      } else {
        console.error('Unexpected response data format:', response.data);
      }
    } catch (error) {
      setMessage('Error fetching candidates');
      console.error('Error fetching candidates:', error);
    }
  };
  useEffect(() => {
    fetchCandidates();
  }, []);

  const handleAddCandidate = (e) => {
    e.preventDefault();

    if (newCandidate.name && newCandidate.image) {
      const formData = new FormData();
      formData.append('image', newCandidate.image);
      formData.append('name', newCandidate.name);

      axios.post('http://localhost:3000/add-candidate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          if (response.data && response.data.data) {
            // Use functional state update to avoid stale state issue
            setCandidates(prevCandidates => [...prevCandidates, response.data.data]);

            // Close modal and reset form
            setModalOpen(false);
            setNewCandidate({ name: '', image: null });
          }
        })
        .catch((error) => {
          console.error('Error adding candidate:', error);
          setMessage('Error adding candidate');
        });
    } else {
      setMessage('Please fill in all fields');
    }
  };

  const handleDeleteCandidate = (candidateId) => {
      axios.delete(`http://localhost:3000/delete-candidate/${candidateId}`)
        .then((response) => {
          if (response.data) {
            toast.success("Candidate deleted successfully")
            fetchCandidates()
          }
        })
        .catch((error) => {
          console.error('Error deleting candidate:', error);
          setMessage('Error deleting candidate');
        });
    
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Candidates List</h1>

        {/* Button to open modal */}
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-6"
        >
          Add Candidate
        </button>

        {/* Error Message */}
        {/* {message && (
          <div className="bg-red-500 text-white text-center p-4 rounded-lg mb-4">
            <p>{message}</p>
          </div>
        )} */}

        {/* Candidates Table */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Image</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Candidate Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Votes</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Percentage</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(candidates) && candidates.map((candidate) => {
                const percentage = totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0;

                return (
                  <tr key={candidate._id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="px-6 py-4">
                      <img src={`${filepath}${candidate.image}`} alt={candidate.name} className="w-12 h-12 object-cover rounded-full" />
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">{candidate.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{candidate.votes} votes</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{percentage.toFixed(2)}%</td>
                    <td className="px-6 py-4 text-2xl w-16">
                      <MdDeleteForever
                        onClick={() => handleDeleteCandidate(candidate._id)}
                        className="cursor-pointer text-red-600"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for adding a candidate */}
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold text-center mb-4 ">Add Candidate</h2>

            {/* Form for adding candidate */}
            <form onSubmit={handleAddCandidate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  value={newCandidate.name}
                  onChange={(e) => setNewCandidate({ ...newCandidate, name: e.target.value })}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  onChange={(e) => setNewCandidate({ ...newCandidate, image: e.target.files[0] })}
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-gray-400 text-white py-2 px-4 rounded-lg"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  Add Candidate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidatesList;
