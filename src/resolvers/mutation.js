const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const gravatar = require("../util/gravatar")
const {
    AuthenticationError,
    ForbiddenError
} = require("apollo-server-express")
require("dotenv").config()

module.exports = {
    newNote: async (parent, args, {models, user}) => {
        if (!user) {
            throw new AuthenticationError('You must be signed in to create a note');
        }
    
        if (!mongoose.Types.ObjectId.isValid(user.id)) {
            throw new Error('Invalid user ID');
        }
    
        return await models.Note.create({
            content: args.content,
            author: user.id,
            favoriteCount: 0
        });
    },
    deleteNote: async (parent, {id}, {models, user}) => {
        if(!user){
            throw new AuthenticationError('You must be signed in to create a note')
        }

        const note = await models.Note.findById(id);
        
        if(note && String(note.author) != user.id){
            throw new ForbiddenError("You don't have permission to delete the note");
        }
        
        try {
            await models.Note.findOneAndDelete({_id: id});
            return true;
        }catch (err){
            return false;
        }
    },
    updateNote: async (parent, {content, id}, {models, user}) => {
        if(!user){
            throw new AuthenticationError('You must be signed in to create a note')
        }

        const note = await models.Note.findById(id);
        
        if(note && String(note.author) != user.id){
            throw new ForbiddenError("You don't have permission to delete the note");
        }
        return await models.Note.findOneAndUpdate(
            {
                _id: id
            },
            {
                $set: {
                    content
                }
            },
            {
                new: true
            }
        )
    },
    signUp: async (parent, {username, email, password}, {models}) => {
        email = email.trim().toLowerCase();
        const hashed = await bcrypt.hash(password, 10);
        const avatar = gravatar(email);

        try {
            const user = models.User.create({
                username,
                email,
                avatar,
                password: hashed

            });

            return jwt.sign({id: user._id}, process.env.JWT_SECRET);
        }catch(err){
            console.log(err);
            throw new Error('Error creating account')
        }
    },
    signIn: async (parent, {username, email, password}, {models}) => {
        if(email) {
            email = email.trim().toLowerCase();
        }

        const user = await models.User.findOne({
            $or: [{email}, {username}]
        });

        if(!user){
            throw new AuthenticationError('Error signing in');
        }

        const valid = await bcrypt.compare(password, user.password);
        
        if(!valid){
            throw new AuthenticationError('Error signing in');
        }
        return jwt.sign({id: user._id}, process.env.JWT_SECRET);
    },
    toggleFavorite: async (parent, {id}, {models, user}) => {
        if(!user){
            throw new AuthenticationError();
        }

        let noteCheck = await models.Note.findById(id);
        const hasUser = noteCheck.favoritedBy.indexOf(user.id);

        if(hasUser >= 0){
            return await models.Note.findByIdAndUpdate(
                id,
                {
                    $pull: {
                        favoritedBy: new mongoose.Types.ObjectId(user.id)
                    },
                    $inc: {
                        favoriteCount: -1
                    }
                },
                {
                    new: true
                }
            );
        }else{
            return await models.Note.findByIdAndUpdate(
                id,
                {
                    $push: {
                        favoritedBy: new mongoose.Types.ObjectId(user.id)
                    },
                    $inc: {
                        favoriteCount: 1
                    }
                },
                {
                    new: true
                }
            );
        }

    }


}