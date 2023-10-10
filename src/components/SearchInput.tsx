import React from "react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../types/interface";

interface SearchInputProps {
  onSearch: (query: string) => void;
  backgroundColor?: string; // Add a backgroundColor prop
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  backgroundColor // Default background color if not provided
}) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    onSearch(query);
  };
  const language = useSelector((state: RootState) => state.language.language);

  return (
    <InputGroup>
      <Input
        type="text"
        placeholder={
          language === "en"
            ? "Type any Yoruba ecological search here ..."
            : 'Tẹ nkan tón wa tó bá wù ẹ́ síbí kí o sì tẹ “Enter”"...'
        }
        onChange={handleSearch}
        backgroundColor={backgroundColor} // Use the backgroundColor prop
        fontFamily="Inter"
        fontSize="20px"
        height={"60px"}
        color="#000"
        _placeholder={{ color: "black" }}
        _focus={{ borderColor: "#345430" }}
      />
      <InputRightElement
        pointerEvents="none"
        backgroundColor="#345430"
        width={"60px"}
        height={"60px"}
      >
        <FaSearch color="#fff" fontSize={25} />
      </InputRightElement>
    </InputGroup>
  );
};

export default SearchInput;

