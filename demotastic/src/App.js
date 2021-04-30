import './App.css';

import { React, useMemo } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { useMediaQuery, CssBaseline } from '@material-ui/core'
import { lightBlue } from '@material-ui/core/colors';
import { Box, Typography } from '@material-ui/core'
import { AppBar, Toolbar, Button } from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons';

import RedirectValues from './components/RedirectValues';
import ScenariosList from './components/ScenariosList';

const App = () => {
  
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(() =>
      createMuiTheme({
          palette: {
              type: prefersDarkMode ? 'dark' : 'light',
              primary: {
                main: lightBlue[500]
              },
          },
      }),
      [prefersDarkMode],
  );

  const logout = () => {
    window.location.href = 'https://login.microsoftonline.com/cf2c7cc1-cd10-49ed-91fb-cdc781a1ca5b/oauth2/v2.0/logout?post_logout_redirect_uri=http://localhost:3000';
  }

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline /> 
      <Box className="App">
          <AppBar position="static">
              <Toolbar>       
                <Button variant="contained" color="primary" startIcon={<AccountCircle />} onClick={() => { logout(); }}>logout</Button>
              </Toolbar>
          </AppBar> 
          <Box m={2}/>
          <Typography variant="h2">CSE OAuth Flows</Typography>
          <Typography variant="h4">by ianisms</Typography>
          <Box m={5}/>
          <ScenariosList />
          <Box m={5}/>
          <RedirectValues />
      </Box>
    </MuiThemeProvider>
  );
}

export default App;
