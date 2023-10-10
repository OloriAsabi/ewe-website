import React, { useState } from "react";
import { Avatar, Menu, MenuButton, MenuList, MenuItem, Box, Text, Button } from "@chakra-ui/react";
import { MdArrowDropDown } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated, selectCurrentUser, clearUser } from "../api/userSlice";
import { User } from "../types/interface";
import { useNavigate } from "react-router-dom";
import ToastNotification from "./ToastNotification";
import { useLogoutQuery } from "../api/apiGet";

interface CustomButtonProps {
  children: React.ReactNode;
  to: string;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, to, onClick }) => (
  <Text
    as={Link}
    to={to}
    onClick={onClick}
    fontSize="20px"
    fontWeight="extrabold"
    fontFamily="Inter"
    padding="8px"
    borderRadius="10px"
    color="#345430"
    backgroundColor="#F7F7F9"
    cursor="pointer"
    _hover={{ backgroundColor: "#345430", color: "white" }}
  >
    {children}
  </Text>
);

interface UserMenuProps {
  closeMenu: () => void; // Define closeMenu as a function prop
}

const UserMenu: React.FC<UserMenuProps> = ({ closeMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser) as unknown as User;
  const [showToast, setShowToast] = useState(false);
  const [toastConfig, setToastConfig] = useState({
    description: "",
    status: "",
  });

    const handleLogoutLogic = async (data: any) => {      
      try {
        if ( isSuccess && 'data' in data) {
          setToastConfig({
            description: data?.data?.message,
            status: 'success',
          });

          setShowToast(true);       
          dispatch(clearUser());
          navigate("/");
        } else if ('error' in data) {
          const responseData = data.error as { data?: { message?: string } };
          
          if (responseData.data && responseData.data.message) {
            const errorMessage = responseData.data.message;
            setToastConfig({ description: errorMessage, status: 'error' });
            setShowToast(true);
          }
        }  
      } catch (error: any) {
        setToastConfig({ description: error.message, status: 'error' });
        setShowToast(true);
      }
    };

    const { data, isSuccess } = useLogoutQuery({}, { skip: true }); // Add skip: true option


    const handleLogout = () => {
      if(isSuccess) {
      handleLogoutLogic(data);
      }
    };

  return (
    <Menu>
      {isAuthenticated && (
        <MenuButton
          as={Button}
          display="flex"
          alignItems="center"
          variant="link"
          rightIcon={<MdArrowDropDown fontSize={32} color="#345430" />}
          cursor="pointer"
        >
          <Avatar name={currentUser?.email} />
        </MenuButton>
      )}
      <MenuList style={{ zIndex: 999, pointerEvents: 'auto' }}>
        {isAuthenticated && (
          <>
            <MenuItem
              as={Link}
              onClick={closeMenu}
              to={`/user/${currentUser.id}`}
            >
              Profile
            </MenuItem>
            <MenuItem
              as={Link}
              to={`/user/${currentUser.id}/create-post`}
              onClick={closeMenu}
            >
              Upload Post
            </MenuItem>
            <MenuItem
              as={Link}
              to={`user/${currentUser.id}/posts`}
              onClick={closeMenu}
            >
              Posts
            </MenuItem>
            <MenuItem
              as={Link}
              onClick={closeMenu}
              to={`/user/${currentUser.id}/settings`}
            >
              Account Settings
            </MenuItem>
            <MenuItem
              onClick={handleLogout}
            >
              Logout
            </MenuItem>
          </>
        )}
      </MenuList>
      {!isAuthenticated && (
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          gap="5px"
          alignItems="center"
          textAlign="center"
        >
          <CustomButton to="/login" onClick={closeMenu}>
            Login
          </CustomButton>
          <CustomButton to="/signup" onClick={closeMenu}>
            Sign Up
          </CustomButton>
        </Box>
      )}
       {showToast && (
        <ToastNotification
          description={toastConfig.description}
          status={toastConfig.status}
          onClose={() => setShowToast(false)}
        />
      )}
    </Menu>
  );
};

export default UserMenu;