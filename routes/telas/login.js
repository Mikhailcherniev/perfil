import {StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { auth,} from './firebaseConfig';
import {signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';


SplashScreen.preventAutoHideAsync();

export default function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [usuario, setUsuario] = useState(null);

  const [loaded, error] = useFonts({
    'poppins': require('./assets/fonts/Poppins-Medium.ttf'),
    'light': require('./assets/fonts/Poppins-Light.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  //-------------------------------------

  useEffect(() => {
    const atualizaUsuario = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
    });
    return () => atualizaUsuario();
  }, []);

  const entrar = () => {
    if (!email.trim() || !senha.trim()) {
      alert('Por favor, preencha ambos os campos: email e senha.');
      return;
    }
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        setUsuario(userCredential.user);
        setEmail('');
        setSenha('');
      })
      .catch((error) => alert('Erro ao fazer login: Senha ou email incorretos' + error.message));
  };

  const sair = () => {
    signOut(auth)
      .then(() => setUsuario(null))
      .catch((error) => alert('Erro ao sair: ' + error.message));
  };

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      {usuario ? (
        <>
          <LinearGradient colors={['#155576b3', '#46201B']} style={styles.bemvindo}>
            <Text style={styles.text}>BEM-VINDO!</Text>
            <Text style={styles.text2}>Olá, {usuario.email}</Text>
          </LinearGradient>
          <TouchableOpacity style={styles.botao} onPress={sair}>
            <Text style={styles.botaoTexto}>SAIR</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <LinearGradient colors={['#155576b3', '#46201B']} style={styles.bemvindo}>
            <Text style={styles.text}>BEM-VINDO!</Text>
            <Text style={styles.text2}>Faça login para continuar</Text>
          </LinearGradient>
          <TextInput
            style={styles.input}
            placeholder="DIGITE SEU EMAIL"
            placeholderTextColor="white"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="DIGITE SUA SENHA"
            placeholderTextColor="white"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />
          <TouchableOpacity style={styles.botao} onPress={entrar}>
            <Text style={styles.botaoTexto}>ACESSAR</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'start',
    backgroundColor: '#161616',
  },
  bemvindo: {
    paddingTop: '20%',
    paddingBottom: '10%',
    height: '35%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: 82,
    borderBottomLeftRadius: 82,
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 40,
    fontFamily: 'poppins',
    color: '#fff',
  },
  text2: {
    backgroundColor: 'transparent',
    fontSize: 20,
    color: '#fff',
    fontFamily: 'light',
    marginTop: '10%',
  },
  input: {
    backgroundColor: '#161616',
    width: '85%',
    borderWidth: 1,
    height: '9%',
    color: 'white',
    borderBottomColor: '#ddd',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    borderTopColor: 'transparent',
    marginTop: '12%',
    fontFamily: 'poppins',
    fontSize: 12,
  },
  botao: {
    width: '70%',
    height: '7%',
    borderWidth: 0.4,
    borderColor: '#ddd',
    backgroundColor: 'rgba(119,119,119,1)',
    borderRadius: 25,
    marginTop: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#fff',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
  botaoTexto: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'poppins',
  },
});