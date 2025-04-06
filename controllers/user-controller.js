import User from "../models/user-model.js";

const getUserProfile = async (req, res, next)=>{
    res.send('user profile');
}

export{
    getUserProfile
}