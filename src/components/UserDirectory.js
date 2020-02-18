import { Grid } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, { useEffect, useState } from 'react';
import { allUsers, filterUsersByName } from '../api/people';
import UserList from './UserList';
import UserProfile from './UserProfile';

function UserDirectory() {
    const [usersLoaded, setUsersLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const [previousSearchResults, setPreviousSearchResults] = useState(new Map());
    const mobile = useMediaQuery('(max-width:1000px)');
    useEffect(() => {
        setUsers(allUsers);
        setUsersLoaded(true);
        setSelectedUser(allUsers[0])
    }, []);

    function updatePreviousSearchResults(k, v) {
        setPreviousSearchResults(new Map(previousSearchResults.set(k, v)));
    }

    function handleSearch(e) {
        const searchQuery = e.target.value.trim();
        if (previousSearchResults.get(searchQuery)) {
            setUsers(previousSearchResults.get(searchQuery));
        }
        else
            if (searchQuery.length > 2) {
                const filteredUsers = filterUsersByName(searchQuery);
                setUsers(filteredUsers);
                updatePreviousSearchResults(searchQuery, filteredUsers);
            }
            else {
                setUsers(allUsers);
            }
    }

    return (
        <div className="App">
            <Grid container spacing={mobile ? 3 : 2}>
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

export default UserDirectory;