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
} from "@/components/ui/sheet"
import { useState } from "react";
import { NodeMetaData } from "./CreateWorkFlow";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { SUPPORTED_ASSETS } from "./TriggerSheet";
import { TradingMetaData } from "@/nodes/actions/Lighter";

const SUPPORTED_ACTIONS = [{
    id: "hyper-liquid" as const,
    title: "Hyperliquid",
    description: "Place a trade on Hyperliquid",
}, {
    id: "lighter" as const,
    title: "Lighter",
    description: "Place a trade on Lighter",
}, {
    id: "backpack" as const,
    title: "Backpack",
    description: "Place a trade on Backpack",
}]

const TRADE_SIDES = [
    { id: "Long" as const, title: "Long" },
    { id: "Short" as const, title: "Short" },
]

const DEFAULT_TRADE_META: TradingMetaData = {
    type: "Long",
    qty: 1,
    symbol: "BTC",
}

type ActionsSheetProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSelect: (kind: NodeKind, metadata: NodeMetaData) => void
}

export const ActionsSheet = ({
    open,
    onOpenChange,
    onSelect,
}: ActionsSheetProps) => {
    const [metaData, setMetaData] = useState<TradingMetaData>(DEFAULT_TRADE_META);
    const [selectedAction, setSelectedAction] = useState<NodeKind>(SUPPORTED_ACTIONS[0].id);

    const handleActionChange = (value: string) => {
        setSelectedAction(value as NodeKind);
        setMetaData(DEFAULT_TRADE_META);
    };

    const showTradeFields =
        selectedAction === "hyper-liquid" ||
        selectedAction === "lighter" ||
        selectedAction === "backpack";

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="gap-0">
                <SheetHeader className="border-b border-border">
                    <SheetTitle>Configure action</SheetTitle>
                    <SheetDescription>
                        Choose the venue and define how the trade should be placed.
                    </SheetDescription>
                </SheetHeader>

                <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-4">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="action-type">Action venue</Label>
                        <Select
                            value={selectedAction}
                            onValueChange={handleActionChange}
                        >
                            <SelectTrigger id="action-type" className="w-full">
                                <SelectValue placeholder="Select action venue" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {SUPPORTED_ACTIONS.map(({ id, title }) => (
                                        <SelectItem key={id} value={id}>
                                            {title}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                            {
                                SUPPORTED_ACTIONS.find((action) => action.id === selectedAction)
                                    ?.description
                            }
                        </p>
                    </div>

                    {showTradeFields && (
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="trade-symbol">Market pair</Label>
                                <Select
                                    value={metaData.symbol}
                                    onValueChange={(symbol) =>
                                        setMetaData((prev) => ({ ...prev, symbol }))
                                    }
                                >
                                    <SelectTrigger id="trade-symbol" className="w-full">
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
                                    Asset to trade on the selected venue.
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="trade-side">Position side</Label>
                                <Select
                                    value={metaData.type}
                                    onValueChange={(type) =>
                                        setMetaData((prev) => ({
                                            ...prev,
                                            type: type as TradingMetaData["type"],
                                        }))
                                    }
                                >
                                    <SelectTrigger id="trade-side" className="w-full">
                                        <SelectValue placeholder="Select position side" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {TRADE_SIDES.map(({ id, title }) => (
                                                <SelectItem key={id} value={id}>
                                                    {title}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-muted-foreground">
                                    Whether the action opens a long or short position.
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="trade-qty">Order quantity</Label>
                                <Input
                                    id="trade-qty"
                                    type="number"
                                    min={0}
                                    step="0.01"
                                    placeholder="e.g. 0.25"
                                    value={metaData.qty}
                                    onChange={(e) =>
                                        setMetaData((prev) => ({
                                            ...prev,
                                            qty: Number(e.target.value) || 0,
                                        }))
                                    }
                                />
                                <p className="text-xs text-muted-foreground">
                                    Size of the order to place when this action runs.
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
                        disabled={!selectedAction || metaData.qty <= 0}
                        onClick={() => {
                            onSelect(selectedAction, metaData);
                            onOpenChange(false);
                        }}
                    >
                        Create action
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
