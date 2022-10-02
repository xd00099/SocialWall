import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardHeader, Avatar, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core/';

import DeleteIcon from '@material-ui/icons/Delete';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';

import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const userId = user?.result.sub || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return <><FavoriteIcon fontSize="small" />&nbsp;{likes.length}</>
    }

    return <><FavoriteBorder fontSize="small" />&nbsp;Like</>;
  };

  const openPost = (e) => {
    // dispatch(getPost(post._id, history));

    navigate(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card} raised elevation={6}>
        <CardHeader
        avatar={
          <Avatar alt={post.name} src={post.avatar}>{post.name.charAt(0)}</Avatar>
        }
        title={post.name}
        subheader={moment(post.createdAt).fromNow()}
      />
      <ButtonBase
        component="span"
        name="test"
        className={classes.cardAction}
        disabled  // set disabled because i added comment section to open the post
        onClick={openPost}
      >
        <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
        <CardContent>
          {/* <div className={classes.overlay}>
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
          </div> */}
          {/* <Typography gutterBottom variant="h5" component="h2">{post.title}</Typography> */}
          <Typography variant="body2" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
          <Typography variant="body2" color="textSecondary" component="h2">&nbsp;{post.tags.map((tag) => `#${tag} `)}</Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
          <Likes />
        </Button>
        <Button size="small" color="primary" disabled={!user?.result} onClick={openPost}>
          <CommentOutlinedIcon />
        </Button>
        {(user?.result?.sub === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
            <><DeleteIcon fontSize="small" /> Delete </>
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
