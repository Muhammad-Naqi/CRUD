import User from '../models/user.js';
import {userLogin,passwordReset,sameEmailValidation,otherValidations} from '../helper.js'
import bcrypt from 'bcrypt';
const createUser = async (req, res) => {
    try {
        const userBody = req.body;

        const validationCheck = await otherValidations(
            userBody.name,
            userBody.email,
            userBody.age,
            userBody.password,
            userBody.confirmPassword
        );

        const emailValidation = await sameEmailValidation(userBody.email);

       
        if (validationCheck.success) {
            return res.status(404).json({ message: validationCheck.message }); // Add return
        }
        else if (emailValidation) {
            return res.status(401).json({ message: emailValidation.message });
        }

        userBody.password = await bcrypt.hash(userBody.password, 10);

        const user = await User.create(userBody);
        if (user) {
            return res.json(user);
        } else {
            return res.json({ message: "User was not created" });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
};


const getAllusers = async (req, res) => {

    try{      
        const users = await User.find();
        if(users){
            res.json(users)
        }else{
            res.status(404).json({message: "User not found"})
        }
    }
    catch (err){
        res.status(500).json({message: 'something went wrong'});
    }
}

const getUserById = async (req, res) =>{
    const userId = req.params._id;
    try{
        const user = await User.findById(userId);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'user not found' });
        }
    }
    catch (err) {
        res.status(500).json({message:'something went wrong'})
    }
}

const deleteUser = async (req, res) =>{
    try{
        const userId = req.params._id;

        const deletedUser = await User.findByIdAndDelete(userId);
        
        if (deletedUser) {
            res.json({message: 'User deleted successfully'})
        }
        else{
            res.status(404).json({message: 'User not found'})
        }
    }
    catch{
        res.status(500).json({message: 'something went wrong'})
    }
}

const updateUser = async (req, res) => {
    const userId = req.params._id
    const data = req.body
    try{
        if(data.password){
            data.password = await bcrypt.hash(data.password,10)
        }
       
        const update = await User.findByIdAndUpdate(userId,data)
        if(update){
            res.json({message:"User is updated"})
        }
        else{
            res.status(404).json({message: "User not found"})
        }
    }
    catch{
        res.status(500).json({message:"Something went wrong"})
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const result = await userLogin(email, password);
    
    if (result.success) {
        res.json({ message: result.message, user: result.user });
    } else {
        res.status(401).json({ message: result.message });
    }
};

const reset = async (req,res) => {
    const {email,password,confirmPassword} = req.body
    const result = await passwordReset(email,password,confirmPassword)
    if(result.success){
        res.json({ message: result.message, user: result.user })
    }
    else{
        res.status(401).json({ message: result.message , err: result.err})
    }
}


export {
    createUser,
    getAllusers,
    getUserById,
    deleteUser,
    updateUser,
    login,
    reset
}