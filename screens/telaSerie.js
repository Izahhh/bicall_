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
          style={styles.manImg}
          contentFit="cover"
          source={require("../assets/imgs/curso.png")}
        />
        
      </View>

      <TouchableOpacity style={styles.voltarIconContainer} onPress={() => navigation.goBack()}>
        <Image
          source={require('../assets/imgs/voltar.png')} 
          style={styles.voltar}
        />
      </TouchableOpacity>

      <Text style={styles.selecione}>Selecione a série</Text>

      <View style={styles.divBtns}>
        <TouchableOpacity style={styles.btns} onPress={() => navigation.navigate('TelaPrincipal')}>
          <Text style={styles.txtButton}>1º ano</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btns} onPress={() => navigation.navigate('TelaPrincipal')}>
          <Text style={styles.txtButton}>2º ano</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btns} onPress={() => navigation.navigate('TelaPrincipal')}>
          <Text style={styles.txtButton}>3º ano</Text>
        </TouchableOpacity>
      </View>
      
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  telaprincipal: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: "center",
  },
  voltarIconContainer: {
    position: 'absolute',
    top: 150, 
    left: 25, 
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
    fontSize: 24,
    color: Color.colorBlack,
    fontFamily: 'Cambay-Bold',
    fontWeight: "600",
    marginBottom: 50,
    marginTop: 130,
  },
  txtButton: {
    color: "white",
    fontSize: 16,
  },
  banner: {
    height: 220, // Mantém a altura do banner
    width: '110%',
    backgroundColor: '#40A2E3',
    borderBottomLeftRadius: 200,
    borderBottomRightRadius: 200,
  },

  manImg:{
    width: 250,
    height: 200,
    position: 'absolute',
    top: 100, // Posiciona a imagem logo abaixo do banner
    alignSelf: 'center', // Centraliza a imagem
  },
  titulo: {
    fontSize: 25,
    color: "#FFA404",
    fontFamily: FontFamily.beVietnamProSemiBold,
    fontWeight: 'bold',
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
});

export default TelaCurso;
