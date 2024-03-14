//3rd party import
import mongoose, {Schema} from "mongoose";

//Interface type for Tag Document
export type Tag ={
    id: string;
    name: string;
    dead: boolean;
}

//New Version
export type NewTag = Omit<Tag, 'id'>;

//Tag Schema
const TagSchema: Schema = new Schema({
    name: {type: String, required: true},
    dead: {type: Boolean, required: true},
}, {collection: 'Tag'});

const TagModel = mongoose.model<Tag>('Tag', TagSchema);

export default TagModel;