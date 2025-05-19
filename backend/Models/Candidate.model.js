import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image:{
        type: String,
        default: null
    },
    votes: {
        type: Number,
        default: 0
    }
});

const CandidateModel = mongoose.model('Candidate', candidateSchema);

export default CandidateModel;
