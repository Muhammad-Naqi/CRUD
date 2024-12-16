import User from './models/user.js';
import bcrypt from 'bcrypt'
const userLogin = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return { success: false, message: 'User not found' };
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(passwordMatch)

        if (passwordMatch) {
            return { success: true, message: 'Login successful', user };
        } else {
            return { success: false, message: 'Entered password is incorrect' };
        }
    } catch (err) {
        return { success: false, message: 'Something went wrong', error: err };
    }
};

const passwordReset = async (email, password, confirmPassword) => {
    try {
        if (password !== confirmPassword) {
            return { success: false, message: 'Passwords do not match' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findOneAndUpdate(
            { email },
            { password: hashedPassword }
        );

        if (!user) {
            return { success: false, message: 'User not found' };
        }

        return { success: true, message: 'Password changed successfully' };
    } catch (err) {
        return { success: false, message: 'Something went wrong', error: err };
    }
};

const sameEmailValidation = async (email) => {
        console.log(email,"asa")
        const existingUser = await User.findOne({ email });
        console.log(existingUser.email)
        if (existingUser.email === email) {
            return { success: false, message: 'The email already exists.' };
        }else{
            return { success: false };
        }
};

const otherValidations = async (name, email, age, password, confirmPassword) => {
        if (!name) {
            return { success: false, message: 'The name field cannot be empty' };
        }
        else if (!email) {
            return { success: false, message: 'The email field cannot be empty' };
        }
        else if (!age) {
            return { success: false, message: 'The age field cannot be empty' };
        }
        else if (!password || !confirmPassword) {
            return {
                success: false,
                message: 'The password and confirmPassword fields cannot be empty',
            };
        }else {
            return {success: false}
        }
};

export { userLogin, passwordReset, sameEmailValidation, otherValidations };
