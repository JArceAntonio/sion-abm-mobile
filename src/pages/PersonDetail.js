import React, {useEffect, useState} from 'react';
import Layout from '../components/Layout';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import FormLoader from '../components/FormLoader';
import {Card, CardItem, Left, Button, Thumbnail, Text, Icon, Body, Right} from 'native-base';

import noimage from '../assets/images/noimage.png'
import {Alert} from 'react-native';

const PersonDetail = ({navigation, route}) => {
  const {id} = route.params
  const reference = database().ref('/users/'+id);

  useEffect(() => {
    reference.on('value', snapshot => {
      let entry = snapshot.val()
      if(entry){
        if(entry.image){
          storage()
            .ref(entry.image)
            .getDownloadURL()
            .then(url => {
              setUser({key: id, ...entry, avatar: url})
              setLoading(false)
            });
        }else{
          setUser({key: id, ...entry})
          setLoading(false)
        }
      }else{
        console.log('deleted')
      }
    })
  },[]);

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  const handleDelete = () => Alert.alert('Eliminar','Esta seguro de eliminar estos datos?', [
    {
      text: 'No'
    },
    {
      text: 'Si',
      onPress: async () => {
        await reference.remove()
        navigation.goBack()
      }
    }
  ])

  return (
    <Layout backMode={true} navigation={navigation}>
      {
        loading ? <FormLoader/>
        : <Card>
            <CardItem>
              <Left>
                <Thumbnail source={user.image ? {uri: user.avatar} : noimage} />
                <Body>
                  <Text>{user.name}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Nombre</Text>
                <Text note style={{color: 'black'}}>{user.name}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Telefono</Text>
                <Text note style={{color: 'black'}}>{user.phone}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Email</Text>
                <Text note style={{color: 'black'}}>{user.email}</Text>
              </Body>
            </CardItem>
            <CardItem footer style={{justifyContent: 'flex-end'}}>
               <Button icon bordered onPress={() => navigation.navigate('EditForm', {user})}>
                 <Icon name='ios-pencil' />
               </Button>
               <Button icon bordered danger style={{marginLeft: 8}} onPress={handleDelete}>
                 <Icon name='ios-trash-outline' />
               </Button>
            </CardItem>
          </Card>
      }
    </Layout>
  );
};

export default PersonDetail;
