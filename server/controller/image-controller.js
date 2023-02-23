import Image from "../model/image-model.js";
import User from "../model/User-model.js";
import multerS3 from "multer-s3";
import multer from "multer"
import aws from "aws-sdk";
import mongoose from "mongoose";
import * as dotenv from "dotenv"

dotenv.config()

const s3 = new aws.S3({
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRETACCESS_KEY,
    region: process.env.S3_BUCKET_REGION,
});

const storage = multerS3({
    s3:s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read",
    metadata: function(req,file,cb){
        cb(null,{fieldName: file.fieldname})
    },
    key: function(req,file,cb){
        cb(null,`${file.originalname}-${Date.now().toString()}`)
    }
})

const filefilter = (req,file,cb) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/webp"){
        cb(null,true)
    } else {
        cb(null,false)
    }
};

export const upload = multer({storage: storage, fileFilter: filefilter})


export const postImage = async(req,res) => {
    try{
        const image = new Image({
            label: req.body.label,
            imagePath: req.file.location,
            owner: req.body.owner
        })
        const result = await image.save()
        const user = await User.findOneAndUpdate(
            {_id: req.body.owner},
            {$push: {posts: result._id}},
            {new:true}
        )
        res.status(200).send({
            user:user,
            _id: result._id,
            label: result.label,
            imagePath: result.imagePath,
            owner: result.owner,
        })
    }catch(err){
        return res.status(400).json({msg: "Something went wrong."})
    }
}

export const getImages = async(req,res) => {
    try{
        const images = await Image.find();
        res.status(200).json(images);
    }catch(err){
        return res.status(400).json({msg: "Couldn't get the data. Try again later."})
    }
}

export const getSingleImage = async(req,res) => {
    const imageId = mongoose.Types.ObjectId(req.params.id)
    try{
        const image = await Image.findById(imageId);
        if(!image){
            return res.status(404).json("Can't find the image");
        }
        res.json(image)
    }catch(err){
        return res.status(500).json({error: err.message})
    }
}

export const deleteImage = async(req,res) => {
    const imageId = mongoose.Types.ObjectId(req.params.id);
    try{
        const image = await Image.findById(imageId);
        const user = await User.findById(mongoose.Types.ObjectId(image.owner))
        if(!image){
            return res.status(404).json({msg: "Image not found"});
        }
        if (image.owner !== user){
            return res.status(403).json({msg: "You don't have the permission to delete this image."})
        }
        await image.deleteOne();
        res.status(200).json({msg: "Image deleted successfully."});
    }catch(err){
        return res.status(500).json({error:err.message});
    }
}

