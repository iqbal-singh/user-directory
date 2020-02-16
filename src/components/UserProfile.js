import React from 'react'
import { Card, CardHeader, Avatar, CardContent, IconButton, Typography } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';

function UserProfile({ user }) {
    if (!user) {
        return ''
    }
    else {
        return <>
            <Card style={{ marginLeft: '10px' }}>
                <CardHeader
                    titleTypographyProps={{ variant: 'h6' }}
                    title={user.full_name}
                    subheader={user.email}
                    avatar={<Avatar>{user.initials}</Avatar>}
                    action={
                        <IconButton href={`mailto://${user.email}`}><EmailIcon /></IconButton>
                    }
                ></CardHeader>
                <CardContent>
                    <Typography variant="body2">First Name: {user.first_name}</Typography>
                    <Typography variant="body2">Last Name: {user.last_name}</Typography>
                    <Typography variant="body2">Email Address: {user.email}</Typography>
                    <Typography variant="body2">{`Location: ${user.city}, ${user.state}`}</Typography>

                    
                    {/* {selectedUser.logins.map(login => {
                  return <Typography variant="caption" display="block">{new Date(login.date).toDateString()}</Typography>
                })} */}
                </CardContent>
            </Card>
        </>
    }
}

export default UserProfile;