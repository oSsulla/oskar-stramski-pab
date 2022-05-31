import mongoose, { Document, Schema } from "mongoose";

export interface IGra {
    nazwa: string;
    sklep: string;
}

export interface IGraModel extends IGra, Document {}

const GraSchema: Schema = new Schema(
    {
        nazwa: { type: String, required: true },
        sklep: { type: Schema.Types.ObjectId, required: true, ref: 'Sklep' }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default mongoose.model<IGraModel>('Gra', GraSchema);