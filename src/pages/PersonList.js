import React, {useState, useEffect} from 'react';
import Layout from '../components/Layout';
import {List, Fab, Icon} from 'native-base';
import PersonItem from '../components/PersonItem';
import database from '@react-native-firebase/database'
import FormLoader from '../components/FormLoader';

const PersonList = ({navigation}) => {

  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const reference = database().ref('/users');

  useEffect(() => {
    reference.on('value', snapshot => {
      setLoading(false)
      setUsers(Object.entries(snapshot.val()).map( entry => ({key: entry[0], ...entry[1]})))
    })
  },[]);

  return (
    <Layout navigation={navigation} backMode={false}>
      {
        loading ? <FormLoader/> :
          <List>
            {
              users.map((user, index) => (<PersonItem key={user.key} {...{user, index, navigation}}/>))
            }
          </List>
      }


    </Layout>
  );
};

export default PersonList;
