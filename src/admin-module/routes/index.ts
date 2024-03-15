//3rd party imports
import { Router } from 'express';
import { editArt, newArt } from '../../art-module/controllers/art';
import { deleteTag, newTag } from '../../art-module/controllers/tags';

const router: Router = Router();

//Powers endpoint
router.post('/Art/add', newArt);
router.patch('/Art/alter', editArt);
router.post('/Tag/add', newTag);
router.delete('/Tag/del', deleteTag);
export default router;