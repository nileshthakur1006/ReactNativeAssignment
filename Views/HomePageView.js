import React, {useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getFeedPostListAction,
  updatePostPage,
} from '../Redux/Actions/appAction';
import ComponentsFeedList from '../Components/ComponentsFeedList';
import screens, {windowHeight, windowWidth} from '../Components';
import CustomLoader from '../Components/CustomLoader';

 
const HomePageView = props => {
  const dispatch = useDispatch();
  const {isLoading, screen} = useSelector(state => state.loaderReducer);
  const {arrPosts, page, isReachedLast} = useSelector(
    state => state.appReducer,
  ); 

  useEffect(() => {
    dispatch(getFeedPostListAction());
  }, [page]);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.viewHomeContainer}
        data={arrPosts}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item, index}) => (
          <ComponentsFeedList
            item={item}
            index={index}
            onPress={() =>
              props.navigation.navigate(screens.post, {slug: item.slug})
            }
          />
        )}
        ListEmptyComponent={() =>
          screen === screens.postList && isLoading ? null : (
            <View style={styles.centerContainer}>
              <Text>No Feeds Found</Text>
            </View>
          )
        }
        onEndReachedThreshold={1}
        onEndReached={() =>
          !isReachedLast && dispatch(updatePostPage(page + 1))
        }
      />
      {screen === screens.postList && isLoading ? <CustomLoader /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: windowHeight,
    width: windowWidth,
  },
  viewHomeContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  
});

export default HomePageView;
