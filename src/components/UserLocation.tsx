import React, { useEffect } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserLocation, updateUserLocation } from '../api/userSlice';
import { RootState } from '../types/interface';
import { reverseGeocodeLocation } from '../api/locationSlice';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import './index.css'

const UserLocation: React.FC = () => {
  const dispatch = useDispatch() as ThunkDispatch<RootState, undefined, AnyAction>;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const userLocation = useSelector((state: RootState) => selectUserLocation(state));
  const locationName = useSelector((state: RootState) => state.reverseGeocode.locationName);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!userLocation) {
        onOpen(); 
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [userLocation, onOpen]);

  useEffect(() => {
    if (!userLocation) {
      // Fetch user location if not already available
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          dispatch(reverseGeocodeLocation(location)); 
          dispatch(updateUserLocation(locationName));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, [dispatch, locationName, userLocation]);

  return (
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>User's Location</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {userLocation ? (
              <Text>
                {locationName}
              </Text>
            ) : (
              <Text>To get your location, please grant permission when prompted.</Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              onClick={() => {
                onClose();
              }}
            >
              Ask for Permission
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  );
};

export default UserLocation;
