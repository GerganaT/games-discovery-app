"use client";

import { createListCollection, Text } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from "@/components/ui/select";
import { useState } from "react";

interface DropdownMenuProps {
  selectionPrefix?: string;
  backgroundColor?: string;
  selectionItems: any[];
  menuItemValueKey: string;
  menuItemLabelKey: string;
  onMenuItemSelect: (value: any) => void;
}

const DropdownMenu = ({
  selectionPrefix = "",
  backgroundColor = "white",
  selectionItems,
  menuItemValueKey,
  menuItemLabelKey,
  onMenuItemSelect,
}: DropdownMenuProps) => {
  const listCollectionItems = createListCollection({
    items: selectionItems.map((item) => ({
      value: item[menuItemValueKey],
      label: item[menuItemLabelKey],
    })),
  });

  const [currentSelection, setCurrentSelection] = useState(
    `${selectionPrefix}${listCollectionItems.items[0].label}`
  );

  return (
    <SelectRoot
      backgroundColor={backgroundColor}
      collection={listCollectionItems}
      size="sm"
      borderRadius="lg"
      width="250px"
      onValueChange={(data) => {
        onMenuItemSelect(data.value[0]);
        setCurrentSelection(selectionPrefix + data.items[0].label);
      }}
    >
      <SelectTrigger>
        <Text>{currentSelection}</Text>
      </SelectTrigger>
      <SelectContent backgroundColor={backgroundColor}>
        {listCollectionItems.items.map((item) => (
          <SelectItem item={item} key={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

export default DropdownMenu;
