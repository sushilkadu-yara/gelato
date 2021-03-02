import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  viewPagerStyle: {
    flex: 1
  },
  container: {
    flex: 1
  },

  imageStyle: {
    flex: 1,
    resizeMode: 'contain'
  },

  iconContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  saveIconStyle: {
    paddingRight: 10,
    alignSelf: 'center'
  },

  pageCounterContainerStyle: {
    top: 0,
    height: 65,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center'
  },

  pageCounterTextStyle: {
    textAlign: 'right',
    color: 'white',
    fontSize: 15,
    fontStyle: 'italic',
    paddingRight: '10%'
  }
})
