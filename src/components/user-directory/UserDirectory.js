import { Grid, IconButton, LinearProgress, Tooltip, Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { allUsers, filterUsersByName } from '../../api/people';
import UserList from './UserList';
import UserProfile from './UserProfile';

function UserDirectory() {
    const [usersLoaded, setUsersLoaded] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState();
    const [previousSearchResults, setPreviousSearchResults] = useState(new Map());
    const mobile = useMediaQuery('(max-width:950px)');
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
            <Grid container spacing={mobile ? 2 : 0}>
                {/* <Grid item xs={12} style={{height:'1px'}} align="right" >
                    <Tooltip title="Login Activity Dashboard" placement="left">
                        <Link to='/login-activity'><IconButton size="small">
                            <InsertChartIcon></InsertChartIcon>
                        </IconButton>
                        </Link>
                    </Tooltip>
                </Grid> */}
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

export default UserDirectory;