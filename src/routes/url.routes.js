import { shortenUrl, getUrl, openUrl, deleteUrl, myUser } from "../controllers/Url.js"
import { Router } from 'express'
import { validateToken } from "../middlewares/ValidateToken.js";
import { validateSchema } from "../middlewares/ValidateSchema.js";
import shortenUrlSchema from "../model/urlSchema.js";

const UrlRouter = Router();

UrlRouter.post("/urls/shorten",validateToken, validateSchema(shortenUrlSchema), shortenUrl);
UrlRouter.get("/urls/:id", getUrl);
UrlRouter.get("/urls/open/:shortUrl", openUrl);
UrlRouter.delete("/urls/:id",validateToken, deleteUrl);
UrlRouter.get("/users/me",validateToken, myUser);

export default UrlRouter;