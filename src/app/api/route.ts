import connectToDB from "../../utils/db";
import Coins from "@/models/coins";
import { CryptoData } from "@/interfaces/prices";
import { NextResponse } from 'next/server'




export async function GET() {    
}


const getGroupedPriceData = async () => {
    try {
      const priceData = await Coins.aggregate([
        {
          $sort: { createdAt: -1 }
        },
        {
          $group: {
            _id: "$code",
            prices: { $push: "$$ROOT" }
          }
        },
        {
          $project: {
            code: "$_id",
            prices: { $slice: ["$prices", 20] }
          }
        },
        {
          $unwind: "$prices"
        },
        {
          $replaceRoot: { newRoot: "$prices" }
        }
      ]).exec();
  
      return priceData;
    } catch (error) {
      console.error('Error fetching grouped price data:', error);
      throw error;
    }
  };
export async function POST(req: Request) {
    try{
        await connectToDB();
        const requestData = await req.json();
        const filteredCoinData = requestData.coins.map((coin: CryptoData)=> {
            return {
                symbol: coin.symbol,
                rank: coin.rank,
                name: coin.name,
                code: coin.code,
                rate: coin.rate,
                volume: coin.volume,
                cap: coin.cap,
                fiat: requestData.currancy,
                png32: coin.png32,
                png64: coin.png64,
                webp32: coin.webp32,
                webp64: coin.webp64,
                delta: coin.delta  
            }
        })
        await Coins.insertMany(filteredCoinData);
        // const priceData = await Coins.find({code: requestData.code}).sort({createdAt: -1}).limit(20).exec();
        const priceData = await getGroupedPriceData();
        return NextResponse.json({message: "success", data: priceData}, {status: 200})
    }
    catch(err: any){
        return NextResponse.json({message: err.message}, {status: 500})
    }
}
