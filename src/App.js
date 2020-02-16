import {
  Avatar, Card, CardContent,
  CardHeader, Grid, IconButton,
  List, ListItem, ListItemAvatar,
  ListItemText, TextField, Typography,
  InputAdornment,
  CircularProgress
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';
import SearchIcon from '@material-ui/icons/Search';
import React, { useEffect, useState } from 'react';
import data from './people.json';
const useStyles = makeStyles(theme => ({
  list: {
    minWidth: '300px',
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

function App() {
  const classes = useStyles();
  const [usersLoaded, setUsersLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [previousSearchResults, setPreviousSearchResults] = useState(new Map());

  useEffect(() => {
    setUsers(sort(data));
    setUsersLoaded(true);
    setSelectedUser(data[0])
  }, []);


  function updatePreviousSearchResults(k, v) {
    setPreviousSearchResults(new Map(previousSearchResults.set(k, v)));
  }


  function sort(users) {
    return users.sort(function (a, b) {
      const nameA = a.first_name.toUpperCase();
      const nameB = b.first_name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
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
        {/* <Grid item xs={12}>
         
        </Grid> */}
        <Grid item xs={3}>
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
                      <Avatar>{`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${user.first_name} ${user.last_name}`}
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
        </Grid>
        <Grid item xs={9}>
          <Card style={{ marginLeft: '10px' }}>
            {selectedUser && <>
              <CardHeader
                titleTypographyProps={{ variant: 'h6' }}
                title={`${selectedUser.first_name} ${selectedUser.last_name}`}
                subheader={selectedUser.email}
                avatar={<Avatar>{`${selectedUser.first_name.charAt(0)}${selectedUser.last_name.charAt(0)}`}</Avatar>}
                action={
                  <IconButton href={`mailto://${selectedUser.email}`}><EmailIcon /></IconButton>
                }
              ></CardHeader>
              <CardContent>
                <Typography variant="body2" fontWeight="bolder">First Name: {selectedUser.first_name}</Typography>
                <Typography variant="body2">Last Name: {selectedUser.last_name}</Typography>
                <Typography variant="body2">Email Address: {selectedUser.email}</Typography>
                <Typography variant="body2">{`Location: ${selectedUser.city}, ${selectedUser.state}`}</Typography>
              </CardContent>
            </>}
          </Card>

          {/* {selectedUser.logins.map(login => {
                return <Typography variant="caption" display="block">{new Date(login.date).toDateString()}</Typography>
              })} */}
        </Grid>
      </Grid>
    </div>
  );

}

export default App;
