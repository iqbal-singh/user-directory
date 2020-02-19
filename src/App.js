
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginActivity from './components/login-activity/LoginActivity';
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
            <Route path="/login-activity">
              <LoginActivity />
            </Route>
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
