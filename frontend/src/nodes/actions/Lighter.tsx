export type TradingMetaData = {
   type: "Long" | "Short";
   qty: number;
   symbol: string;
}

export const Lighter = ({ data }: {
    data: {
        metaData: TradingMetaData;
    },
}) => {
    return (
        <div className="p-4 border">
            <h1>Lighter</h1>
            <p>Type: {data.metaData.type}</p>
            <p>Qty: {data.metaData.qty}</p>
            <p>Symbol: {data.metaData.symbol}</p>
        </div>
    )
}
