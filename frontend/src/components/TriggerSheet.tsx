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


const SUPPORTED_TRIGGERS = [{
    id: "timer-trigger" as const,
    title: "Timer",
    description: "Run this trigger every x sec/min",
}, {
    id: "price-trigger" as const,
    title: "Price Trigger",
    description: "Runs whenever price goes above or below a certain threshold"
}]

export const TriggerSheet = ({
    onSelect
}: { onSelect: (kind: NodeKind, metadata: NodeMetaData) => void }) => {

    const [metaData] = useState({});
    const [selectedTrigger, setSelectedTrigger] = useState<NodeKind | null>(null);

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
                            onValueChange={(value) => setSelectedTrigger(value as NodeKind)}
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
