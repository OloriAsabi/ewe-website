import React from "react";
import { Box } from "@chakra-ui/react";
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../api/languageSlice';
import { RootState } from "../types/interface";

interface LanguageButtonProps {
  closeMenu: () => void; // Define closeMenu as a function prop
}


const LanguageButton: React.FC<LanguageButtonProps> = ({ closeMenu }) => {
    const language = useSelector((state: RootState) => state.language.language);
    const dispatch = useDispatch();
  
    const changeLanguage = (newLanguage: any) => {        
      dispatch(setLanguage(newLanguage));
      closeMenu(); 
    };
  
  return (
    <Box display={'flex'} flexDirection={'row'} justifyContent="space-between" gap={'5px'} alignItems="center" textAlign="center">
      <Box
       onClick={() => changeLanguage('en')}
        color={language === "en" ? "#F7F7F9" : "#345430"}
        backgroundColor={language === "en" ? "#345430" : "#F7F7F9"}
        fontWeight={"extrabold"}
        fontSize={"20px"}
        fontFamily='Inter'
        padding={'10px'}
        borderRadius={"10px"}
      >
        En
      </Box>
      <Box
        onClick={() => changeLanguage('yo')}
        color={language === "yo" ? "#F7F7F9" : "#345430"}
        backgroundColor={language === "yo" ? "#345430" : "#F7F7F9"}
        fontWeight={"extrabold"}
        fontSize={"20px"}
        fontFamily='Inter'
        padding={'10px'}
        borderRadius={"10px"}
      >
        Yor
      </Box>
    </Box>
  );
};

export default LanguageButton;
