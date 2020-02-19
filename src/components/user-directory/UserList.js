import { Avatar, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import React from 'react';
const useStyles = makeStyles(theme => ({
    list: {
        overflowY: 'auto',
        paddingTop: '0px',
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

function UserList({ mobile, users, usersLoaded, selectedUser, setSelectedUser, handleSearch }) {

    const classes = useStyles();
    return (
        <>
            <List
                className={classes.list}
                style={{
                    height: mobile ? '300px' : '600px',
                    maxWidth: mobile ? '1000px' : '400px',
                }}>

                {!usersLoaded && <ListItem key={-2} alignItems="flex-start">
                    <ListItemText primary={'Loading, Please Wait ...'} primaryTypographyProps={{ variant: 'h6' }} />
                </ListItem>}

                {usersLoaded && <>
                    <ListItem divider>
                        <TextField
                            placeholder="Search"
                            variant="outlined"
                            size="small"
                            onKeyUp={handleSearch}
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
                            selected={user.id === selectedUser.id}
                            onClick={() => { setSelectedUser(user) }}>
                            <ListItemAvatar>
                                <Avatar>{user.initials}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={user.full_name}
                                secondary={!mobile && user.email}
                            />
                        </ListItem>
                    })}
                </>
                }

                {(usersLoaded && !users.length) && <ListItem key={-1} alignItems="flex-start">
                    <ListItemText primary={`No Results.`} primaryTypographyProps={{ variant: 'h6' }} />
                </ListItem>}

            </List>

        </>
    )
}

UserList.propTypes = {
    users: PropTypes.array,
    usersLoaded: PropTypes.bool,
    selectedUser: PropTypes.object,
    setSelectedUser: PropTypes.func,
    handleSearch: PropTypes.func
};

export default UserList;