import { Art } from "../schemas/art";
import TagModel, {Tag, NewTag} from "../schemas/tag";
import Arts from "./art";

export default class Tags{
    //CREATE
    static async create(data: NewTag): Promise <Tag>{
        return await TagModel.create(data);
    };

    //READ
    static async getAll(): Promise<Tag[]>{
        const tagRing: Tag[] = await TagModel.find();
        return tagRing;
    }
    
    static async getAllLiving(): Promise<Tag[]>{
        const tagRing: Tag[] = await TagModel.find({ dead: false});
        return tagRing;
    }

    static async getAllDead(): Promise<Tag[]>{
        const tagRing: Tag[] = await TagModel.find({ dead: true});
        return tagRing;
    }
    //UPDATE

    //DELETE
    static async casDelete(mark: Tag): Promise<boolean>{
        //this function deletes a specified tag from all art before deleting the tag specified
        const { id, name } = mark;
        const tagClip: string[] = [ name ];

        var safetyFolder: Art[] = []
        const folder: Art[] = await Arts.getAllByTags(tagClip);
        await Promise.all(folder.map(async (a) => {
            const temp: Art | null = await Arts.removeTag(name, a);
            if (!temp){
                safetyFolder.push(a);
            }
        }));

        if(safetyFolder.length > 0){
            return false;
        }
        
        return await this.delete(id);
    }

    static async delete(id: string): Promise<boolean>{
        try{
            const count: any = await TagModel.deleteOne({ _id: id});
            if(!count){
                return false;
            }
            console.log('Tag deleted successfully');
            return true;
        } catch (error: any){
            console.error('Error deleting Tag: ', error);
            return false;
        }
    }
}