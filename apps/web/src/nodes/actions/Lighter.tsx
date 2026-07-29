import { Handle, Position } from "@xyflow/react"
import type { TradingMetaData } from "@tradix/common"

export function Lighter({
  data,
}: {
  data: { metaData: TradingMetaData }
}) {
  return (
    <div className="min-w-[160px] rounded-lg border border-border bg-card px-3 py-2.5 shadow-xs">
      <Handle type="target" position={Position.Left} className="!size-2 !bg-foreground" />
      <p className="text-xs text-muted-foreground">Trade</p>
      <p className="mt-0.5 text-sm font-medium">
        {data.metaData.type} {data.metaData.symbol}
      </p>
      <p className="mt-0.5 text-xs text-muted-foreground">
        Qty {data.metaData.qty}
      </p>
      <Handle type="source" position={Position.Right} className="!size-2 !bg-foreground" />
    </div>
  )
}
