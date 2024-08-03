
import { CryptoData } from "@/interfaces/prices";
import { CryptoPriceStates } from "@/lib/state/cryptoPrice/cryptoPrice";
import { RootState } from "@/lib/store";

function sortedCryptos(item: CryptoData[],): CryptoPriceStates {
  const newData: CryptoPriceStates = {
    ETH: [],
    BNB: [],
    SOL: [],
    DOGE: [],
    BTC: [],
  }
  item.forEach(item => {
    switch(item.code){
      case "ETH":
        newData.ETH.push(item);
        break;
      case "BNB":
        newData.BNB.push(item);
        break;
      case "SOL":
        newData.SOL.push(item);
        break;
      case "DOGE":
        newData.DOGE.push(item);
        break;
      case "BTC":
        newData.BTC.push(item);
        break;
    }
  })
  return newData
}
export default sortedCryptos;
