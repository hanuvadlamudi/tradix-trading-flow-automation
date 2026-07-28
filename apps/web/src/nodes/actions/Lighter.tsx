import { Handle, Position } from "@xyflow/react"
import type { TradingMetaData } from "@tradix/common"

export const Lighter = ({ data }: {
    data: {
        metaData: TradingMetaData;
    },
}) => {
    return (
        <div className="p-4 border">
            <Handle type="target" position={Position.Left} />
            <h1>Lighter</h1>
            <p>Type: {data.metaData.type}</p>
            <p>Qty: {data.metaData.qty}</p>
            <p>Symbol: {data.metaData.symbol}</p>
            <Handle type="source" position={Position.Right} />
        </div>
    )
}
