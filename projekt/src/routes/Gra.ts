import express from "express";
import controller from "../controllers/Gra";

const router = express.Router();

router.post('/create', controller.createGra);
router.get('/get/:graId', controller.readGra);
router.get('/get/', controller.readAll);
router.patch('/update/:graId', controller.updateGra);
router.delete('/delete/:graId', controller.deleteGra);

export = router;