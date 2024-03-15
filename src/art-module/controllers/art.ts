//3rd Party imports
import { Request, Response } from "express"
import { 
    failedCreate,
    failedEdit,
    noFileAttached,
    serverError, 
    successfulCreate, 
    successfulEdit, 
    wrongFormat 
} from "../../utils/database/mongo/json-messages";
import { Art, EditArt, NewArt } from "../schemas/art";
import Arts from "../models/art";

//Art Handlers
export const newArt = async ( req: Request, res: Response) => {
    try{
        
        //format checking
        if(req.body.title === undefined || req.body.title === null){
            return res.status(400).json(wrongFormat)
        }

        if(req.body.file === undefined || req.body.file === null){
            return res.status(500).json(noFileAttached)
        }
        
        //Valid format

        const newArt: NewArt = {
            title: req.body.title,
            file: req.body.file,
            caption: req.body.caption,
            tags: req.body.tags,
        };

        const created: Art | null = await Arts.create(newArt);
        if(created === null){
            return res.status(500).json(failedCreate);    
        }

        return res.status(200).json(successfulCreate);
    } catch (error: any){
        console.log(error);
        return res.status(500).json(serverError);
    }
};

export const editArt = async ( req: Request, res: Response) => {
    try{
        const { artId } = req.body.artId;
        
        //format checking
        if(artId === undefined || artId === null){
            return res.status(400).json(wrongFormat);
        }

        const alteredArt: EditArt = {
            title: req.body.title,
            file: req.body.file,
            caption: req.body.caption,
            tags: req.body.tags,
        }

        const updatedArt: Art | null = await Arts.update(artId, alteredArt);
        if(updatedArt === null){
            return res.status(500).json(failedEdit); 
        }

        return res.status(200).json(successfulEdit);
    } catch (error: any){
        console.log(error);
        return res.status(500).json(serverError);
    }
}