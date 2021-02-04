import {request, RESULTS, PERMISSIONS} from 'react-native-permissions';
import {Platform, Alert} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';

export const CAMERA = Platform.OS === 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA;
export const GALLERY = Platform.OS === 'android' ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE : PERMISSIONS.IOS.PHOTO_LIBRARY;
export const LOCATION = Platform.OS === 'android' ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_ALWAYS;

let seleccionarCamara = (callback, options) => {
  request(CAMERA).then(result => {
    if (result === RESULTS.GRANTED) {
      ImageCropPicker.openCamera({
        width: options.width,
        height: options.height ,
        mediaType: 'photo',
        cropping: options.cropping,
        compressImageQuality: 0.6
      }).then(image => {
        callback(image);
      }).catch(e => console.log(e));
    }
  });
};
let seleccionarGaleria = (callback, options) => {

  request(GALLERY).then(result => {
    if (result === RESULTS.GRANTED) {
      ImageCropPicker.openPicker({
        width: options.width ,
        height: options.height ,
        mediaType: 'photo',
        cropping: options.cropping,
        compressImageQuality: 0.6
      }).then(image => {
        callback(image);
      }).catch(e => console.log(e));
    }
  });

};

export const openPicker = (
  callback,
  title = 'Atención',
  message = 'Seleccione de donde desea elegir la foto del usuario.',
  options = {
    height: 300, width: 300, cropping: true
  }
) => {
  Alert.alert(title, message , [
    {
      text: 'Cámara',
      onPress: () => seleccionarCamara(callback, options),
    }, {
      text: 'Memoria',
      onPress: () => seleccionarGaleria(callback, options),
    },
  ]);
};


