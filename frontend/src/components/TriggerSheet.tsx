import { NodeKind } from "./CreateWorkFlow";
import { Button } from "./ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useState } from "react";
import { NodeMetaData } from "./CreateWorkFlow";
import { TimerNodeMetaData } from "@/nodes/triggers/Timer";
import { PriceTriggerNodeMetaData } from "@/nodes/triggers/PriceTrigger";
import { Input } from "./ui/input";
import { Label } from "./ui/label";


const SUPPORTED_TRIGGERS = [{
    id: "timer-trigger" as const,
    title: "Timer",
    description: "Run this trigger every x sec/min",
}, {
    id: "price-trigger" as const,
    title: "Price Trigger",
    description: "Runs whenever price goes above or below a certain threshold"
}]

const SUPPORTED_ASSETS = [
    { id: "BTC", title: "BTC" },
    { id: "ETH", title: "ETH" },
    { id: "SOL", title: "SOL" },
]

export const TriggerSheet = ({
    onSelect
}: { onSelect: (kind: NodeKind, metadata: NodeMetaData) => void }) => {

    const [metaData, setMetaData] = useState<TimerNodeMetaData | PriceTriggerNodeMetaData>({
        time: 3600,
    });

    const [selectedTrigger, setSelectedTrigger] = useState<NodeKind | null>(null);

    const handleTriggerChange = (value: string) => {
        const kind = value as NodeKind;
        setSelectedTrigger(kind);

        if (kind === "timer-trigger") {
            setMetaData({ time: 3600 });
        } else if (kind === "price-trigger") {
            setMetaData({ asset: "BTC", price: 0 });
        }
    };

    return (
        <div>
            <Sheet >
                <SheetTrigger render={<Button variant="outline" />}>
                    Open
                </SheetTrigger>


                <SheetContent side="right">
                    <SheetHeader>

                        <SheetTitle>Select Trigger</SheetTitle>

                        <SheetDescription>
                            Select a trigger for your workflow.
                        </SheetDescription>

                        <Select
                            value={selectedTrigger ?? undefined}
                            onValueChange={handleTriggerChange}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a trigger" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {SUPPORTED_TRIGGERS.map(({ id, title }) => (
                                        <SelectItem
                                            key={id}
                                            value={id}
                                        >
                                            {title}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        {selectedTrigger === "timer-trigger" && (
                            <div className="flex flex-col gap-2 pt-2">
                                <Label htmlFor="timer-seconds">Every (seconds)</Label>
                                <Input
                                    id="timer-seconds"
                                    type="number"
                                    value={"time" in metaData ? metaData.time : 3600}
                                    onChange={(e) =>
                                        setMetaData({ time: Number(e.target.value) || 0 })
                                    }
                                />
                            </div>
                        )}

                        {selectedTrigger === "price-trigger" && (
                            <div className="flex flex-col gap-3 pt-2">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="price">Price</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={"price" in metaData ? metaData.price : 0}
                                        onChange={(e) =>
                                            setMetaData((prev) => ({
                                                asset: "asset" in prev ? prev.asset : "BTC",
                                                price: Number(e.target.value) || 0,
                                            }))
                                        }
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label>Asset</Label>
                                    <Select
                                        value={"asset" in metaData ? metaData.asset : undefined}
                                        onValueChange={(asset) =>
                                            setMetaData((prev) => ({
                                                price: "price" in prev ? prev.price : 0,
                                                asset,
                                            }))
                                        }
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select an asset" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {SUPPORTED_ASSETS.map(({ id, title }) => (
                                                    <SelectItem key={id} value={id}>
                                                        {title}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        )}

                    </SheetHeader>

                    <SheetFooter>
                        <Button
                            type="button"
                            onClick={() => {
                                if (!selectedTrigger) return;
                                onSelect(selectedTrigger, metaData);
                            }}
                        >
                            Create Trigger
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}
