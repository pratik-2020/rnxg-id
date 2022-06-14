import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Header from './Components/Header';
import Footer from './Components/Footer';
import QrcodeScanner from './Components/QrcodeScanner';
import Menu from './Components/Menu';
export default function App() {
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Header />
        <QrcodeScanner />
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: '#fff'
  },
});
