import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, KeyboardAvoidingView, Platform, Modal } from "react-native";
import * as Font from 'expo-font';
import { Color, FontFamily } from "../GlobalStyles";
import { useNavigation } from '@react-navigation/native';

const TelaCurso = () => {
  const navigation = useNavigation();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'Baloo': require('../assets/Fonts/Baloo.ttf'),
      });
      setFontLoaded(true);
    };
    loadFont();
  }, []);

  const showAlert = () => {
    setModalVisible(true);
  };

  if (!fontLoaded) {
    return null; 
  }

  return (
    <KeyboardAvoidingView
      style={styles.telaprincipal}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.banner}>
        <Image
          style={styles.logo}
          contentFit="cover"
          source={require("../assets/imgs/logo.png")}
        />
        <Text style={styles.titulo}>B I C A L L </Text>
      </View>

      <TouchableOpacity style={styles.voltarIconContainer} onPress={() => navigation.goBack()}>
        <Image
          source={require('../assets/imgs/voltar.png')} 
          style={styles.voltar}
        />
      </TouchableOpacity>

      <Text style={styles.selecione}>Selecione o curso</Text>

      <View style={styles.divBtns}>
        <TouchableOpacity style={styles.btns} onPress={() => navigation.navigate('TelaPrincipal')}>
          <Text style={styles.txtButton}>Administração</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btns} onPress={() => navigation.navigate('TelaPrincipal')}>
          <Text style={styles.txtButton}>Desenvolvimento de Sistemas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btns} onPress={() => navigation.navigate('TelaPrincipal')}>
          <Text style={styles.txtButton}>Logística</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.infoIconContainer} onPress={showAlert}>
        <Image
          source={require('../assets/imgs/info.png')} 
          style={styles.infoIcon}
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>!</Text>
            <Text style={styles.modalMessage}>
              Selecione o curso que deseja realizar a chamada. Em seguida você será redirecionado (a) para selecionar a turma.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      <View style={styles.footer} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  telaprincipal: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: "center",
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
  voltarIconContainer: {
    position: 'absolute',
    top: 150, 
    left: 20, 
    zIndex: 2,
  },
  voltar: {
    width: 20,
    height: 20,
  },
  btns: {
    backgroundColor: Color.colorDeepskyblue,
    borderRadius: 10,
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: "center",
    marginBottom: 20,
  },
  selecione: {
    fontSize: 25,
    color: Color.colorBlack,
    fontFamily: 'Cambay-Bold',
    fontWeight: "600",
    marginBottom: 40,
    marginTop: -45,
  },
  txtButton: {
    color: "white",
    fontSize: 20,
  },
  banner: {
    alignItems: "center",
    marginTop: 60,
    flexDirection: "row",
    justifyContent: 'flex-start',
    paddingLeft: 45,
    marginLeft: -55,
  },
  logo: {
    width: 41,
    height: 57,
    marginTop: -145,
    marginRight: 10,
  },
  titulo: {
    fontSize: 20,
    color: "#FFA404",
    fontFamily: FontFamily.beVietnamProSemiBold,
    fontWeight: 'bold',
    marginLeft: 1,
    marginTop: 35,
    marginBottom: 170,
  },
  divBtns: {
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  footer: {
    backgroundColor: Color.colorOrange,
    width: "200%",
    height: 65,
    position: "absolute",
    bottom: -3,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Color.colorBlack,
  },
  modalMessage: {
    fontSize: 16,
    color: Color.colorBlack,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: Color.colorDeepskyblue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TelaCurso;
