import { useSelector } from 'react-redux';
import { selectAllUsers } from '../api/userSlice';

const userExists = (email: string) => {
  // Get all users from the Redux store
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const allUsers = useSelector(selectAllUsers);

  // Check if a user with the given email already exists
  return allUsers.some((user: { email: string }) => user.email === email);
};

export default userExists;
