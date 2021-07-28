import { useState } from 'react';
import React, { Fragment } from 'react';
import { Grid, Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import ChangePassword from '../../components/ChangePassword';
import UserProfile from '../../components/UserProfile';
import SecurityQuestions from '../../components/SecurityQuestions';
import {  VerticalTabs, MyTab } from './Profile.styles';
//import { useStyles, VerticalTabs, MyTab } from './Profile.styles';
import { makeStyles } from "@material-ui/core/styles";

export const a11yProps = (index) => {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
};

export const TabContainer = (props) => {  
    return (
        <Typography component="div" style={{ padding: 24 }}>
            { props.children }
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    background: {
      //backgroundColor: theme.palette.background.paper,
      backgroundImage: `url(${theme.backgroundImg.image})`,
      backgroundRepeat:  theme.backgroundImg.repeat       
    },
    root: {
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
       },
}));


export const Profile = () => {
    const classes = useStyles();
    const [activeIndex, setActiveIndex] = useState(0);

    const handleChange = (event, newValue) => {
        setActiveIndex(newValue);
    };

    return (
        <div className={classes.background}>
        <Fragment>
            <Container maxWidth="lg" align="center" className={classes.root}>
                <Grid container spacing={1} className={classes.main}>
                    <Grid item xs={2}>
                        <VerticalTabs value={activeIndex} onChange={handleChange}>
                            <MyTab label='Profile' />
                            <MyTab label='Change Password' />
                            <MyTab label='Security Questions' />
                            
                        </VerticalTabs>
                    </Grid>
                    <Grid item xs={10}>
                        { activeIndex === 0 && <TabContainer>
                            <UserProfile />
                        </TabContainer> }
                        { activeIndex === 1 && <TabContainer>
                            <ChangePassword/>
                        </TabContainer> }
                        { activeIndex === 2 && <TabContainer>
                            <SecurityQuestions/>
                        </TabContainer> }
                    </Grid>
                </Grid>
            </Container>
            
        </Fragment>
        </div>
    )
};