import { Avatar, InputAdornment, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React, { ChangeEvent, FunctionComponent } from 'react';
import IUser from '../../interfaces/IUser';

const useStyles = makeStyles(theme => ({
    list: {
        height: '600px',
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

type UserListProps = {
    users: IUser[];
    usersLoaded: boolean;
    selectedUser: IUser | undefined;
    setSelectedUser: (user: IUser | undefined) => void;
    handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

const UserList: FunctionComponent<UserListProps> = ({
    users,
    usersLoaded,
    selectedUser,
    setSelectedUser,
    handleSearch,
}) => {
    const classes = useStyles();
    return (
        <List className={classes.list}>
            {usersLoaded && <>
                <ListItem divider>
                    <TextField
                        placeholder="Search"
                        variant="outlined"
                        size="small"
                        onChange={handleSearch}
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
                        selected={user.id === selectedUser?.id}
                        onClick={() => { setSelectedUser(user) }}>
                        <ListItemAvatar>
                            <Avatar>{user.initials}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={user.full_name}
                            secondary={user.email}
                        />
                    </ListItem>
                })}
            </>}

            {(usersLoaded && !users.length) && <ListItem key={-1} alignItems="flex-start">
                <ListItemText primary={`No Results.`} primaryTypographyProps={{ variant: 'h6' }} />
            </ListItem>}

        </List>
    )
}


export default UserList;