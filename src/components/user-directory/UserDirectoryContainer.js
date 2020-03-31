import { Grid, LinearProgress, Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, { useEffect, useState } from 'react';
import { allUsers, filterUsersByName } from '../../api/people';
import UserList from './UserList';
import UserProfile from './UserProfile';

function UserDirectoryContainer() {
    const [usersLoaded, setUsersLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const mobile = false;
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

    return (
        <div className="App">
            <Grid container spacing={mobile ? 2 : 0}>
                <Grid item xs={12} align="left">
                    <Typography variant="h5">User Directory</Typography>
                    {!usersLoaded && <LinearProgress />}
                </Grid>
                <Grid item md={3} xs={12}>
                    <UserList
                        users={users}
                        usersLoaded={usersLoaded}
                        handleSearch={handleSearch}
                        setSelectedUser={setSelectedUser}
                        selectedUser={selectedUser}
                        mobile={mobile}
                    />
                </Grid>
                <Grid item md={9} xs={12}>
                    <UserProfile user={selectedUser} />
                </Grid>
            </Grid>
        </div>
    );
}

export default UserDirectoryContainer;