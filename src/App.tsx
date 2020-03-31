
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserDirectoryContainer from './components/user-directory/UserDirectoryContainer';

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
              <UserDirectoryContainer />
            </Route>
            <Route>
              <UserDirectoryContainer />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );

}

export default App;
