import {Schema, model, models} from "mongoose";


const Delta = new Schema({
    hour: Number,
    day: Number,
    week: Number,
    month: Number,
    year: Number,
    quater: Number,
})

const coinSchema = new Schema({
    symbol: String,
    rank: Number,
    name: String,
    code: String,
    rate: Number,
    volume: Number,
    cap: Number,
    fiat: String,
    png32: String,
    png64: String,
    webp32: String,
    webp64: String,
    delta: Delta,

}, {timestamps: true});

const Coins = models.Coins || model("Coins", coinSchema);
export default Coins;