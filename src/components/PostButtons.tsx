import React from 'react';
import {
  Box,
  Button,
  VStack,
} from '@chakra-ui/react';
import {
  BiLike,
  BiDislike,
  BiShare
} from 'react-icons/bi';
import { FaComment } from 'react-icons/fa';
import ShareButton from './ShareButton';
import { useState } from 'react';

interface PostButtonsProps {
  post: {
    likes: number;
    dislikes: number;
    id: number;
  };
}

const PostButtons: React.FC<PostButtonsProps> = ({ post }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState<Record<number, boolean>>({});

  const toggleShareModal = (postId: number) => {
    setIsShareModalOpen((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  return (
    <VStack
    display={'flex'}
    flexDirection={'row'}
      paddingTop={['5px', '10px']}
      paddingBottom={['5px', '10px']}
      gap={10}
    >
      <Button
        // flex={['1', '1', 'auto']}
        variant="ghost"
        color="#345430"
        leftIcon={<BiLike fontSize={20} color="#345430" />}
      >
        {post.likes}
      </Button>
      <Button
        // flex={['1', '1', 'auto']}
        variant="ghost"
        color="#345430"
        leftIcon={<BiDislike fontSize={20} color="#345430" />}
        marginLeft={'-10px'}
      >
        {post.dislikes}
      </Button>
      <Button
        // flex={['1', '1', 'auto']}
        variant="ghost"
        color="#345430"
        leftIcon={<FaComment fontSize={20} color="#345430" />}
      >
        Comments
      </Button>
      <Box
        // flex={['1', '1', 'auto']}
        position="relative"
        display="inline-block"
      >
        <Button
          variant="ghost"
          color="#345430"
          leftIcon={<BiShare fontSize={20} color="#345430" />}
          onClick={() => toggleShareModal(post.id)}
        >
          Share
        </Button>
        {isShareModalOpen[post.id] && <ShareButton />}
      </Box>
    </VStack>
  );
};

export default PostButtons;
