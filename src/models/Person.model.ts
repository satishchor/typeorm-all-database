import * as mongoose from 'mongoose';

const PersonSchema = new mongoose.Schema({
    objecid: String,
    name: String
},
    {
        strict: true,
        collection: 'Person'
    }
);

const PersonModel = mongoose.model<mongoose.Document>('Person_Schema', PersonSchema);
export default PersonModel;