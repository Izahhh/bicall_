import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Modal, Image } from "react-native";
import { useNavigation } from '@react-navigation/native';
import * as Google from 'expo-auth-session/providers/google';
import { getAuth, GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const conectarGestor = () => {
  const navigation = useNavigation();
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // Configuração do Google
  const [googleRequest, googleResponse, promptGoogleAsync] = Google.useIdTokenAuthRequest({
    clientId: 'YOUR_GOOGLE_CLIENT_ID', // Substitua pelo seu client ID
  });

  // Configuração do Microsoft - manualmente configurando a URL OAuth
  const [microsoftRequest, microsoftResponse, promptMicrosoftAsync] = useAuthRequest({
    clientId: 'YOUR_MICROSOFT_CLIENT_ID',  // Substitua pelo seu client ID
    redirectUri: 'https://auth.expo.io/@your-username/your-app', // Substitua pela sua URI de redirecionamento
    scopes: ['user.read'],
    extraParams: { prompt: 'login' },
  });

  useEffect(() => {
    if (googleResponse?.type === 'success') {
      const { id_token } = googleResponse.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          navigation.navigate('telaCurso');
        })
        .catch((error) => {
          setModalMessage("Erro ao conectar: " + error.message);
          setModalVisible(true);
        });
    }

    if (microsoftResponse?.type === 'success') {
      const { access_token } = microsoftResponse.params;
      const auth = getAuth();
      const credential = OAuthProvider.credential(access_token);
      signInWithCredential(auth, credential)
        .then(() => {
          navigation.navigate('telaCurso');
        })
        .catch((error) => {
          setModalMessage("Erro ao conectar: " + error.message);
          setModalVisible(true);
        });
    }
  }, [googleResponse, microsoftResponse]);

  const handleGoogleLogin = async () => {
    await promptGoogleAsync();
  };

  const handleMicrosoftLogin = async () => {
    await promptMicrosoftAsync();
  };

  const handleLogin = () => {
    const auth = getAuth();
    if (login.trim() === "" || senha.trim() === "") {
      setModalMessage("Por favor, preencha os campos.");
      setModalVisible(true);
      return;
    }

    // Aqui você pode implementar o login com email/senha se necessário
  };

  const handleCadastro = () => {
    navigation.navigate('cadastrarGestor');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seja bem-vindo!</Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={login}
        onChangeText={setLogin}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry={true}
        value={senha}
        onChangeText={setSenha}
      />
      <TouchableOpacity style={styles.btnSignIn} onPress={handleLogin}>
        <Text style={styles.btnText}>Conectar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialBtn} onPress={handleGoogleLogin}>
        <Image source={require('../assets/imgs/googleIcon.webp')} style={styles.socialIcon} />
        <Text>Login com Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialBtn} onPress={handleMicrosoftLogin}>
        <Image source={require('../assets/imgs/microsoft.webp')} style={styles.socialIcon} />
        <Text>Login com Microsoft</Text>
      </TouchableOpacity>

      <Text onPress={handleCadastro} style={styles.cadastroText}>Cadastre-se</Text>

      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text>{modalMessage}</Text>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Text>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8', // Cor de fundo da tela
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333', // Cor do título
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: '#fff', // Cor de fundo dos campos de entrada
  },
  btnSignIn: {
    backgroundColor: '#2196F3',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  socialIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  cadastroText: {
    textAlign: 'center',
    color: '#2196F3',
    marginTop: 10,
    fontSize: 14,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginHorizontal: 40,
    marginTop: 100,
  },
});

export default conectarGestor;
