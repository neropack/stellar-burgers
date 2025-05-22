import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { getUser, getUserName } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
    const userName = useSelector(getUserName);
    return <AppHeaderUI userName={userName} />
};
