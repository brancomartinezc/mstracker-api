import { Router } from "express";

import verifyToken from "../middlewares/authJwt";
import * as watchedCtrl from "../controllers/watched.controller";

const router = Router();

router.get('/', verifyToken, watchedCtrl.getMSWatched);

router.post('/', verifyToken, watchedCtrl.addMSWatched);

router.post('/:watchedId', verifyToken, watchedCtrl.addMSWatchedWithId);

router.put('/:watchedId', verifyToken, watchedCtrl.editMSWatched);

router.delete('/:watchedId', verifyToken, watchedCtrl.removeMSWatched);

export default router;