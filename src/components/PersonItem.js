import React, {useState, useEffect} from 'react';
import storage from '@react-native-firebase/storage';
import {ListItem, Left, Thumbnail, Text, Body} from 'native-base';
import noimage from '../assets/images/noimage.png';

const PersonItem = ({user, navigation}) => {
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    if(user.image){
      storage()
        .ref(user.image)
        .getDownloadURL()
        .then(url => setAvatar(url));
    }
  },[user])

  return (
    <ListItem onPress={() => navigation.navigate('PersonDetail', {id: user.key})} avatar>
      <Left>
        <Thumbnail source={user.image && avatar ? {uri: avatar} : noimage} />
      </Left>
      <Body>
        <Text>{user.name}</Text>
        <Text note>{user.email}</Text>
      </Body>
    </ListItem>
  );
};

export default PersonItem;
