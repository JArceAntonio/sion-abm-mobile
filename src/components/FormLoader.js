import React from 'react';
import {View} from 'react-native';
import {Spinner} from 'native-base';
import styles from '../utils/styles';

const FormLoader = () => {
  return (
    <View style={styles.center}>
      <Spinner color={'blue'}/>
    </View>
  );
};

export default FormLoader;
