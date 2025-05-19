import UserModel from '../Models/User.model';
import CandidateModel from '../Models/Candidate.model';


export const voteForCandidate = async (req, res) => {
    try {
     
        const userId = req.user._id; 
        console.log('userid',userId)
        const { candidateId } = req.body;

        // Check if the user has already voted
        const user = await UserModel.findById(userId);
        if (user.hasVoted) {
            return res.status(400).json({ message: "User has already voted" });
        }

        // Find the candidate and increment the vote count
        const candidate = await CandidateModel.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        candidate.votes += 1;
        await candidate.save();

        // Mark the user as having voted
        user.hasVoted = true;
        await user.save();

        return res.status(200).json({ message: "Vote cast successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


