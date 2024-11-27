import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Modal, Keyboard, TouchableWithoutFeedback, SafeAreaView, Image } from "react-native";
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Carregar fontes
const ConectarGestor = () => {
  const navigation = useNavigation();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleAuthError = (message, error) => {
    console.error(message, error.message);
    setModalMessage(`${message}: ${error.message}`);
    setModalVisible(true);
  };

  // Função de login com e-mail e senha
  const handleLogin = async () => {
    if (login === "" || senha === "") {
      setModalMessage("Por favor, preencha todos os campos.");
      setModalVisible(true);
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(login)) {
      setModalMessage("O e-mail fornecido não é válido.");
      setModalVisible(true);
      return;
    }

    try {
      setLoading(true);
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, login, senha);
      const user = userCredential.user;

      // Verificando se o usuário é autenticado sem precisar da verificação de email
      if (user) {
        setLoading(false);
        navigation.navigate('telaCurso');  // Redireciona para a tela de cursos após login bem-sucedido
      }
    } catch (error) {
      setLoading(false);
      if (error.code === 'auth/user-not-found') {
        handleAuthError("Usuário não encontrado", error);
      } else if (error.code === 'auth/wrong-password') {
        handleAuthError("Senha incorreta", error);
      } else if (error.code === 'auth/invalid-email') {
        handleAuthError("E-mail inválido", error);
      } else {
        handleAuthError("Erro ao conectar", error);
      }
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
          <View style={styles.con}>
            <Text style={styles.titulo}>Conecte-se</Text>
          </View>

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
            <TouchableOpacity style={styles.btnSignIn} onPress={handleLogin} disabled={loading}>
              <Text style={styles.btnText}>{loading ? "Conectando..." : "Conectar"}</Text>
            </TouchableOpacity>
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
    textAlign: "center",
  },
  modalButton: {
    marginTop: 10,
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default ConectarGestor;
