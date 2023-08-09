import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';

const ComponentsFeedList = ({item, onPress = () => {}, index = 0}) => {
  const {
    title,
    description,
    author: {username, image},
    tagList,
    favoritesCount,
  } = item;
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Image source={{uri: image}} style={styles.authorImage} />
          <Text style={[styles.author, {marginLeft: 10}]}>{username}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.content}>{description}</Text>
        <Text style={styles.tagsList}>Tags: {tagList.toString()}</Text>
        <Text style={styles.LikeCount}>Likes: {favoritesCount}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#c5c4c8',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
  },
  author: {
    fontSize: 12,
    color: '#000000',
    marginTop: 0,
    fontWeight:"bold"
  },
  authorImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagsList: {
    fontSize: 12,
    color: '#166de0',
    marginTop: 8,
  },
  LikeCount: {
    fontSize: 12,
    color: '#000000',
    marginTop: 8,
    fontWeight:"bold"
  },
});

export default ComponentsFeedList;
