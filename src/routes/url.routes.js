import {Router} from 'express'
import { userValidate } from '../middlewares/ValidateSchema.js';
import {UrlShorten,getUrlId,openUrl,deleteUrl} from "../controllers/Url.js"
import urlSchema from "../models/urlSchema.js"
import { validateJoi } from '../middlewares/ValidateJoi.js';
const router = Router();

router.post('/urls/shorten',validateJoi(urlSchema) ,userValidate,UrlShorten);   
router.get('/urls/:id',getUrlId)
router.get('/urls/open/:shortUrl',openUrl)
router.delete('/urls/:id', deleteUrl)

export default router;