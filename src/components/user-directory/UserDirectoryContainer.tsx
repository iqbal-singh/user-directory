import { Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { allUsers, filterUsersByName } from '../../api/people';
import UserList from './UserList';
import UserProfile from './UserProfile';

function UserDirectoryContainer() {
    const [usersLoaded, setUsersLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState();

    useEffect(() => {
        setUsers(allUsers);
        setUsersLoaded(true);
        setSelectedUser(allUsers[0])
    }, []);

    function handleSearch(e) {
        const searchQuery = e.target.value.trim();
        const filteredUsers = filterUsersByName(searchQuery);
        setUsers(filteredUsers);
    }

    return (<Grid container spacing={1} align="left">
        <Grid item xs={12}>
            {usersLoaded && <Typography variant="h5">User Directory</Typography>}
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