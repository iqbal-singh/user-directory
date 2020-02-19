import { Grid, IconButton, Tooltip } from '@material-ui/core';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import React, { useState, useEffect } from 'react';
import { allUsers } from '../../api/people';
import { Link } from 'react-router-dom';
export default function LoginActivity() {
    const [usersLoaded, setUsersLoaded] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        setUsers(allUsers);
        setUsersLoaded(true);
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} style={{ padding: 0 }} align="right">
                <Tooltip title="User Directory" placement="left">
                    <Link to='/'><IconButton size="small">
                        <ContactMailIcon></ContactMailIcon>
                    </IconButton>
                    </Link>
                </Tooltip>
            </Grid>
        </Grid>
    )
}
