import { KeyboardEventHandler, ReactNode } from "react";
import { Control, RegisterOptions } from "react-hook-form";
import { postApiSlice } from "../api/postSlice";
import { EntityState } from "@reduxjs/toolkit";
import { UsersState } from "../api/userSlice";

interface Reactions {
  thumbsUp: number;
  thumbsDown: number;
  bookmark: number;
  comments: string[];
}

export interface Post {
  id: number;
  username: string;
  image: string;
  plantName: string;
  name: {
    yo: string;
    en: string;
  };
  likes: number;
  dislikes: number;
  otherNames: {
    yo: string[];
    en: string[];
  };
  uses: {
    yo: string;
    en: string;
  };
  description: {
    yo: string;
    en: string;
  };
  verify: boolean;
  icon: string; // Replace with the actual type of the icon
  type: {
    yo: string;
    en: string;
  };
  bookmark: boolean;
  bookmarked: boolean;
  comments: string[];
  reactions: Reactions; 
  date: string;
}

export interface UserData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  selectOption: string;
  error?: boolean;
  newPassword: string;
  values: string;
  role: string;
}
export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: string;
  location?: string
  field: string;
  about: string;
  confirmPassword: string;
}
export interface Update<User> {
  id: string; // The user ID to identify which user to update
  changes: Partial<User>; // Partial type to allow updating only some properties
}

export interface ApiResponseSuccess {
  data: {
    token: string;
    refreshToken: string;
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber: string;
    role: string;
    // Other properties returned in the successful response
  };
}

export interface ApiResponseError {
  // error: {
  //   message: string;
  //   // Other error properties
  // };
    message: string;
}

export type ApiResponse = ApiResponseSuccess | ApiResponseError;

export interface FormInputTextProps {
  control: Control<UserData, string>;
  name: keyof UserData;
  label: string;
  placeholder?: string;
  ariaLabel?: string;
  registerOptions?: RegisterOptions;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  error?: boolean;
}

export interface FormInputPasswordProps {
  control: Control<UserData, string>;
  name: keyof UserData;
  label: string;
  placeholder?: string;
  ariaLabel?: string;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  icons: {
    visible: string;
    hidden: string;
  };
  onKeyUp?: KeyboardEventHandler<HTMLInputElement>;
  error?: boolean;
  registerOptions?: RegisterOptions;
  confirmPassword: string;
}

export interface FormInputPhoneNumberProps {
  control: Control<UserData, string>;
  name: keyof UserData;
  label: string;
  placeholder?: string;
  ariaLabel?: string;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  error?: boolean;
  registerOptions?: RegisterOptions;
}

export interface FormSelectOptionsProps {
  control: Control<UserData, string>;
  name: keyof UserData;
  label: string;
  options: string[];
  placeholder?: string;
  registerOptions?: RegisterOptions;
  onKeyUp?: (event: React.KeyboardEvent<HTMLSelectElement>) => void;
  error?: boolean;
}

export interface IconButtonProps {
  icons: string[]; // Array of icon URLs
  components: JSX.Element[]; // Array of link components
}

export interface State {
  count: number;
}

export interface Action {
  type: string;
  payload?: any;
}

export interface AppContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

export interface AppContextProviderProps {
  children: ReactNode;
}

export interface UserState {
  isLogin: boolean;
  expiringDate?: string;
}

export interface LanguageContextType {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
}

export interface TitleData {
  [key: string]: string;
}

export interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface FilterTabProps {
  onFilterChange: (filter: string) => void;
  activeFilter: string;
}

export interface PostData {
  id: number;
  user: string;
  date: string;
  location: string;
  image: string;
  images: string[];
  name: {
    yo: string;
    en: string;
  };
  otherNames: {
    yo: string[];
    en: string[];
  };
  uses: {
    yo: string;
    en: string;
  };
  description: {
    yo: string;
    en: string;
  };
  family: {
    yo: string;
    en: string;
  };
  verify: boolean;
  icon: string;
  type: {
    yo: string;
    en: string;
  };
  likes: number;
  comments: number;
  bookmarked: boolean;
}

export interface Posts {
  id: number;
  username: string;
  image: string;
  name:  string | { [key: string]: string };
  otherNames:  string | { [key: string]: string };
  verify: boolean;
  icon: string;
  type: string | { [key: string]: string };
  likes: number;
  dislikes: number;
  uses: string | { [key: string]: string };
  description: string | { [key: string]: string };
  bookmarked: boolean;
}

export interface PostCardProps {
  posts: Posts[];
}

export interface RootState {
  reverseGeocode: any;
  state: EntityState<User>;
  posts: ReturnType<typeof postApiSlice.reducer>;
  language: any;
  user: UsersState;
  // api: {
  //   postApi: ReturnType<typeof postApiSlice.reducer>;
  // };
}



export  interface IFormInputs {
  email: string;
  username: string;
  name: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  selectOption: string;
  role: string;
  icons: {
    visible: string;
    hidden: string;
  };
  field: string;
  otherField: string;
  about: string;
}
