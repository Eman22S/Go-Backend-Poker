import Loading from './fragments/Loading';
import { useForm } from 'react-hook-form';
import React, { Fragment, useState } from 'react';
import { Container, Grid, TextField, makeStyles, Box, Button } from '@material-ui/core';

import Typographyx from './fragments/Typographyx';
import { useSnackBarContext } from '../contexts/snackbar';
import useGrpcClient from '../contexts/grpc_client';


const useStyles = makeStyles((theme) => ({
    main: {
      paddingTop: theme.spacing(4),
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        padding: theme.spacing(0, 2),
    }
}));

const ChangePassword = () => {
    const classes = useStyles();
    const grpcClient = useGrpcClient();
    const showSnackBar = useSnackBarContext();
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, setValue } = useForm();

    const onSubmit = (data) => {
        if (!data.current_password || !data.confirm_password || !data.new_password) {
            showSnackBar("Please fill all the required fields!");
        }
        else if (data.new_password !== data.confirm_password) {
            showSnackBar("Make sure your new password and confirm password match!");
        }
        else {
            setLoading(true);
            grpcClient.changePassword(
                data.current_password,
                data.new_password,
                onChangePasswordResponse,
                onChangePasswordError
            );
        }
    };

    const onChangePasswordResponse = (response) => {
        let parsedResponse = JSON.parse(response);
        if (!parsedResponse.status && parsedResponse.error_data) {
            showSnackBar(parsedResponse.error_data[0]);
        }
        if (parsedResponse.status) {
            setValue("new_password", "");
            setValue("current_password", "");
            setValue("confirm_password", "");
            showSnackBar("Password changed successfully", "success");
        }
        setLoading(false);
    };

    const onChangePasswordError = (error) => {
        setLoading(false);
        console.log(error);
    }

    return  (
        <Fragment>
            <Container maxWidth="lg" align="center">
                <form className={classes.main} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typographyx variant="h6" color="textSecondary">
                                Change Password
                            </Typographyx>
                        </Grid>
                        <Grid item xs={12}>
                            <form className={classes.form} noValidate>
                                <Box py={1 }>
                                    <Grid item xs={8}>
                                        <TextField
                                            id="outlined-basic"
                                            type="password"
                                            name="current_password"
                                            label="Old Password"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            size="small"
                                            inputRef={register}/>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            id="outlined-basic"
                                            type="password"
                                            name="new_password"
                                            label="New Password"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            size="small"
                                            inputRef={register}/>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            id="outlined-basic"
                                            type="password"
                                            name="confirm_password"
                                            label="Confirm Password"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            size="small"
                                            inputRef={register}/>
                                    </Grid>
                                </Box>
                                <Box mt={3} mb={1}>
                                    <Grid item xs={8}>
                                        <Button type="submit" fullWidth variant="contained" color="primary" size="large" endIcon={loading ? <Loading size={20} /> : null}>
                                            Submit
                                        </Button>
                                    </Grid>
                                </Box>

                            </form>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </Fragment>
    )
};

export default ChangePassword;