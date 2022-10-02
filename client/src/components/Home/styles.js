import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    // [theme.breakpoints.down('sm')]: {
    //   flexDirection: 'column-reverse',
    // },
  },
  search: {
    [theme.breakpoints.down('sm')]: {
      order: -1,
    },
  },
  posts: {
    position: 'relative',
    [theme.breakpoints.only('xs') && theme.breakpoints.only('sm')]: {
      maxHeight: 'none',
      order: 0,
      overflow: 'hidden'
    },
    [theme.breakpoints.up('md')]: {
      maxHeight: '86vh',
      overflowY: 'scroll'
    },
  },
  postMaker: {
    [theme.breakpoints.down('sm')]: {
      order: -1,
    },
  }
}));
