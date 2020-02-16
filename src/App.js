import {
  Grid, Paper, Avatar, Typography, List, ListItem, Divider, ListItemText, ListItemAvatar,
  Table, TableRow, TableCell, TableContainer, TableHead, TableBody, TextField
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import data from './people.json';
const useStyles = makeStyles(theme => ({
  list: {
    minWidth: '250px',
    maxHeight: '500px',
    overflowY: 'auto',
  }

}));

function App() {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [previousSearchResults, setPreviousSearchResults] = useState(new Map());



  useEffect(() => {
    setUsers(sort(data));
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
      setUsers(previousSearchResults.get(searchQuery))
    }
    else
      if (searchQuery) {
        const filteredData = users.filter(user => user.first_name.toLowerCase().includes(searchQuery));
        setUsers(filteredData);
        updatePreviousSearchResults(searchQuery, filteredData);
      }
      else {
        setUsers(data);
      }

  }

  return (
    <div className="App">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Search" variant="outlined" size="small" onKeyUp={handleSearch} fullWidth />

        </Grid>
        <Grid item xs={3}>
          <List className={classes.list}>
            {!users.length && (<ListItem alignItems="flex-start"><ListItemText primary={`No users were found.`} /></ListItem>)}
            {users.map(user => {
              return <>
                <ListItem alignItems="flex-start" button onClick={() => setSelectedUser(user)}>
                  <ListItemAvatar>
                    <Avatar>{`${user.first_name.charAt(0)}${user.last_name.charAt(0)}`}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`${user.first_name} ${user.last_name}`} />
                </ListItem>
              </>
            })}
          </List>
        </Grid>
        <Grid item xs={9}>
          <Paper>
            {selectedUser && <>
              <Typography>First Name: {selectedUser.first_name}</Typography>
              <Typography>Last Name: {selectedUser.last_name}</Typography>
              <Typography>City: {selectedUser.city}</Typography>
              <Typography>State: {selectedUser.state}</Typography>
              <Typography>Email Address: {selectedUser.email}</Typography>

              <Divider />
              <Typography>Login History:</Typography>
              {selectedUser.logins.map(login => {
                return <Typography variant="caption" display="block">{new Date(login.date).toDateString()}</Typography>
              })}
            </>}
          </Paper>

        </Grid>
      </Grid>
    </div>
  );

}

export default App;
