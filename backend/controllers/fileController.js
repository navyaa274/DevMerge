export const updateFiles = async (req, res) => {
    try {
        // Parsing body data
        const {files} = req.body;

        // Parsing id
        const id = req.params.id

        // Finding user
        const user = await User.findById(id)

        // Checking user
        if(!user){
            return res.status(404).json({
                success: false,
                message: "No user found"
            })
        }

         // Directory where files will be saved
         const directoryPath = path.join(__dirname,'..', 'user_files');

         // Ensure the directory exists
         if (!fs.existsSync(directoryPath)) {
             fs.mkdirSync(directoryPath, { recursive: true });
         }

        // Updating files and creating new files on the file system
        if (files && Array.isArray(files)) {
            files.forEach(file => {
                const filePath = path.join(directoryPath, file.name);

                // Write file data to the file system
                // fs.writeFileSync(filePath, file.dataType); // file.dataType will store in DB and file both
                fs.writeFileSync(filePath, file.content); //Stores content only on file

                // Add file metadata to user's files array
                user.files.push({
                    name: file.name,
                    dataType: file.dataType
                });
            });
        }

        await user.save();

        // Sending response
        res.status(200).json({
            success: true,
            message: "File created sucessfully"
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getFiles = async (req, res) => {
    try {
        // Parse id
        const id = req.params.id

        // Find user by id
        const user = await User.findById(id)

        // Checking conditions
        if(!user){
            return res.status(404).json({
                success: false,
                message: "No user found"
            })
        }

        // Send response
        res.status(200).json({
            success: true,
            files: user.files
        })
        
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteFile = async (req, res) => {
    try {
        // Parsing user ID and file name from request
        const { id, fileName } = req.params;

        // Finding user
        const user = await User.findById(id);

        // Checking if user exists
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No user found"
            });
        }

        // Debugging: log the file name and the user's files array
        console.log("Requested file to delete:", fileName);
        console.log("User's stored files:", user.files.map(f => f.name));

        // Check if the file exists in the user's files array
        const fileIndex = user.files.findIndex(file => file.name.toLowerCase() === fileName.trim().toLowerCase());

        if (fileIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "File not found in user's files"
            });
        }

        // Remove the file from the user's files array
        user.files.splice(fileIndex, 1);

        // // Path to the file in the filesystem
        // const filePath = path.join(__dirname, '..', 'newFiles', fileName);
        // console.log("File path to delete:", filePath); // Log file path

        // // Check if the file exists in the file system
        // if (fs.existsSync(filePath)) {
        //     // Remove the file from the file system
        //     fs.unlinkSync(filePath);
        // } else {
        //     return res.status(404).json({
        //         success: false,
        //         message: "File not found on the server"
        //     });
        // }

        // Save the updated user document in the database
        await user.save();

        // Sending response
        res.status(200).json({
            success: true,
            message: "File deleted successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};