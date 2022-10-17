import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  main: {
    display: 'flex'
  },
  bg: {
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
    paddingTop: '45vh',
    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
      padding: 0
    },
    [theme.breakpoints.down('xs')]: {
      width: '100vw',
      height: '400px'
    },
  },
  text: {
    color: 'rgb(20, 195, 230)',
    fontSize: '5em',
    fontFamily: 'cursive',
    [theme.breakpoints.down('md')]: {
      fontSize: '3em',
    },
  }
  ,
  paper: {
    paddingTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    [theme.breakpoints.down('sm')]: {
    },
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleButton: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '50%',
  },
}));