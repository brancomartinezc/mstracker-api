import { Router } from "express";

import verifyToken from "../middlewares/authJwt";
import * as toWatchCtrl from "../controllers/toWatch.controller";

const router = Router();

router.get('/', verifyToken, toWatchCtrl.getMSToWatch);

router.post('/', verifyToken, toWatchCtrl.addMSToWatch);

router.delete('/:msId', verifyToken, toWatchCtrl.removeMSToWatch);

export default router;