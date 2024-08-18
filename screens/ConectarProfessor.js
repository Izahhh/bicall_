import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions
} from "react-native";
import { Image } from "expo-image";
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { Padding, FontSize, Color, FontFamily, Border } from "../GlobalStyles";

const ConectarProfessor = () => {
  const navigation = useNavigation();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");

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
      Alert.alert("ATENÇÃO", "Por favor, preencha o campo de login.");
      return;
    }
    if (senha.trim() === "") {
      Alert.alert("Atenção", "Por favor, preencha o campo de senha.");
      return;
    }
    navigation.navigate('telaCurso');
  };

  const handleCadastro = () => {
    navigation.navigate('CadastrarProfessor'); 
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      >
        <ScrollView
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
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
    paddingBottom: Dimensions.get('window').height * 0.1, 
  },
  txtboxSpacing: {
    marginVertical: 8,
  },
  banner: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 50,
    marginBottom: -90,
    justifyContent: 'flex-start',
    paddingLeft: 0,
    marginLeft: -30, // MOVER LOGO E TITULO PARA A ESQUERDA
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
    marginLeft: 2, // Distancia entre o texto e a logo
    marginTop: 35, // Ajustar o texto para baixo ou mais pra cima
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
});

export default ConectarProfessor;
