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
import { Padding, FontSize, Color, FontFamily, Border } from "../GlobalStyles";

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
        <KeyboardAwareScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.banner}>
            <Image
              style={styles.logo}
              source={require("../assets/imgs/logo.png")}
            />
            <Text style={styles.titulo}>B I O M E T R I C  C A L L</Text>
          </View>
          <View style={styles.content}>
            {fontLoaded && (
              <Text style={styles.conectarSuaConta}>Conecte-se</Text>
            )}
            <View style={[styles.txtbox, styles.txtboxSpacing]}>
              <TextInput
                style={styles.txtInput}
                placeholder="E-mail"
                value={login}
                onChangeText={setLogin}
              />
            </View>
            <View style={[styles.txtbox, styles.txtboxSpacing]}>
              <TextInput
                style={styles.txtInput}
                placeholder="Senha"
                secureTextEntry={true}
                value={senha}
                onChangeText={setSenha}
              />
            </View>
            <TouchableOpacity style={styles.btnContinuar} onPress={handleLogin}>
              <View style={styles.btnContinuarBackground} />
              <Text style={styles.conectar}>Conectar</Text>
            </TouchableOpacity>
            <Text style={styles.noContaContainer}>
              <Text style={styles.noConta}> Não tem conta?</Text>
              <TouchableOpacity onPress={handleCadastro}>
                <Text style={styles.cadastreSe}> Cadastre-se!</Text>
              </TouchableOpacity>
            </Text>
          </View>

          <View style={styles.footer} />

          {/* Ícone de Informação */}
          <TouchableOpacity
            style={styles.infoIconContainer}
            onPress={() => {
              setModalMessage('Insira seu e-mail, CPF e senha para se conectar. Caso não tenha uma conta, clique em "Cadastre-se" para criar uma nova.');
              setModalVisible(true);
            }}
          >
            <Image
              source={require('../assets/imgs/info.png')}
              style={styles.infoIcon}
            />
          </TouchableOpacity>

          {/* Modal de Alerta Personalizado */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Atenção</Text>
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
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  inner: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingBottom: 0, // Espaço para o footer
    position: 'absolute'

  },
  scrollContainer: {
    flexGrow: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  txtboxSpacing: {
    marginVertical: 8,
  },
  banner: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 50,
    marginBottom: 20,
    justifyContent: 'flex-start',
    paddingLeft: 0,
    marginLeft: -30,
  },
  logo: {
    width: 41,
    height: 57,
    marginTop: 10,
    marginRight: 10,
  },
  titulo: {
    fontSize: 20,
    color: "#FFA404",
    fontFamily: FontFamily.beVietnamProSemiBold,
    fontWeight: 'bold',
    marginLeft: 2,
    marginTop: 35,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingBottom: 80, // Espaço para o footer
  },
  conectarSuaConta: {
    fontSize: 27,
    color: Color.colorBlack,
    fontFamily: 'Cambay-Bold',
    fontWeight: "600",
    textAlign: "left",
    marginBottom: 55,
  },
  txtbox: {
    width: 291,
    height: 35,
    borderWidth: 1,
    borderColor: Color.colorDeepskyblue,
    borderRadius: Border.br_xl,
    padding: Padding.p_3xs,
    justifyContent: "center",
    backgroundColor: Color.colorWhite,
  },
  txtInput: {
    fontFamily: FontFamily.beVietnamProRegular,
    color: Color.colorDimgray,
    fontSize: FontSize.size_base,
    textAlign: 'center',
    fontSize: 10,
  },
  btnContinuar: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  btnContinuarBackground: {
    backgroundColor: Color.colorDeepskyblue,
    borderRadius: Border.br_xl,
    width: 296,
    height: 30,
    textAlign: 'center',
  },
  conectar: {
    position: "absolute",
    color: Color.colorWhite,
    fontFamily: 'Cambay-Bold',
    fontWeight: "700",
    fontSize: 13,
  },
  noContaContainer: {
    fontSize: FontSize.size_sm,
    textAlign: "center",
    marginTop: 20,
  },
  noConta: {
    color: Color.colorBlack,
    fontFamily: 'Inter-VariableFont_slnt,wght',
  },
  cadastreSe: {
    color: Color.colorSlateblue,
    fontFamily: 'Inter-VariableFont_slnt,wght',
    fontWeight: "700",
    fontWeight: 'bold',
    marginBottom: -3,
    marginTop: 20,
  },
  footer: {
    backgroundColor: Color.colorOrange,
    width: "100%",
    height: 65,
    position: "absolute",
    bottom: 0,
  },
  infoIconContainer: {
    position: 'absolute',
    bottom: 10, // Ajuste para cima ou para baixo
    right: 10, // Ajustar para direita
    padding: 10,
    zIndex: 2, // Deixa esse ícone em cima do bloco amarelo
  },
  infoIcon: {
    width: 30,
    height: 30,
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
    backgroundColor: Color.colorDeepskyblue,
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ConectarProfessor;
