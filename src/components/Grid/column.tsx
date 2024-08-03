function formatCurrency(number: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
}
function getdate(params: Date) {
  return new Date(params).toLocaleDateString();
}
function getTime(params: Date) {
  return new Date(params).toLocaleTimeString();
}

export const columnDevs: any = [
  { field: "symbol", headerName: "symbol", flex: 0.5, maxWidth: 100, valueGetter: (params: any) => params? params : "N/A" },
  { field: "rate", headerName: "price", flex: 0.5, valueGetter: (params: any) => formatCurrency(params) },
  { field: "volume", headerName: "Volume", flex: 0.5, valueGetter: (params: any) => formatCurrency(params) },
  { field: "cap", headerName: "Market Cap", flex: 0.5, valueGetter: (params: any) => formatCurrency(params) },
  { field: "createdAt", headerName: "Time (IST)", flex: 0.5, valueGetter: (params: any) => getdate(params) + " " + getTime(params) },
];
