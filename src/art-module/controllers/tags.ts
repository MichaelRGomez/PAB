//3rd Party imports
import { Request, Response } from "express"
import { 
    failedCreate,
    noResource,
    serverError, 
    successfulCreate, 
    successfulDelete, 
    wrongFormat 
} from "../../utils/database/mongo/json-messages";
import { Tag, NewTag } from "../schemas/tag";
import Tags from "../models/tag";

export const newTag = async (req: Request, res: Response) => {
    try{
        //format checking
        if(req.body.name === undefined || req.body.name == null){
            return res.status(400).json(wrongFormat);
        }

        //Valid format

        const newTag: NewTag = {
            name: req.body.name,
            dead: false,
        }

        const createdTag: Tag | null = await Tags.create(newTag);
        if(createdTag === null){
            return res.status(500).json(failedCreate);
        }
        return res.status(200).json(successfulCreate);
    } catch (error: any){
        console.log(error);
        return res.status(500).json(serverError);
    }
}

export const deleteTag = async (req: Request, res: Response) => {
    try {
        const { tagId } = req.body.tagId;

        //Format checking
        if( tagId === undefined || tagId === null){
            return res.status(400).json(wrongFormat);
        }

        const mark: Tag | null = await Tags.getById(tagId);
        if(mark === null){
            return res.status(404).json(noResource)
        }

        const result: boolean = await Tags.casDelete(tagId)
        if(result){
            return res.status(200).json(successfulDelete);
        }
        return res.status(500).json(serverError);
    } catch (error: any){
        console.log(error);
        return res.status(500).json(serverError);
    }
}

