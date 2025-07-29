import userModel from "../models/userModel.js";

export const getUserData = async (req, res)=> {
    try {
        console.log('req.body:', req.body);
        const {userId} = req.body;
        console.log('userId:', userId);

        if (!userId) {
            return res.json({ success: false, message: 'User ID not provided' });
        }

        const user = await userModel.findById(userId);
        if (!user){
            return res.json({ success: false, message: 'User not found' })
        }

        res.json({
            success: true,
            userData: {
                name: user.name,
                isAccountVerified: user.isAccountVerified
            }
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}