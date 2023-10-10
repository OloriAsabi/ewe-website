import React from 'react';
import { useMediaQuery } from '@chakra-ui/media-query';
import { motion, AnimatePresence } from 'framer-motion';
import MobileMenu from './MobileMenu';
import FullScreenMenu from './FullScreenMenu';

interface NavbarProps {
  navigationItems: string[];
  activePage: string;
  links: string[];
}

const Navbar: React.FC<NavbarProps> = ({ navigationItems, activePage, links }) => {
  const [isLargerScreen] = useMediaQuery('(min-width: 900px)')

  return (
    <div>
      <AnimatePresence>
        {isLargerScreen ? (
          <motion.div
            key="mobile"
            initial={{ opacity: 0, y: -50 }} // Slide down from top
            animate={{ opacity: 1, y: 0 }} // Slide down to the final position
            exit={{ opacity: 0, y: -50 }} // Slide up and exit from top
            transition={{ duration: 0.5 }}
          > 
          <FullScreenMenu 
          navigationItems={navigationItems} 
          activePage={activePage} 
          links={links} 
          />
          </motion.div>
        ) : (
          <motion.div
            key="fullscreen"
            initial={{ opacity: 0, y: -50 }} // Slide down from top
            animate={{ opacity: 1, y: 0 }} // Slide down to the final position
            exit={{ opacity: 0, y: -50 }} // Slide up and exit from top
            transition={{ duration: 0.5 }}
          >
            <MobileMenu navigationItems={navigationItems} activePage={activePage} links={links}/> 
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
