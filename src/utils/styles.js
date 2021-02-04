import {StyleSheet} from 'react-native';
import colors from './colors';

export default StyleSheet.create({
  buttonShadow: {
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    borderRadius: 8
  },
  modalHeader: {
    height: 45,
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  inputContainer: {
    flexDirection: 'column',
    marginVertical: 3,
    borderBottomWidth: 1,
  },
  textLabel: {
    fontSize: 14,
    marginBottom: 0,
    marginHorizontal: 0,
  },
  modalFooter: {
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalContent: {
    padding: 15,
  },

  spaceBetween: {
    justifyContent: 'space-between'
  },

  modalContainerNormal: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  simpleModalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  menuItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },

  labelTextInput: (color) => ({
    fontSize: 12,
    fontWeight: 'bold',
    color,
    marginBottom: 3
  }),
  textInputContainer: (borderBottomColor) => ({
    borderBottomWidth: 1,
    borderBottomColor
  }),
  passwordInputContainer: (borderBottomColor) => ({
    borderBottomWidth: 1,
    borderBottomColor,
    flexDirection: 'row',
    alignItems: 'center'

  }),
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  roundedButtonBase: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  roundedButton:{
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center'
  },

  businessCard: {
    width: 200,
    height: 100,
    marginBottom: 20,
    marginTop: 30,
    marginHorizontal: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 10,
    overflow: 'visible'
  },
  businessCardLogoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    borderColor: '#dededede',
    borderWidth: 1,
    position: 'absolute',
    top: -20,
    left: 80,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
    zIndex: 999
  },
  businessCardLogoImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  markerPinContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    borderColor: '#dededede',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  markerPinImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'cover'
  },
  businessPresentationCard: {
    backgroundColor: colors.darkBackgroundColor,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,


  },
  businessPresentationImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderColor: '#ffffff',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  businessPresentationImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -40,
  },
  simpleBackNavbar: {
    height: 45,
    backgroundColor: 'transparent',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row'
  },

  avatar: (size = 'normal', borderColor = colors.primaryButton) => {
    let baseStyle = {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 2,
    };
    switch (size) {
      case 'small':
        baseStyle = {
          width: 60,
          height: 60,
          borderRadius: 30,
          borderWidth: 1,
        };
        break;
      case 'medium':
        baseStyle = {
          width: 120,
          height: 120,
          borderRadius: 60,
          borderWidth: 2,
        };
        break;
      case 'large':
        baseStyle = {
          width: 150,
          height: 150,
          borderRadius: 75,
          borderWidth: 3,
        };
        break;
      default:
        break;
    }
    return {
      ...baseStyle,
      borderColor,
    };
  },

  textStyle: (size=6, color='black') => {
    let fontSize;
    switch (size){
      case 1:
        fontSize = 32
        break
      case 2:
        fontSize = 28
        break
      case 3:
        fontSize = 24
        break;
      case 4:
        fontSize = 20
        break;
      case 5:
        fontSize = 16
        break;
      default:
        fontSize = 12
        break;
    }

    return{
      fontSize,
      color
    }
  }

})
