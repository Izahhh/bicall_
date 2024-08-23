import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
} from "react-native";
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Padding, FontSize, Color, FontFamily, Border } from "../GlobalStyles";

const ConectarProfessor = () => {
  const navigation = useNavigation();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [cpf, setCpf] = useState("");
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

  const handleLogin = () => {
    navigation.navigate('TelaPrincipal');
  };

  const handleCadastro = () => {
    navigation.navigate('ConectarProfessor'); 
  };

  const formatCpf = (text) => {
    let cleaned = text.replace(/\D/g, ''); // Remove tudo que não é dígito
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
        <View style={styles.banner}>
          <Image
            style={styles.logo}
            contentFit="cover"
            source={require("../assets/imgs/logo.png")}
          />
          <Text style={styles.titulo}>B I O M E T R I C  C A L L</Text>
        </View>
        <View style={styles.content}>
          {fontLoaded && (
            <Text style={styles.conectarSuaConta}>Crie sua conta</Text>
          )}
          <View style={[styles.txtbox, styles.txtboxSpacing]}>
            <TextInput style={styles.txtInput} placeholder="E-mail" />
          </View>
          <View style={[styles.txtbox, styles.txtboxSpacing]}>
            <TextInput 
              style={styles.txtInput} 
              placeholder="CPF" 
              value={cpf} 
              onChangeText={formatCpf} 
              keyboardType="numeric" 
              maxLength={14} // Máximo de 14 caracteres no formato xxx.xxx.xxx-xx
            />
          </View>
          <View style={[styles.txtbox, styles.txtboxSpacing]}>
            <TextInput style={styles.txtInput} placeholder="Senha" secureTextEntry={true} />
          </View>
          <View style={[styles.txtbox, styles.txtboxSpacing]}>
            <TextInput style={styles.txtInput} placeholder="Confirme a senha" secureTextEntry={true} />
          </View>
          <TouchableOpacity style={styles.btnContinuar} onPress={() => showAlert('Atenção!', 'Insira suas credenciais para acessar.')}>
            <View style={styles.btnContinuarBackground} />
            <Text style={styles.conectar}>Conectar</Text>
          </TouchableOpacity>
          <Text style={styles.noContaContainer}>
            <Text style={styles.noConta}>Já possui Cadastro?</Text>
            <TouchableOpacity onPress={handleCadastro}>
              <Text style={styles.cadastreSe}> Conecte-se!</Text>
            </TouchableOpacity>
          </Text>
        </View>

        <TouchableOpacity style={styles.infoIconContainer} onPress={() => showAlert('Ajuda!', 'Crie sua conta preenchendo com seus dados. Caso já possua, clique em "Conecte-se! ".')}>
          <Image
            source={require('../assets/imgs/info.png')} 
            style={styles.infoIcon}
          />
        </TouchableOpacity>
        
        <View style={styles.footer} />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
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
    backgroundColor: Color.colorWhite,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  txtboxSpacing: {
    marginVertical: 15,
  },
  banner: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 58,
    marginBottom: -40,
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
    marginBottom: 23,
    top: 3,
    position:'relative'
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
    textAlign: 'left', // Alinhar o texto à esquerda
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
    width: 305,
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
    position: "relative",
    bottom: 0,
  },
  infoIconContainer: {
    position: 'absolute',
    bottom: 10,
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
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    borderRadius: 20,
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

export default ConectarProfessor;
