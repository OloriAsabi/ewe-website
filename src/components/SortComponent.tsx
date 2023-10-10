import React, { useState, ChangeEvent } from "react";
import { Select } from "@chakra-ui/react";

interface SortComponentProps {
  onSortChange: (selectedSort: string) => void;
}

const SortComponent: React.FC<SortComponentProps> = ({ onSortChange }) => {
  const [selectedSort, setSelectedSort] = useState<string>("");

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedSort(value);
    onSortChange(value);
  };

  return (
    <Select
      placeholder="Sort by..."
      value={selectedSort}
      onChange={handleSortChange}
         // color="#345430"
         backgroundColor="#fff"
        //  borderColor={"#345430"}
         fontFamily="Inter"
         fontSize="20px"
         _focus={{ borderColor: "#345430" }}
         width={"100%"}
         height={"60px"}
    >
      <option value="sort1">All</option>
      <option value="sort2">A-Z</option>
      <option value="sort3">Latest</option>
      <option value="sort3">Popular</option>
      <option value={'verified'}>Verified</option>
      <option value={'unVerified'}>Unverified</option>
    </Select>
  );
};

export default SortComponent;