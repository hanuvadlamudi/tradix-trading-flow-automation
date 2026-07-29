import { Handle, Position } from "@xyflow/react"
import type { PriceTriggerNodeMetaData } from "@tradix/common"

export function PriceTrigger({
  data,
}: {
  data: { metaData: PriceTriggerNodeMetaData }
}) {
  return (
    <div className="min-w-[160px] rounded-lg border border-border bg-card px-3 py-2.5 shadow-xs">
      <p className="text-xs text-muted-foreground">Price trigger</p>
      <p className="mt-0.5 text-sm font-medium">
        {data.metaData.asset} · ${data.metaData.price}
      </p>
      <Handle type="source" position={Position.Right} className="!size-2 !bg-foreground" />
    </div>
  )
}
