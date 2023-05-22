import { ranking } from "../controllers/Ranking.js"
import { Router } from 'express'


const RankingRouter = Router();

RankingRouter.get("/ranking", ranking);

export default RankingRouter;