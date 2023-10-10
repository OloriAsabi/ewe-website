import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  IconButton,
} from '@chakra-ui/react';
import {
  BiTrash,
  BiBookmark,
} from 'react-icons/bi';
import { CiMenuKebab } from 'react-icons/ci';


const PostMenu: React.FC<{ postId: number }> = ({ postId }) => {
  const handleDeletePost = (postId: number) => {
    console.log("Deleted Post:", postId);
  };

  const handleBookmark = (postId: number) => {
    console.log("Bookmark Post:", postId);
  };

  return (
    <Menu placement="bottom-end">
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<CiMenuKebab fontSize={20} color="#345430" />} // Use the delete icon here
        variant="ghost"
      />
      <MenuList>
        <MenuItem>
          <Button
            aria-label="Options"
            flex={['1', '1', 'auto']}
            leftIcon={<BiTrash fontSize={20} color="#ff0000" />} // Delete icon
            variant="ghost"
            onClick={() => handleDeletePost(postId)}
          >
            Delete
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            aria-label="Options"
            flex={['1', '1', 'auto']}
            leftIcon={<BiBookmark fontSize={20} color="#345430" />} // Bookmark icon
            variant="ghost"
            onClick={() => handleBookmark(postId)}
          >
            Bookmark
          </Button>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default PostMenu;
