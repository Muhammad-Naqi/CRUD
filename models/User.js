import { mongoose } from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
      type: String, 
      required: true,
    }, 
    age: {
      type: Number, 
      required:true,
      min: 1,
      max:110},
    email: {
      type: String, 
      required: true, 
      lowercase:true,
      isEmail: true
    },
    password: {
      type: String, 
      required: true, 
      min: 8, 
      lowercase: true
    },
    confirmPassword: {
      type: String, 
      required: true, 
      min: 8, 
      lowercase: true
    },
    createdDate: { 
      type: Date, 
      default: () => Date.now(), 
      immutable: true 
    },
  });

const User = mongoose.model('User', userSchema)

export default User