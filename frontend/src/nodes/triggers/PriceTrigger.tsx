import { Handle, Position } from "@xyflow/react"

export type PriceTriggerNodeMetaData = {
    asset: string;
    price: number;
};

export const PriceTrigger = ({data , isConnectable} :{ 
    data : {
        metaData : PriceTriggerNodeMetaData;
    },
    isConnectable : boolean;
}) => {

    return (
        <div className="p-4 border">
            {data.metaData.asset}
            {data.metaData.price}
            <Handle type="source" position={Position.Right}  />

        </div>
    )
}