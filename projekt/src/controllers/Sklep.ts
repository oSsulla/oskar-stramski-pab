import { NextFunction, Request, response, Response } from "express";
import mongoose from "mongoose";
import Sklep from "../models/Sklep";

const createSklep = (req: Request, res: Response, next: NextFunction) => {
    const { nazwa } = req.body;

    const sklep = new Sklep({
        _id: new mongoose.Types.ObjectId(),
        nazwa
    });

    return sklep
        .save()
        .then((sklep) => res.status(201).json({ sklep }))
        .catch((error) => res.status(500).json({ error }));
};

const readSklep = (req: Request, res: Response, next: NextFunction) => {
    const sklepId = req.params.sklepId;

    return Sklep.findById(sklepId)
        .then((sklep) => (sklep ? res.status(200).json({ sklep }) : res.status(404).json({ message: 'nie znaleziono' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Sklep.find()
        .then((sklepy) => res.status(200).json({ sklepy }))
        .catch((error) => res.status(500).json({ error }));
};

const updateSklep = (req: Request, res: Response, next: NextFunction) => {
    const sklepId = req.params.sklepId;

    return Sklep.findById(sklepId)
        .then((sklep) => {
            if(sklep)
            {
                sklep.set(req.body);

                return sklep
                    .save()
                    .then((sklep) => res.status(201).json({ sklep }))
                    .catch((error) => res.status(500).json({ error }));
            }
            else
            {
                res.status(404).json({ message: 'nie znaleziono' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteSklep = (req: Request, res: Response, next: NextFunction) => {
    const sklepId = req.params.sklepId;

    return Sklep.findByIdAndDelete(sklepId)
        .then(sklep => (sklep ? res.status(201).json({ message: 'usunięto' }) : res.status(404).json({ message: 'nie znaleziono' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createSklep, readSklep, readAll, updateSklep, deleteSklep };
