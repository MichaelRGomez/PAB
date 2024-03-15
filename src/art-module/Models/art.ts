import ArtModel, { Art, EditArt, NewArt } from "../schemas/art";

export default class Arts{
    //CREATE
    static async create(data: NewArt): Promise <Art>{
        return await ArtModel.create(data);
    };

    //READ
    static async getById(id: string): Promise<Art | null>{
        return await ArtModel.
        findById(id)
        .populate({path: 'Files'});
    };

    static async getAll():Promise<Art[]>{
        const folder: Art[] = await ArtModel.find()
        .populate({path: 'Files'});
        return folder;
    };

    static async getAllByTags(tagArr: string[]):Promise<Art[]>{
        const folder: Art[] = await ArtModel.find({tags: {$in: tagArr}}).
        populate({path: 'Files'});
        return folder;
    }

    //UPDATE
    static async update(id: string, data: EditArt): Promise <Art | null>{
        return await ArtModel.findByIdAndUpdate(id, data);
    }

    //the following function should only be used by the casDelete function in ./models/Tags.ts
    static async removeTag(tagToBeRemoved: string, art: Art): Promise<Art | null>{
        const { id } = art;
        const oldTags: string[] = art.tags!;
        const newTags: string[] = oldTags.filter(el => el !== tagToBeRemoved);
        art.tags = newTags;

        return await ArtModel.findByIdAndUpdate(id, art);
    }

    //DELETE
}