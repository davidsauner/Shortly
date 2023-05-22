import { Router} from "express"
import UserRouter from "./auth.routes.js"
import UrlRouter from "./url.routes.js"
import RankingRouter from "./user.routes.js"

const router = Router()

router.use(UserRouter)
router.use(UrlRouter)
router.use(RankingRouter)

export default router