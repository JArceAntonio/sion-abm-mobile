import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PersonList from '../pages/PersonList';
import PersonDetail from '../pages/PersonDetail';
import CreateForm from '../pages/CreateForm';
import EditForm from '../pages/EditForm';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="PersonList" component={PersonList} />
      <Stack.Screen name="PersonDetail" component={PersonDetail} />
      <Stack.Screen name="CreateForm" component={CreateForm} />
      <Stack.Screen name="EditForm" component={EditForm} />
    </Stack.Navigator>
  );
}
