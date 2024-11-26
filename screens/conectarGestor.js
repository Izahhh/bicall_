import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Modal, Keyboard, TouchableWithoutFeedback, SafeAreaView, Image } from "react-native";
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getAuth, signInWithEmailAndPassword, signInWithCredential } from "firebase/auth";
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";  
import { MicrosoftAuthProvider, OAuthProvider } from "firebase/auth";
import { useAuthRequest } from 'expo-auth-session';

// Carregar fontes
const conectarGestor = () => {
  const navigation = useNavigation();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    async function loadFont() {
      await Font.loadAsync({
        'Cambay-Bold': require('../assets/Fonts/Cambay-Bold.ttf'),
        'Inter-VariableFont_slnt,wght': require('../assets/Fonts/Inter-VariableFont_slnt,wght.ttf'),
      });
      setFontLoaded(true);
    }
    loadFont();
  }, []);

  // Função de login com email e senha
  const handleLogin = () => {
    const auth = getAuth();

    if (login.trim() === "") {
      setModalMessage("Por favor, preencha o campo de login.");
      setModalVisible(true);
      return;
    }

    if (senha.trim() === "") {
      setModalMessage("Por favor, preencha o campo de senha.");
      setModalVisible(true);
      return;
    }

    // Verifica se o usuário está cadastrado no Firebase
    signInWithEmailAndPassword(auth, login, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          navigation.navigate('telaCurso');  // Redireciona para a tela principal
        }
      })
      .catch((error) => {
        setModalMessage("Erro ao conectar: " + error.message);
        setModalVisible(true);
      });
  };

  // Função de login com Google
  const handleGoogleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  useEffect(() => {
    const auth = getAuth();
    getRedirectResult(auth)
      .then((result) => {
        if (result && result.user) {
          navigation.navigate('telaCurso');
        }
      })
      .catch((error) => {
        setModalMessage("Erro ao conectar com Google: " + error.message);
        setModalVisible(true);
      });
  }, []);

  // Função de login com Microsoft
  const handleMicrosoftLogin = async () => {
    const provider = new OAuthProvider('https://bicalloficial.firebaseapp.com/__/auth/handler');
    provider.setCustomParameters({
      prompt: 'select_account',
    });
    try {
      const result = await signInWithRedirect(getAuth(), provider);
      if (result.user) {
        navigation.navigate('telaCurso');
      }
    } catch (error) {
      setModalMessage("Erro ao conectar com Microsoft: " + error.message);
      setModalVisible(true);
    }
  };

  // Função de cadastro
  const handleCadastro = () => {
    navigation.navigate('cadastrarGestor');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.imgCentro}>
          <Text style={styles.title}>Seja bem-vindo!</Text>
          <Image source={require('../assets/imgs/hello.png')} style={styles.imgInicial} />
        </View>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.con}><Text style={styles.titulo}>Conecte-se</Text></View>

          <View style={styles.content}>
            <View style={[styles.inputBox, styles.inputBoxSpacing]}>
              <TextInput
                style={styles.input}
                placeholder="E-mail"
                value={login}
                onChangeText={setLogin}
              />
            </View>
            <View style={[styles.inputBox, styles.inputBoxSpacing]}>
              <TextInput
                style={styles.input}
                placeholder="Senha"
                secureTextEntry={true}
                value={senha}
                onChangeText={setSenha}
              />
            </View>
            <TouchableOpacity style={styles.btnSignIn} onPress={handleLogin}>
              <Text style={styles.btnText}>Conectar</Text>
            </TouchableOpacity>
            <Text style={styles.orText}>Ou</Text>
            <View style={styles.socialIconsContainer}>
              <TouchableOpacity onPress={handleGoogleLogin}>
                <Image source={require('../assets/imgs/googleIcon.webp')} style={styles.socialIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleMicrosoftLogin}>
                <Image source={require('../assets/imgs/microsoft.webp')} style={styles.socialIcon} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Não possui conta?</Text>
            <TouchableOpacity onPress={handleCadastro}>
              <Text style={styles.signUpButton}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Atenção!</Text>
              <Text style={styles.modalMessage}>{modalMessage}</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2196F3",
  },

  con: {
    alignItems: "left",
    width: "100%",
    marginLeft: 82,
  },
  imgCentro: {
    alignItems: "center",
  },

  imgInicial: {
    width: 200,
    height: 200,
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    borderRadius: 30,
    padding: 20,
    alignItems: "center",
    width: '90%',
  },
  title: {
    fontSize: 28,
    color: "#FFF",
    marginTop: 80,
    fontWeight: 'bold',
  },

  titulo: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  inputBox: {
    width: '100%',
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  input: {
    fontSize: 16,
    color: "#000",
  },
  btnSignIn: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    width: '100%',
    marginTop: 10,
  },
  btnText: {
    color: "#2196F3",
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    color: "#FFF",
    marginTop: 20,
    marginBottom: 10,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
  signUpContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  signUpText: {
    color: '#FFF',
    marginRight: 5,
  },
  signUpButton: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalMessage: {
    marginVertical: 10,
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 10,
    width: "100%",
  },
  modalButtonText: {
    color: "#FFF",
    textAlign: "center",
  },
});

export default conectarGestor;
