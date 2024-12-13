import User from './models/user.js'
import bcrypt from 'bcrypt'

const userLogin = async (email,password) =>{
   try{
        const user = await User.findOne({email})
        if(!user){
            return { success: false, message: 'User not found' }
        }
        
        const passwordMatch = await bcrypt.compare(password, user.password)
        console.log(passwordMatch)

        if(passwordMatch){
            return { success: true, message: 'Login successful', user }
        }else{
            return { success: false, message: 'Entered password is incorrect', user }
        }
    }
    catch (err) {
        return {success:false, message:'something went wrong',err:err}
    }
}


const passwordReset = async (email,password,confirmPassword) => {
    password = await bcrypt.hash(password,10)
    const user = await User.findOneAndUpdate({email},{password:password,confirmPassword:confirmPassword})
    if(!user){
        return {success:false,message:"User not found"}
    }
    if(user){
        return{success:true,message:"Password changed"}
    }
    else{
        return {success: false, message:"Password not changed"}
    }
}

const sameEmailValidation = async (email) => {
    try {
        const findEmail = await User.findOne({email})
        if(findEmail){
            return {email: findEmail.email, message : "The email already exists."}
        }
        else{
            return {email : false, message: null}
        }
    } catch (err) {
        return {success:false, message:'something went wrong'}
    }
    
}

const otherValidations = async (name,email,age,password,confirmPassword) => {
    try {
        if(name === undefined){
            return {success: true, message: "The name field of the user should not be empty"}
        }
        else if(email === undefined){
            return {success: true, message: "The email field of the user should not be empty"}
        }
        else if(age === undefined){
            return {success: true, message: "The age field of the user should not be empty"}
        }
        else if(password === undefined || confirmPassword === undefined){
            return {success: true, message: "The password or confirmPassword field of the user should not be empty"}
        }
        else{
            return {success:false}
        }
    } catch (err) {
        return {success:false, message:'something went wrong'}
    }
    
}

export  {userLogin,passwordReset,sameEmailValidation,otherValidations}