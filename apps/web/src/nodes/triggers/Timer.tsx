import { Handle, Position } from "@xyflow/react"
import type { TimerNodeMetaData } from "@tradix/common"

export const Timer = ({data } :{ 
    data : {
        metaData : TimerNodeMetaData;
    },
    isConnectable : boolean;
}) => {

    return (
        <div className="p-4 border">

            Every {data.metaData.time / 3600} Seconds
            <Handle type="source" position={Position.Right}  />

        </div>
    )
}
