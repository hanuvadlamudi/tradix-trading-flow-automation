import { Handle, Position } from "@xyflow/react"

export type TimerNodeMetaData = {
    time: number;
};

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