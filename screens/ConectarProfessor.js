import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  Image, 
} from "react-native";
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ConectarProfessor = () => {
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

  const handleLogin = () => {
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
    navigation.navigate('telaCurso');
  };

  const handleCadastro = () => {
    navigation.navigate('CadastrarProfessor');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
      <View style={styles.imgCentro}>
      <Text style={styles.title}>Seja bem-vindo!</Text>
      <Image source={require('../assets/imgs/hello.png')} style={styles.imgInicial} /></View>
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >

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
            <Text style={styles.orText}>OR</Text>
            <View style={styles.socialIconsContainer}>
              {/* Substitua os ícones abaixo pelos seus ícones reais */}
              <Image source={require('../assets/imgs/googleIcon.webp')} style={styles.socialIcon} />
              <Image source={require('../assets/imgs/microsoft.webp')} style={styles.socialIcon} />
            </View>
          </View>
          <View style={styles.signUpContainer}>
  <Text style={styles.signUpText}>Não possui conta?</Text>
  <TouchableOpacity onPress={handleCadastro}>
    <Text style={styles.signUpButton}>Cadastre-se</Text>
  </TouchableOpacity>
</View>
        </KeyboardAwareScrollView>

        {/* Modal de Alerta Personalizado */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Attention</Text>
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
    backgroundColor: "#2196F3", // Fundo preto como na imagem
  },

  imgCentro:{
    alignItems: "center",
  },

  imgInicial:{
    width:200,
    height:200,
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
    color: "#FFF", // Branco para o texto de boas-vindas
    marginTop: 80,
    fontWeight:'bold'
  },
  inputBox: {
    width: '100%',
    backgroundColor: "#FFF", // Campo de entrada branco
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  input: {
    fontSize: 16,
    color: "#000", // Texto preto nos campos de entrada
  },
  btnSignIn: {
    backgroundColor: "#fff", // Verde mais escuro para o botão
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    width: '100%',
    marginTop: 10,
  },
  btnText: {
    color: "#2196F3", // Texto branco no botão
    fontSize: 18,
    fontWeight:'bold'
  },
  orText: {
    color: "#FFF", // Texto branco para o "OR"
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
    flexDirection: 'row', // Dispor os itens lado a lado
    alignItems: 'center', // Alinhar verticalmente
  },
  signUpText: {
    color: "#FFF", // Texto branco para "Não possui conta?"
    fontSize: 16,
  },
  signUpButton: {
    color: "#FFF", // Texto branco para "Cadastre-se"
    fontSize: 16,
    marginLeft: 10, // Espaçamento entre o texto e o botão
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#24A869",
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ConectarProfessor;