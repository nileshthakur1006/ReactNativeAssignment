import React from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  Image,
} from 'react-native';

const ComponentsCommentList = ({item, user, onPress = () => {}, index = 0}) => {
  const {
    id,
    createdAt,
    body,
    author: {username, image},
  } = item;
  return (
    <View style={styles.container}>
      <View style={style.containerView}>
        <View style={styles.topContainerView}>
          <Image source={{uri: image}} style={styles.authorImage} />
          <Text style={[styles.authorName, {marginLeft: 10}]}>{username}</Text>
        </View>
        {user?.username == username ? (
          <Text style={styles.btnDelete} onPress={onPress}>
            Delete
          </Text>
        ) : null}
      </View>
      <Text style={styles.content}>{body}</Text>
      <Text style={styles.dateTime}>DateTime: {createdAt}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  containerView:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  topContainerView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    marginVertical: 5,
  },
  authorName: {
    fontSize: 12,
    color: '#666666',
    marginTop: 8,
  },
  dateTime: {
    fontSize: 12,
    color: '#666666',
    marginTop: 8,
  },
  authorImage: {
    height: 30,
    width: 30,
    borderRadius: 25,
  },
  btnDelete:{ 
    fontSize: 16,
    marginVertical: 5, 
    color: '#fff', 
    backgroundColor:"#000", 
    padding:5, 
    borderRadius:10, 
    fontSize:12 
  }
  
});

export default ComponentsCommentList;
