import { Handle, Position } from "@xyflow/react"
import type { TimerNodeMetaData } from "@tradix/common"

export function Timer({
  data,
}: {
  data: { metaData: TimerNodeMetaData }
}) {
  return (
    <div className="min-w-[160px] rounded-lg border border-border bg-card px-3 py-2.5 shadow-xs">
      <p className="text-xs text-muted-foreground">Timer</p>
      <p className="mt-0.5 text-sm font-medium">
        Every {data.metaData.time}s
      </p>
      <Handle type="source" position={Position.Right} className="!size-2 !bg-foreground" />
    </div>
  )
}
