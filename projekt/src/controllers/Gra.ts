import { NextFunction, Request, response, Response } from "express";
import mongoose from "mongoose";
import Gra from "../models/Gra";

const createGra = (req: Request, res: Response, next: NextFunction) => {
    const { sklep, nazwa } = req.body;

    const gra = new Gra({
        _id: new mongoose.Types.ObjectId(),
        sklep,
        nazwa
    });

    return gra
        .save()
        .then((gra) => res.status(201).json({ gra }))
        .catch((error) => res.status(500).json({ error }));
};

const readGra = (req: Request, res: Response, next: NextFunction) => {
    const graId = req.params.graId;

    return Gra.findById(graId)
        .populate('sklep')
        .select('-__v')
        .then((gra) => (gra ? res.status(200).json({ gra }) : res.status(404).json({ message: 'nie znaleziono' })))
        .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
    return Gra.find()
        .populate('sklep')
        .select('-__v')
        .then((gry) => res.status(200).json({ gry }))
        .catch((error) => res.status(500).json({ error }));
};

const updateGra = (req: Request, res: Response, next: NextFunction) => {
    const graId = req.params.graId;

    return Gra.findById(graId)
        .then((gra) => {
            if(gra)
            {
                gra.set(req.body);

                return gra
                    .save()
                    .then((gra) => res.status(201).json({ gra }))
                    .catch((error) => res.status(500).json({ error }));
            }
            else
            {
                res.status(404).json({ message: 'nie znaleziono' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteGra = (req: Request, res: Response, next: NextFunction) => {
    const graId = req.params.graId;

    return Gra.findByIdAndDelete(graId)
        .then(gra => (gra ? res.status(201).json({ message: 'usunięto' }) : res.status(404).json({ message: 'nie znaleziono' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createGra, readGra, readAll, updateGra, deleteGra };
