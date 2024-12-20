import React, { useState, useEffect } from "react";
import {Text, StyleSheet, View, TextInput, TouchableOpacity, Image, Modal, Pressable, SafeAreaView,} from "react-native";
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from '../screens/firebaseConfig';  // Importando o Firestore firestoreConfig.js
import { doc, setDoc } from "firebase/firestore";  // Funções do Firestore
import { Padding, FontSize, Color, FontFamily } from "../GlobalStyles";

const cadastrarGestor = () => {
  const navigation = useNavigation();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [alertContent, setAlertContent] = useState({ title: '', message: '' });

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

  const handleCadastro = () => {
    if (password !== confirmPassword) {
      showAlert('Erro', 'As senhas não correspondem.');
      return;
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        // Salvar o CPF no Firestore
        try {
          await setDoc(doc(db, "nome", user.uid), {
            email: email,
            cpf: cpf,
          });
          showAlert('Sucesso', 'Cadastro realizado com sucesso!');
          navigation.navigate('telaCurso');
        } catch (error) {
          showAlert('Erro', 'Erro ao salvar o CPF! Insira novamente!: ' + error.message);
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        showAlert('Erro', errorMessage);
      });
  };

  const formatCpf = (text) => {
    let cleaned = text.replace(/\D/g, '');
    let formatted = cleaned.replace(/(\d{3})(\d)/, '$1.$2')
                           .replace(/(\d{3})(\d)/, '$1.$2')
                           .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    setCpf(formatted);
  };

  const showAlert = (title, message) => {
    setAlertContent({ title, message });
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.banner}></View> 
        <Image source={require('../assets/imgs/imgCadProf.png')} style={styles.imgCad} />
        <View style={styles.con}>
          <Text style={styles.titulo}>Cadastre-se</Text>
        </View>
        <View style={styles.content}>
          <View style={[styles.txtbox, styles.txtboxSpacing]}>
            <TextInput
              style={styles.txtInput}
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>
          <View style={[styles.txtbox, styles.txtboxSpacing]}>
            <TextInput
              style={styles.txtInput}
              placeholder="CPF"
              value={cpf}
              onChangeText={formatCpf}
              keyboardType="numeric"
              maxLength={14}
            />
          </View>
          <View style={[styles.txtbox, styles.txtboxSpacing]}>
            <TextInput
              style={styles.txtInput}
              placeholder="Senha"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={[styles.txtbox, styles.txtboxSpacing]}>
            <TextInput
              style={styles.txtInput}
              placeholder="Confirme a senha"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
          <TouchableOpacity style={styles.btnContinuar} onPress={handleCadastro}>
            <View style={styles.btnContinuarBackground} />
            <Text style={styles.conectar}>Cadastrar</Text>
          </TouchableOpacity>

          <View style={styles.noContaContainer}>
            <Text style={styles.noConta}>Já possui Cadastro?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('conectarGestor')}>
              <Text style={styles.cadastreSe}> Conecte-se!</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.infoIconContainer}
          onPress={() => showAlert('Ajuda!', 'Crie sua conta preenchendo com seus dados. Caso já possua, clique em "Conecte-se! ".')}
        >
          <Image
            source={require('../assets/imgs/info.png')}
            style={styles.infoIcon}
          />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>{alertContent.title}</Text>
            <Text style={styles.modalMessage}>{alertContent.message}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
        </Modal>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imgCad:{
    width:220,
    height:200,
    top: -90,
  
  },
  txtboxSpacing: {
    marginVertical: 15,
  },
  banner: {
  height: 130,
  width: '100%',
  backgroundColor: '#40A2E3',
  borderBottomRightRadius: 90,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingBottom: 80,
  },
  con: {
    alignItems: "left",
    width: "100%",
    marginLeft: 92,
  },
  titulo: {
    fontSize: 24,
    color: '#2196F3',
    fontWeight: 'bold',
    marginTop:-70
  },
  txtbox: {
    width: 291,
    borderWidth: 1.3,
    borderColor: "#2196F3",
    borderRadius: 10,
    padding: Padding.p_3xs,
    justifyContent: "center",
    backgroundColor: Color.colorWhite,
  },
  txtInput: {
    fontSize: 16,
    color: "#000",
  },
  btnContinuar: {
    marginTop: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  btnContinuarBackground: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    width: 291,
    height: 50,
    textAlign: 'center',
    marginTop: 10,
  },
  conectar: {
    position: "absolute",
    color: Color.colorWhite,
    fontFamily: 'Cambay-Bold',
    fontWeight: "700",
    fontSize: 16,
    top:20,
  },
  noContaContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  noConta: {
    color: "#000",
    fontSize: 16,
  },
  cadastreSe: {
    color: "#2196F3",
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  infoIconContainer: {
    position: 'absolute',
    top: 30,
    right: 10,
    padding: 10,
    zIndex: 2,
  },
  infoIcon: {
    width: 30,
    height: 30,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 25,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default cadastrarGestor;
