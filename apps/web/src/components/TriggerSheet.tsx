import type {
  NodeKind,
  NodeMetaData,
  TimerNodeMetaData,
  PriceTriggerNodeMetaData,
} from "@tradix/common";
import {
  SUPPORTED_TRIGGERS,
  SUPPORTED_ASSETS,
  DEFAULT_TIMER_META,
  DEFAULT_PRICE_TRIGGER_META,
} from "@tradix/common";
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
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Zap } from "lucide-react";

export const TriggerSheet = ({
    onSelect
}: { onSelect: (kind: NodeKind, metadata: NodeMetaData) => void }) => {

    const [metaData, setMetaData] = useState<TimerNodeMetaData | PriceTriggerNodeMetaData>({
        ...DEFAULT_TIMER_META,
    });

    const [selectedTrigger, setSelectedTrigger] = useState<NodeKind | null>(null);

    const handleTriggerChange = (value: string) => {
        const kind = value as NodeKind;
        setSelectedTrigger(kind);

        if (kind === "timer-trigger") {
            setMetaData({ ...DEFAULT_TIMER_META });
        } else if (kind === "price-trigger") {
            setMetaData({ ...DEFAULT_PRICE_TRIGGER_META });
        }
    };

    return (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <Sheet>
                <div className="pointer-events-auto flex max-w-sm flex-col items-center gap-4 px-6 text-center">
                    <div className="flex size-12 items-center justify-center rounded-full border border-border bg-card shadow-xs">
                        <Zap className="size-5 text-foreground" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <h2 className="font-heading text-lg font-medium text-foreground">
                            Start your workflow
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Add a trigger to decide when this automation should run.
                        </p>
                    </div>
                    <SheetTrigger
                        render={
                            <Button size="lg" className="min-w-44 shadow-xs" />
                        }
                    >
                        <Zap data-icon="inline-start" className="size-4" />
                        Add trigger
                    </SheetTrigger>
                </div>

                <SheetContent side="right" className="gap-0">
                    <SheetHeader className="border-b border-border">
                        <SheetTitle>Configure trigger</SheetTitle>
                        <SheetDescription>
                            Choose how this workflow should start, then set its conditions.
                        </SheetDescription>
                    </SheetHeader>

                    <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-4">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="trigger-type">Trigger type</Label>
                            <Select
                                value={selectedTrigger ?? undefined}
                                onValueChange={handleTriggerChange}
                            >
                                <SelectTrigger id="trigger-type" className="w-full">
                                    <SelectValue placeholder="Select trigger type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {SUPPORTED_TRIGGERS.map(({ id, title }) => (
                                            <SelectItem key={id} value={id}>
                                                {title}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {selectedTrigger && (
                                <p className="text-xs text-muted-foreground">
                                    {
                                        SUPPORTED_TRIGGERS.find((t) => t.id === selectedTrigger)
                                            ?.description
                                    }
                                </p>
                            )}
                        </div>

                        {selectedTrigger === "timer-trigger" && (
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="interval-seconds">Interval (seconds)</Label>
                                <Input
                                    id="interval-seconds"
                                    type="number"
                                    min={1}
                                    placeholder="e.g. 3600"
                                    value={"time" in metaData ? metaData.time : 3600}
                                    onChange={(e) =>
                                        setMetaData({ time: Number(e.target.value) || 0 })
                                    }
                                />
                                <p className="text-xs text-muted-foreground">
                                    How often the trigger should run. 3600 = once per hour.
                                </p>
                            </div>
                        )}

                        {selectedTrigger === "price-trigger" && (
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="market-asset">Market pair</Label>
                                    <Select
                                        value={"asset" in metaData ? metaData.asset : undefined}
                                        onValueChange={(asset) =>
                                            setMetaData((prev) => ({
                                                price: "price" in prev ? prev.price : 0,
                                                asset,
                                            }))
                                        }
                                    >
                                        <SelectTrigger id="market-asset" className="w-full">
                                            <SelectValue placeholder="Select market pair" />
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
                                    <p className="text-xs text-muted-foreground">
                                        Asset whose price will be monitored.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label htmlFor="threshold-price">Threshold price (USD)</Label>
                                    <Input
                                        id="threshold-price"
                                        type="number"
                                        min={0}
                                        step="0.01"
                                        placeholder="e.g. 65000"
                                        value={"price" in metaData ? metaData.price : 0}
                                        onChange={(e) =>
                                            setMetaData((prev) => ({
                                                asset: "asset" in prev ? prev.asset : "BTC",
                                                price: Number(e.target.value) || 0,
                                            }))
                                        }
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Workflow starts when the market reaches this level.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <SheetFooter className="border-t border-border">
                        <Button
                            type="button"
                            size="lg"
                            className="w-full"
                            disabled={!selectedTrigger}
                            onClick={() => {
                                if (!selectedTrigger) return;
                                onSelect(selectedTrigger, metaData);
                            }}
                        >
                            Create trigger
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        </div>
    )
}
