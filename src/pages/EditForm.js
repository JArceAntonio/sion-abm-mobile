import React, {useState} from 'react';
import Layout from '../components/Layout';
import {Body, Card, CardItem, Left, Right, Text, Thumbnail, Button, Badge, Icon, H3, Form, Input, Item, Label} from 'native-base';
import {Alert, View} from 'react-native';
import noimage from '../assets/images/noimage.png'
import styles from '../utils/styles';
import database from '@react-native-firebase/database';
import {openPicker} from '../utils/permissions';
import storage from '@react-native-firebase/storage';
import FormLoader from '../components/FormLoader';

const EditForm = ({navigation, route}) => {
  const {user} = route.params
  const reference = database().ref('/users/'+user.key);
  const [phone, setPhone] = useState(user.phone.toString())
  const [email, setEmail] = useState(user.email)
  const [avatar, setAvatar] = useState(null)
  const [loading, setLoading] = useState(false)
  const onSubmit = async () => {
    setLoading(true)
    if(!validateForm()){
      setLoading(false)
      return
    }
    let data = {phone, email}
    if(avatar){
      let newFileName = Date.now() + '_' + avatar.filename
      const storageReference = storage().ref(newFileName)
      storageReference.putFile(avatar.path)
        .then( async () => {
          data.image = newFileName
          await reference.update(data)
          setLoading(false)
          navigation.goBack()
        })
    }else{
      await reference.update(data)
      setLoading(false)
      navigation.goBack()
    }

  }

  const pickPhoto = () => {
    openPicker(path => setAvatar(path))
  }

  const validateForm = () => {
    if(phone.trim().length === 0){
      Alert.alert('Atencion', 'El campo Telefono es requerido.')
      return false
    }
    if(email.trim().length === 0){
      Alert.alert('Atencion', 'El campo Email es requerido.')
      return false
    }
    if ( !/^\d+$/.test(phone.trim())){
      Alert.alert('Atencion', 'El campo Telefono debe tener solo numeros.')
      return false
    }
    if(! /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim())){
      Alert.alert('Atencion', 'El campo email tiene formato incorrecto.')
      return false
    }
    return true
  }

  return (
    <Layout navigation={navigation}>

      <View style={[styles.center,{padding: 10, flexDirection: 'row', flex: 1}]} >
        <View>
          <Button large transparent onPress={pickPhoto}>
            <Thumbnail large source={avatar ? {uri: avatar.path} : (user.image ? {uri: user.avatar} : noimage)} />
            <Badge primary style={{
              position: 'absolute',
              bottom: -10,
              right: -5
            }}>
              <Icon name={'ios-pencil'} style={{color: 'white', fontSize: 14}} />
            </Badge>
          </Button>

        </View>
      </View>
      <H3 style={{textAlign: 'center'}}>
        {user.name}
      </H3>
      <Form>
        <Item stackedLabel>
          <Label>Telefono</Label>
          <Input
            keyboardType="number-pad"
            value={phone}
            onChangeText={text => setPhone(text)}
          />
        </Item>
        <Item stackedLabel>
          <Label>Email</Label>
          <Input
            keyboardType="email-address"
            value={email}
            onChangeText={text => setEmail(text)}
          />
        </Item>

        {
          loading && <FormLoader/>
        }

        <Button onPress={onSubmit} primary block style={{marginVertical: 10}}>
          <Text>
            Editar
          </Text>
        </Button>

        <Button info block onPress={() => navigation.goBack()}>
          <Text>
            Volver
          </Text>
        </Button>
      </Form>

    </Layout>
  );
};

export default EditForm;
