import React, {
  useEffect, 
  useRef,
  useState
} from 'react';
import {
  SafeAreaView,
  View, 
  StyleSheet,
  Text,
  TextInput,
  Image,
  FlatList,
  Button,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import screens, {windowHeight, windowWidth} from '../Components';

import CustomLoader from '../Components/CustomLoader';
import ComponentsCommentList from '../Components/ComponentsCommentList';

import {
  deleteFeedPostCommentAction,
  getFeedPostAction,
  getFeedPostCommentsAction,
  postComment,
  updatePostDetails,
} from '../Redux/Actions/appAction';

import PostItem from '../Components/ComponentsFeedList';

const PostCommentView = props => {
  const {isLoading, screen} = useSelector(state => state.loaderReducer);
  const {selectedPost, comments, user} = useSelector(
    state => state.appReducer,
  );
  const [commentText, setCommentText] = useState('');
  const dispatch = useDispatch();
  const ref = useRef();

  useEffect(() => {
    dispatch(
      getFeedPostAction(props.route.params.slug, () =>
        dispatch(getFeedPostCommentsAction(props.route.params.slug)),
      ),
    );
    return () => {
      dispatch(updatePostDetails(null));
    };
  }, []);

  const btnPostComment = () => {
    if (commentText.trim() === '') {
      return;
    } else {
      const params = {comment: {body: commentText}};
      dispatch(
        postComment(props.route.params.slug, params, () => {
          ref.current.scrollToOffset({animated: true, offset: 0});
          setCommentText('');
          Keyboard.dismiss();
        }),
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.viewContainer}
        ref={ref}
        contentContainerStyle={{backgroundColor: '#F2F2F2', paddingBottom: 50}}
        data={comments}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item, index}) => (
          <ComponentsCommentList
            item={item}
            index={index}
            user={user}
            onPress={() =>dispatch(deleteFeedPostCommentAction(props.route.params.slug,item.id,),)
            }
          />
        )}
        ListEmptyComponent={() =>
          screen === screens.post && isLoading ? null : (
            <View style={styles.centerContainer}>
              <Text>No Comments Available</Text>
            </View>
          )
        }
        ListHeaderComponent={() =>
          selectedPost ? <PostItem item={selectedPost} /> : null
        }
      />
      <View
        style={styles.commentBox}>
        <TextInput
          style={styles.inputComment}
          placeholder="Type Your Comments"
          value={commentText}
          onChangeText={text => setCommentText(text)}
        />
        <Button title="Post" onPress={btnPostComment} />
      </View>
      {screen === screens.post && isLoading ? <CustomLoader /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  viewContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  centerContainer: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentBox:{
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
    marginHorizontal: 16,
    backgroundColor:"#000"
  },
  inputComment: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    height: 40,
    borderColor: 'gray',
    marginRight: 5,
    paddingHorizontal: 8,
  },
});

export default PostCommentView;
