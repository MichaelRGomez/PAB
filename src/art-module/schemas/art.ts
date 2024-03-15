//3rd party import
import mongoose, {Schema} from "mongoose";

const { ObjectId } = Schema.Types;

//Interface type for Art Document
export type Art = {
    id: string;
    title: string;
    file: string | null; 
    caption?: string | null;
    tags?: string[];
    createdAt: Date;
}

//New version
export type NewArt = Omit<Art, 'id'>;

//Art Schema
const ArtSchema: Schema = new Schema({
    title: { type: String, required: true},
    file: { type: ObjectId, required: true, ref: 'Files'},
    caption: {type: String, required: false},
    tags: { type: [String], required: false},
},{timestamps: true, collection: 'Art', toJSON: {virtuals: true}, toObject: {virtuals: true}});

//Virtuals
ArtSchema.virtual('public_art',{
    ref: 'Files',
    localField: 'file',
    foreignField: '_id',
    justOne: true,
});

const ArtModel = mongoose.model<Art>('Art', ArtSchema);

export default ArtModel;

