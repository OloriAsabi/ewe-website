import React, { useState, ChangeEvent } from "react";
import { Select, Flex, Box, Image } from "@chakra-ui/react";
import { filterOptions } from "../data/filterType";
import { useSelector } from "react-redux";
import { RootState } from "../types/interface";

interface FilterComponentProps {
  onFilterChange: (selectedFilter: string) => void;
  filterOptions: {
    id: number;
    icon: string;
    type: string | { [key: string]: string };
  }[];
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  onFilterChange,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const language = useSelector((state: RootState) => state.language.language);
  const selectedOption = filterOptions.find((option) => option.type === selectedFilter);


  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedFilter(value);
    onFilterChange(value); // Notify the parent component of the selected filter
  };

  return (
    <Flex alignItems="center"
    width={"100%"}
    height={"100px"}>
      <Select
        placeholder="Filter by..."
        value={selectedFilter}
        onChange={handleFilterChange}
        // color="#345430"
        backgroundColor="#fff"
        borderColor={"#345430"}
        fontFamily="Inter"
        fontSize="20px"
        _focus={{ borderColor: "#345430" }}
             width={"100%"}
             height={"60px"}
      >
        {filterOptions.map((option) => (
          <option key={option.id} 
          value={typeof option.type === "string" ? option.type : option.type[language]}>
            {typeof option.type === "string" ? option.type : option.type[language]}
          </option>
        ))}
      </Select>
      {selectedFilter ? (
      <Box marginLeft={5}>
        <Image
          src={filterOptions.find((option) => option.type[language] === selectedFilter)?.icon}
          boxSize="60px"
        />
        </Box>
        )
         :
         ( 
         ""
         )}
    </Flex>
  );
};

export default FilterComponent;
