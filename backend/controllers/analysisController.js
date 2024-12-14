import User from "../models/userModel.js";
import Files from "../models/fileModels.js";
// import Session from "../models/sessionModel.js";


// Function to aggregate user creation data
export const getUserAnalysis = async (req, res) => {
    try {
        const data = await User.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%m-%d", date: "$createdAt" } },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } }, // Sort by date (ascending)
        ]);
        // console.log(data);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Function to analyze file creation data
// export const getFileAnalysis = async (req, res) => {
//     try {
//         const data = await File.aggregate([
//             {
//                 $group: {
//                     _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
//                     count: { $sum: 1 },
//                 },
//             },
//             { $sort: { _id: 1 } }, // Sort by date (ascending)
//         ]);

//         res.status(200).json(data);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

export const getFileAnalysis = async (req, res) => {
    try {
        const data = await File.aggregate([
            // {
            //     $lookup: {
            //         from: "User", // Assuming 'users' is the collection name for user data
            //         // localField: "userId", // Field in the File collection that references the user
            //         foreignField: "_id", // Field in the Users collection to match with localField
            //         as: "userInfo" // Alias for the data returned
            //     }
            // },
            // {
            //     $unwind: "$userInfo" // Flatten the userInfo array to work with individual user documents
            // },
            
            {
                $group: {
                    _id: "$userInfo.name", // Grouping by user name
                    fileCount: { $sum: 1 } // Counting the number of files per user
                }
            },
            { $sort: { _id: 1 } } // Sort by user name (ascending)
        ]);

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// // Log login event
export const logLogin = async (req, res) => {
    try {
        const { userId } = req.body;
        console.log(userId);

        const newSession = await Session.create({
            userId,
            loginTime: new Date(),
        });

        res.status(201).json(newSession);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// // Log logout event
export const logLogout = async (req, res) => {
    try {
        const { sessionId } = req.body;

        const session = await Session.findByIdAndUpdate(
            sessionId,
            { logoutTime: new Date() },
            { new: true } // Return updated document
        );

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        res.status(200).json(session);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// // Analyze logged-in time
export const analyzeLoggedInTime = async (req, res) => {
    try {
        const { userId, date } = req.query;

        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 1); // Move to the next day

        const data = await Session.aggregate([
            {
                $match: {
                    userId: mongoose.Types.ObjectId(userId),
                    loginTime: { $gte: startDate, $lt: endDate }, // Sessions within the day
                },
            },
            {
                $project: {
                    duration: {
                        $cond: [
                            { $ifNull: ["$logoutTime", false] }, // Check if logoutTime exists
                            { $subtract: ["$logoutTime", "$loginTime"] },
                            { $subtract: [new Date(), "$loginTime"] }, // If still logged in
                        ],
                    },
                },
            },
            {
                $group: {
                    _id: null,
                    totalLoggedInTime: { $sum: "$duration" }, // Total time logged in (ms)
                },
            },
        ]);

        const totalLoggedInTime = data[0]?.totalLoggedInTime || 0;
        res.status(200).json({ totalLoggedInTime: totalLoggedInTime / 1000 }); // Convert to seconds
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getMobileEntryPercentage = async (req, res) => {
    try {
        // Count total users
        const totalUsers = await User.countDocuments();

        // Count users with mobile numbers
        const usersWithMobile = await User.countDocuments({ mobile: { $exists: true, $ne: null } });

        // Calculate percentage
        const percentageWithMobile = (usersWithMobile / totalUsers) * 100;
        
        res.status(200).json({
            totalUsers,
            usersWithMobile,
            percentageWithMobile: percentageWithMobile.toFixed(2),
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};