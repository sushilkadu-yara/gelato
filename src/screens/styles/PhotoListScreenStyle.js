import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  loadingStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },

  errorStyle: {
    alignSelf: 'center',
    color: '#FF0000',
    fontSize: 20
  }
})
