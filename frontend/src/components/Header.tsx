import React, { useContext } from 'react';
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import { Button, CssBaseline, Toolbar, Typography } from '@material-ui/core';
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../services/firestore';

const useStyles = makeStyles((theme) => ({
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
      flexWrap: "wrap",
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
        margin: theme.spacing(1, 1.5),
      },
  }));

const Header = () => {
    const { currentUser }: any = useContext(AuthContext);
    const classes = useStyles();
    
    return (
        <>
        <CssBaseline />
        <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography 
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            {currentUser?.email}
          </Typography>

          <Button
            href="#"
            onClick={() => auth.signOut()}
            color="primary"
            variant="outlined"
            className={classes.link}
          >
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
        </>
    );
};

export default Header;