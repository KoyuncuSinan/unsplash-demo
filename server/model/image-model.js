const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema(
    {
        label:{
            type: String,
            required: true,
            min: 2,
            max: 200,
        },
        imagePath:{
            type: String,
            required: true,
        },
        owner:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    }
)

const Image = mongoose.model("Image",ImageSchema);
export default Image;