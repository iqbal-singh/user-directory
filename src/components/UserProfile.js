import { Avatar, Card, CardContent, CardHeader, Divider, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EmailIcon from '@material-ui/icons/Email';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import React from 'react';
const useStyles = makeStyles(theme => ({
    card: {
        marginLeft: '5px',
        height: '600px'
    },
    loginActivity: {
        maxHeight: '200px',
        overflow: 'auto',
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


function UserProfile({ user }) {
    const classes = useStyles();

    if (!user) { return ''; }
    else {
        return <>
            <Card className={classes.card} variant="outlined">
                <CardHeader
                    titleTypographyProps={{ variant: 'h6' }}
                    title={user.full_name}
                    subheader={user.email}
                    avatar={<Avatar>{user.initials}</Avatar>}
                    action={
                        <IconButton href={`mailto:${user.email}`}><EmailIcon /></IconButton>
                    }
                >
                </CardHeader>
                <CardContent>
                    <Typography variant="body2"><b>First Name:</b> {user.first_name ? user.first_name : 'N/A'}</Typography>
                </CardContent>
                <Divider />
                <CardContent>
                    <Typography variant="body2"><b>Last Name:</b> {user.last_name ? user.last_name : 'N/A'}</Typography>
                </CardContent>
                <Divider />
                <CardContent>
                    <Typography variant="body2"><b>Email Address:</b> {user.email ? <a href={`mailto:${user.email}`}>{user.email}</a> : 'N/A'}</Typography>
                </CardContent>
                <Divider />
                <CardContent>
                    <Typography variant="body2"><b>City:</b> {user.city ? user.city : 'N/A'}</Typography>
                </CardContent>
                <Divider />
                <CardContent>
                    <Typography variant="body2"><b>State:</b> {user.state ? user.state : 'N/A'}</Typography>
                </CardContent>
                <Divider />
                <CardContent className={classes.loginActivity}>
                    <Typography variant="body2"><b>Recent Logins:</b></Typography>
                    {user.logins.map(login => {
                        return <Typography key={`${login.getTime()}`} variant="caption" display="block">{`${format(login, 'PPpp')}`}</Typography>
                    })}
                </CardContent>
            </Card>
        </>
    }
}

UserProfile.propTypes = {
    user: PropTypes.object
};


export default UserProfile;