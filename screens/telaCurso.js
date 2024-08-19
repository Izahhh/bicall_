import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import * as Font from 'expo-font';
import { Color, FontFamily } from "../GlobalStyles";
import { useNavigation } from '@react-navigation/native';

const TelaCurso = () => {
  const navigation = useNavigation();
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'Baloo': require('../assets/Fonts/Baloo.ttf'),
      });
      setFontLoaded(true);
    };
    loadFont();
  }, []);

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
        <Text style={styles.titulo}>B I O M E T R I C  C A L L </Text>
      </View>
      <TouchableOpacity style={styles.infoIconContainer} onPress={() => showAlert('Ajuda!', 'Insira seu e-mail, CPF e senha para se conectar. Caso não tenha uma conta, clique em "Cadastre-se" para criar uma nova.')}>
        <Image
          source={require('../assets/imgs/voltar.png')} 
          style={styles.voltar}
        />
      </TouchableOpacity>
      <Text style={styles.selecione}>Selecione o curso</Text>

      <View style={styles.divBtns}>
        <TouchableOpacity style={styles.btns} onPress={() => navigation.navigate('telaSerie')}>
          <Text style={styles.txtButton}>Administração</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btns} onPress={() => navigation.navigate('telaSerie')}>
          <Text style={styles.txtButton}>Desenvolvimento de Sistemas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btns} onPress={() => navigation.navigate('telaSerie')}>
          <Text style={styles.txtButton}>Logística</Text>
        </TouchableOpacity>
      </View>
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
  image: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  btns: {
    backgroundColor: Color.colorDeepskyblue,
    borderRadius: 10,
    width: '110%',
    height: 60,
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  selecione: {
    fontSize: 25,
    color: Color.colorBlack,
    fontFamily: 'Cambay-Bold',
    fontWeight: "600",
    marginBottom: 40, // espacamento entre o texto e os btns
    height: 40,
    marginTop:-50,
    marginLeft:-130,
  },
  txtButton: {
    color: "white",
    fontSize: 20,
  },
  banner: {
    alignItems: "center",
    marginTop: 30,
    flexDirection: "row",
    justifyContent: 'flex-start',
    paddingLeft: 0,
    marginLeft: -50, // MOVER LOGO E TITULO PARA A ESQUERDA
  },
  logo: {
    width: 41,
    height: 57,
    marginTop: -120,
    marginRight: 10,
  },
  logo: {
    width: 41,
    height: 57,
    marginTop: -120,
    marginRight: 10,
  },
  titulo: {  //biometric call
    fontSize: 20,
    color: "#FFA404",
    fontFamily: FontFamily.beVietnamProSemiBold,
    fontWeight: 'bold',
    marginLeft: 2, // Distancia entre o texto e a logo
    marginTop: 40, // Ajustar o texto para baixo ou mais pra cima
    marginBottom:170,
  },
  divBtns: {
    width: '80%',
    alignItems: 'center',
    marginTop: 20, // espaçamento 
  },
  footer: {
    backgroundColor: Color.colorOrange,
    width: "200%",
    height: 65,
    position: "absolute",
    bottom: -3,
  },
});

export default TelaCurso;
