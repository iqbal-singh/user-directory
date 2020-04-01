import { Grid, Typography } from '@material-ui/core';
import React, { ChangeEvent, FunctionComponent, useEffect, useState } from 'react';
import { allUsers, filterUsersByName } from '../../api/people';
import IUser from '../../interfaces/IUser';
import UserList from './UserList';
import UserProfile from './UserProfile';


const UserDirectoryContainer: FunctionComponent<{}> = (props) => {
    const [usersLoaded, setUsersLoaded] = useState<boolean>(false);
    const [users, setUsers] = useState<IUser[]>([]);
    const [selectedUser, setSelectedUser] = useState<IUser | undefined>();

    useEffect(() => {
        setUsers(allUsers);
        setUsersLoaded(true);
        setSelectedUser(allUsers[0])
    }, []);

    function handleSearch(e: ChangeEvent<HTMLInputElement>) {
        const searchQuery = e.currentTarget.value.trim();
        const filteredUsers = filterUsersByName(searchQuery);
        setUsers(filteredUsers);
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                {usersLoaded && <Typography variant="h5" align="left">User Directory</Typography>}
            </Grid>
            <Grid item md={4} xs={12}>
                <UserList
                    users={users}
                    usersLoaded={usersLoaded}
                    handleSearch={handleSearch}
                    setSelectedUser={setSelectedUser}
                    selectedUser={selectedUser}
                />
            </Grid>
            <Grid item md={8} xs={12}>
                <UserProfile user={selectedUser} />
            </Grid>
        </Grid>);
}

export default UserDirectoryContainer;