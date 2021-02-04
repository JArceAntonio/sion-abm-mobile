import React, {useEffect, useState} from 'react';
import Layout from '../components/Layout';
import {
  Card,
  CardItem,
  Left,
  Right,
  Body,
  Form,
  Button,
  Thumbnail,
  Badge,
  Icon,
  H3,
  Item,
  Label,
  Input,
  Text,
} from 'native-base';
import {utils} from '@react-native-firebase/app'
import {Alert, View} from 'react-native';
import {openPicker} from '../utils/permissions';
import styles from '../utils/styles';
import noimage from '../assets/images/noimage.png';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import FormLoader from '../components/FormLoader';

const CreateForm = ({navigation}) => {
  const reference = database().ref('/users');

  useEffect(() => {
    reference.on('value', snapshot => {
      setUsers(Object.entries(snapshot.val()).map( entry => ({key: entry[0], ...entry[1]})))
    })
  }, [])

  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = () => {
    setLoading(true)
    if(!validateForm()){
      setLoading(false)
      return
    }
    let data = {name, phone, email}
    if(avatar){
      let newFileName = Date.now() + '_' + avatar.filename
      const storageReference = storage().ref(newFileName)
      storageReference.putFile(avatar.path)
        .then( () => {
          data.image = newFileName
          reference.push(data, () => {
            setLoading(false)
            navigation.popToTop();
          })
        })
    }else{
      reference.push(data, () => {
        setLoading(false)
        navigation.popToTop();
      })
    }
  }

  const validateForm = () => {
    if(phone.trim().length === 0){
      Alert.alert('Atencion', 'El campo Telefono es requerido.')
      return false
    }
    if(name.trim().length === 0){
      Alert.alert('Atencion', 'El campo Nombre es requerido.')
      return false
    }
    let existUser = users.find( user => user.name === name)
    if(existUser){
      Alert.alert('Atencion', 'El campo nombre ya esta registrado.')
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

  const pickPhoto = () => {
    openPicker(path => {
      setAvatar(path)
    })
  }

  return (
    <Layout navigation={navigation}>

      <View style={[styles.center,{padding: 10, flexDirection: 'row', flex: 1}]} >
        <View>
          <Button large transparent onPress={pickPhoto}>
            <Thumbnail large source={avatar ? {uri : avatar.path} : noimage} />
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
      <Form>
        <Item stackedLabel>
          <Label>Nombre</Label>
          <Input
            value={name}
            onChangeText={text => setName(text)}
          />
        </Item>
        <Item stackedLabel>
          <Label>Telefono</Label>
          <Input
            keyboardType="number-pad"
            value={phone}
            onChangeText={text => setPhone(text)}
          />
        </Item>
        <Item stackedLabel last>
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
            Registrar
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

export default CreateForm;
