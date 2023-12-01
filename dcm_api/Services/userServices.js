const userModel = require('../models/User')

const getUsers = async () => {
   const users = await userModel.find({}, '-password')
   return users
}

const getUser = async (id) => {
   const user = await userModel.findById(id, '-password')
   return user;
}

const getUserByEmail = async (email) => {
   const user = await userModel.findOne({email: email})
   return user;
}

const register = async (user) => {
   const newUser = new userModel(user);
   const addUser = await newUser.save()
   const utilisateur = await getUser(addUser._id)
   return utilisateur;
}

const updateUser = async (id, user) => {
   try {
      const upUser = await userModel.findByIdAndUpdate(id, user)
      const utilisateur = await getUser(upUser._id)
      return utilisateur;
   } catch (error) {
      return error
   }
}

const deleteUser = async (id) => {
   const delUser = await userModel.findByIdAndDelete(id)
   return delUser;
}

module.exports= {
   getUsers,
   getUser,
   getUserByEmail,
   register,
   updateUser,
   deleteUser
}