import express from "express";
import controller from "../controllers/Sklep";

const router = express.Router();

router.post('/create', controller.createSklep);
router.get('/get/:sklepId', controller.readSklep);
router.get('/get/', controller.readAll);
router.patch('/update/:sklepId', controller.updateSklep);
router.delete('/delete/:sklepId', controller.deleteSklep);

export = router;