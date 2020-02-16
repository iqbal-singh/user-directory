import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import data from '../api/peopleAPI';
import UserList from './UserList';
import UserProfile from './UserProfile';

function UserDirectory() {
    const [usersLoaded, setUsersLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const [previousSearchResults, setPreviousSearchResults] = useState(new Map());

    useEffect(() => {
        setUsers(data);
        setUsersLoaded(true);
        setSelectedUser(data[0])
    }, []);


    function updatePreviousSearchResults(k, v) {
        setPreviousSearchResults(new Map(previousSearchResults.set(k, v)));
    }

    function handleSearch(e) {
        const searchQuery = e.target.value.trim().toLowerCase();
        if (previousSearchResults.get(searchQuery)) {
            setUsers(previousSearchResults.get(searchQuery));
        }
        else
            if (searchQuery) {
                const filteredData = users.filter(user => {
                    return user.first_name.toLowerCase().includes(searchQuery);
                });
                setUsers(filteredData);
                updatePreviousSearchResults(searchQuery, filteredData);

            }
            else {
                setUsers(data);
            }
    }

    return (
        <div className="App">
            <Grid container spacing={1}>
                {/* <Grid item xs={12}></Grid> */}
                <Grid item md={3}>
                    <UserList
                        users={users}
                        setUsers={setUsers}
                        usersLoaded={usersLoaded}
                        handleSearch={handleSearch}
                        previousSearchResults={previousSearchResults}
                        setPreviousSearchResults={setPreviousSearchResults}
                        setSelectedUser={setSelectedUser}
                        selectedUser={selectedUser}
                        unFilteredUsers={data}
                    />
                </Grid>
                <Grid item md={9}>
                    <UserProfile user={selectedUser} />
                </Grid>
            </Grid>
        </div>
    );

}

export default UserDirectory;