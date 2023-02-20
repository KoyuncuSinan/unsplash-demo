const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            required: true,
            min: 2,
            max: 50,
            unique: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            max: 50,
        },
        password:{
            type: String,
            required: true,
            min: 5,
            max: 20,
        },
        posts:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Image"
            }
        ]
    }
)

const User = mongoose.model("User", UserSchema);
export default User;