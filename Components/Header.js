import React from 'react'
import { Appbar } from 'react-native-paper';
import { View, StyleSheet} from 'react-native';
function Header() {
  return (
      <View>
          <Appbar.Header>
              <Appbar.Content style={styles.appContent} title='RNXG' subtitle='QR Auth' />
          </Appbar.Header>
      </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    appContent: {
        fontSize: 30,
        marginTop: 0
    }
})
export default Header