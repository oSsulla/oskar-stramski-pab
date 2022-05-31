import mongoose, { Document, Schema } from "mongoose";

export interface ISklep {
    nazwa: string;
}

export interface ISklepModel extends ISklep, Document {}

const SklepSchema: Schema = new Schema(
    {
        nazwa: { type: String, required: true },
        lokalizacja: { type: String, required: true }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<ISklepModel>('Sklep', SklepSchema);