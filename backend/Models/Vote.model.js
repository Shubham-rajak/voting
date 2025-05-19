import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true // Ensures a user can vote only once
    },
    candidateId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate',
        required: true
    },

}, { timestamps: true });

const VoteModel = mongoose.model('Vote', voteSchema);

export default VoteModel;
