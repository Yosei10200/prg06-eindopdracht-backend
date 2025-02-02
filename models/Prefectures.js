import mongoose from 'mongoose';

const prefectureSchema = new mongoose.Schema({
    name: {type: String, required:true},
    description: {type: String, required:true},
    region: {type: String, required:true},
    author: {type: String, required:true},
    image: {type: String, required:false}
},{
    toJSON:{
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {

            ret._links ={
                self: {
                    href: process.env.BASE_URL+"/prefectures/"+ret._id
                },
                collection: {
                    href: process.env.BASE_URL+"/prefectures"
                }
            }
            delete ret._id
        }
    }
});

const Prefectures = mongoose.model('Prefectures', prefectureSchema);
export default Prefectures;