import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { Padding, FontSize, Color, FontFamily, Border } from "../GlobalStyles";

const ConectarProfessor = () => {
  const navigation = useNavigation();
  const [fontLoaded, setFontLoaded] = useState(false);

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
  }; //navega pra tela de login

  return (
    <View style={styles.cadprofessor}>
      <View style={styles.banner}>
        <Image
          style={styles.logo}
          contentFit="cover"
          source={require("../assets/imgs/logo.png")}
        />
        <Text style={styles.titulo}>BIOMETRIC CALL</Text>
      </View>
      <View style={styles.content}>
        {fontLoaded && (
          <Text style={styles.conectarSuaConta}>Crie sua conta</Text>
        )}
        <View style={[styles.txtbox, styles.txtboxSpacing]}>
          <TextInput style={styles.txtInput} placeholder="E-mail" />
        </View>
        <View style={[styles.txtbox, styles.txtboxSpacing]}>
          <TextInput style={styles.txtInput} placeholder="Senha" secureTextEntry={true} />
        </View>
        <View style={[styles.txtbox, styles.txtboxSpacing]}>
          <TextInput style={styles.txtInput} placeholder="Confirme a senha" secureTextEntry={true} />
        </View>
        <TouchableOpacity style={styles.btnContinuar} onPress={handleLogin}> 
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
      <View style={styles.footer} />
    </View>
  );
};

const styles = StyleSheet.create({
  txtboxSpacing: {
    marginVertical: 8, // espacamento entre os inputs
  },
  cadprofessor: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: Color.colorWhite,
    alignItems: "center",
  },
  banner: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 50, // altura de todos os itens
    marginBottom: -220, // espacamento entre os inputs e o conectar
  },
  logo: {
    width: 40,
    height: 40,
    marginTop: 10,
    marginRight: 10,
  },
  titulo: {
    fontSize: 30,
    color: "#FFA404",
    fontFamily: FontFamily.beVietnamProSemiBold,
    fontWeight: 'bold',
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
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
    width: 305,
    height: 30,
    textAlign: 'center',
  },
  conectar: {
    position: "absolute",
    color: Color.colorWhite,
    fontFamily: 'Cambay-Bold',
    fontWeight: "700",
    fontSize: FontSize.size_base,
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
});

export default ConectarProfessor;
