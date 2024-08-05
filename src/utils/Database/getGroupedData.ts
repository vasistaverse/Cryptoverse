import Coins from "@/models/coins";
const getGroupedPriceData = async () => {
    try {
      const priceData = await Coins.aggregate([
        {
          $sort: { createdAt: -1 },
        },
        {
          $group: {
            _id: "$code",
            prices: { $push: "$$ROOT" },
          },
        },
        {
          $project: {
            code: "$_id",
            prices: { $slice: ["$prices", 20] },
          },
        },
        {
          $unwind: "$prices",
        },
        {
          $replaceRoot: { newRoot: "$prices" },
        },
      ]).exec();
  
      return priceData;
    } catch (error) {
      console.error("Error fetching grouped price data:", error);
      throw error;
    }
  };

  export default getGroupedPriceData;