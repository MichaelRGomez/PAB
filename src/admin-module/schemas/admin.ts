//3rd party imports
import mongoose, {Schema, Document } from 'mongoose';

export type Admin = {
    passwordHash: string;
    email: string;
}

const AdminSchema: Schema = new Schema({
    passwordHash: { type: String, required: true},
    email: { type: String, required: true},
});

const AdminModel = mongoose.model<Admin>('Admin', AdminSchema);

export default AdminModel;
