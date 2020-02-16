import { Avatar, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React, { useState, useEffect } from 'react';
const useStyles = makeStyles(theme => ({
    list: {
        maxWidth: '400px',
        height: '600px',
        overflowY: 'auto',
        paddingTop: '0px',
        border: '1px solid #eee',
        borderRadius: '4px',
        '&::-webkit-scrollbar': {
            width: '0.4em'
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid #eee'
        }
    }
}));



function UserList({
    users, usersLoaded, setUsers,
    selectedUser, setSelectedUser,
    previousSearchResults, setPreviousSearchResults, unFilteredUsers
}) {

    const classes = useStyles();

    function handleSearch(e) {
        const searchQuery = e.target.value.trim().toLowerCase();
        if (previousSearchResults.get(searchQuery)) {
            setUsers(previousSearchResults.get(searchQuery));
        }
        else
            if (searchQuery) {
                const filteredData = users.filter(user => {
                    return user.full_name.toLowerCase().includes(searchQuery);
                });
                setUsers(filteredData);
                updatePreviousSearchResults(searchQuery, filteredData);

            }
            else {
                setUsers(unFilteredUsers);
            }
    }

    function updatePreviousSearchResults(k, v) {
        setPreviousSearchResults(new Map(previousSearchResults.set(k, v)));
    }

    return (
        <>
            <List
                className={classes.list}
            >
                {!usersLoaded && <>
                    <ListItem component="" key={-2} alignItems="flex-start">
                        <ListItemText primary={'Loading Contacts...'} primaryTypographyProps={{ variant: 'h6' }} />
                        {/* <CircularProgress/> */}
                    </ListItem>

                </>}

                {usersLoaded &&
                    <>
                        <ListItem divider>
                            <TextField
                                placeholder="Search"
                                variant="outlined"
                                size="small"
                                onInput={handleSearch}
                                InputProps={{
                                    startAdornment: <InputAdornment position="end" ><SearchIcon /></InputAdornment>,
                                }}
                                fullWidth />

                        </ListItem>
                        {users.map(user => {
                            return <ListItem
                                key={user.id}
                                alignItems="flex-start"
                                button
                                dense
                                selected={user === selectedUser}
                                onClick={() => setSelectedUser(user)}
                            >
                                <ListItemAvatar>
                                    <Avatar>{user.initials}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={user.full_name}
                                    secondary={user.email}
                                />
                            </ListItem>
                        })}
                    </>
                }

                {(usersLoaded && !users.length) && <ListItem key={-1}
                    alignItems="flex-start">
                    <ListItemText primary={`No Results.`} primaryTypographyProps={{ variant: 'h6' }} />
                </ListItem>}

            </List>

        </>
    )
}



export default UserList;