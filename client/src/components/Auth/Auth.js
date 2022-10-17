import React, { useState } from 'react'
import { CssBaseline, Avatar, Button, Grid, Typography, Link} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './input';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import bgimg from '../../images/welcome.jpg'
import { GoogleLogin } from '@react-oauth/google';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: ''};

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isSignup) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate));
        };
    };
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    };
    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const switchMode = () => {
        setIsSignup(!isSignup);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        // console.log(res);
        const token = res?.credential;
        const result = jwt_decode(res?.credential);

        try {
            dispatch({type: 'AUTH', data: {result, token}});

            navigate('/posts');
        } catch (error) {
            console.log(error);
        }
    }


    return (
        // <Container className={classes.main} component="main" maxWidth="xl">
            
        // <Container
        //   item
        //   xs={false}
        //   sm={4}
        //   md={7}
        //   sx={{
        //     backgroundImage: 'url(https://source.unsplash.com/random)',
        //     backgroundRepeat: 'no-repeat',
        //     backgroundSize: 'cover',
        //     backgroundPosition: 'center',
        //   }}
        // />
            // <Paper className={classes.paper} elevation={3}>
            //     <Avatar className={classes.avatar}>
            //         <LockOutlinedIcon />
            //     </Avatar>
            //     <Typography component="h1" variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            //     <form className={classes.form} onSubmit={handleSubmit}>
            //         <Grid container spacing={2}>
            //             {
            //                 isSignup && (
            //                     <>
            //                         <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
            //                         <Input name='lastName' label='Last Name' handleChange={handleChange} half />
            //                     </>
            //                 )
            //             }
            //             <Input name = 'email' label='Email Address' handleChange={handleChange} type='email'></Input>
            //             <Input name = 'password' label='Password' handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
            //             { isSignup && <Input name='confirmPassword' label='Repeart Password' handleChange={handleChange} type='password' /> }
            //         </Grid>
            //         <Button type='submit' fullWidth variant='contained' color='primary' style={{backgroundColor: "#1DA1F2"}} className={classes.submit}>
            //             {isSignup ? 'Sign Up' : 'Sign In'}
            //         </Button>
            //         <Button onClick={() => {navigate('/posts')}} fullWidth variant='contained' color='primary' className={classes.submit} style={{marginTop: 0 , backgroundColor: "#1DA1F2"}}>
            //             Continue as Guest
            //         </Button>
            //         <div style={{display: 'flex', justifyContent: 'center'}}>
            //             <GoogleLogin type='standard' theme='filled_blue' onSuccess={(response) => googleSuccess(response)}></GoogleLogin>
            //         </div>
            //         <Grid container justifyContent='flex-end'>
            //             <Grid item>
            //                 <Button onClick={switchMode}>
            //                     { isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            //                 </Button>
            //             </Grid>
            //         </Grid>
            //     </form>
            // </Paper>
        // </Container>
        <Grid container className={classes.main} style={{ height: '100vh' }} >
            <CssBaseline />
            <Grid
                className={classes.bg}
                item
                sm={4}
                md={7}
                lg={7}
                style={{
                    backgroundImage: `url(${bgimg})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}>
                <h2 className={classes.text}>Welcome to SocialWall!</h2>
            </Grid>
            <Grid xs={12} sm={8} md={5} className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half />
                                    <Input name='lastName' label='Last Name' handleChange={handleChange} half />
                                </>
                            )
                        }
                        <Input name = 'email' label='Email Address' handleChange={handleChange} type='email'></Input>
                        <Input name = 'password' label='Password' handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name='confirmPassword' label='Repeart Password' handleChange={handleChange} type='password' /> }
                    </Grid>
                    <Button type='submit' fullWidth variant='contained' color='primary' style={{backgroundColor: "#1DA1F2"}} className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Button onClick={() => {navigate('/posts')}} fullWidth variant='contained' color='primary' className={classes.submit} style={{marginTop: 0 , backgroundColor: "#1DA1F2"}}>
                        Continue as Guest
                    </Button>
                    <div style={{display: 'flex', justifyContent: 'end'}}>
                        <GoogleLogin type='standard' theme='filled_blue' onSuccess={(response) => googleSuccess(response)}></GoogleLogin>
                    </div>
                    <Grid container justifyContent='flex-end'>
                        <Grid item style={{paddingTop:'5px'}}>
                            <Link href='#' variant="body2" onClick={switchMode}>
                                { isSignup ? "Have an account? Sign In" : "No account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
                <Typography variant="body2" color="text.secondary" align="center" style={{paddingTop:'20px'}}>
                    {'Copyright © SocialWall '}
                    {new Date().getFullYear()}
                </Typography>
            </Grid>
      </Grid>
    )
}

export default Auth