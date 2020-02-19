
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginActivityDashboard from './components/login-activity-dashboard/LoginActivityDashboard';
import UserDirectory from './components/user-directory/UserDirectory';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <UserDirectory />
            </Route>
            {/* <Route path="/login-activity">
              <LoginActivityDashboard />
            </Route> */}
            <Route>
              <UserDirectory />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );

}

export default App;
