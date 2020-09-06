const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // password processing

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        // require: true
    },
    email: {
        unique: true, // Duy nhat
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    lastname:{
        type: String
    },
    firstname:{
        type: String
    },
    birthday:{
        type: Date,
    },
    avatar:{
        type:String
    },
    address:{
        type:String
    },
    phone:{
        type: Number,
        unique: true,
        require: true
    }

})
UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}
UserSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', UserSchema)

