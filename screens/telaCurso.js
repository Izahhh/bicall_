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
        <Text style={styles.titulo}>   B I C A L L </Text>
      </View>

      <TouchableOpacity style={styles.voltarIconContainer} onPress={() => navigation.goBack()}>
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
          <Text style={styles.txtButton}>Desenvolvimento De Sistemas</Text>
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
    fontSize: 30,
    color: Color.colorBlack,
    fontFamily: 'Cambay-Bold',
    fontWeight: "600",
    marginBottom: 40,
    marginTop: 90,
  },
  txtButton: {
    color: "white",
    fontSize: 20,
  },
  banner: {
    alignItems: "center",
    marginTop: 60,
    justifyContent: 'center',
    paddingLeft: 45,
    marginLeft: -55,
  },
  logo: {
    width: 41,
    height: 57,
    marginBottom: 10, // Adjust this to control spacing between logo and title
  },
  titulo: {
    fontSize: 25,
    color: "#FFA404",
    fontFamily: FontFamily.beVietnamProSemiBold,
    fontWeight: 'bold',
    marginTop: 10, // Adjust this to control spacing between logo and title
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
