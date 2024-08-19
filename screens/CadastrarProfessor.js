import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import * as Font from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import { Padding, FontSize, Color, FontFamily, Border } from "../GlobalStyles";

const ConectarProfessor = () => {
  const navigation = useNavigation();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [cpf, setCpf] = useState(""); 
  

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

  // Função para formatar o CPF
  const formatCpf = (text) => {
    let cleaned = text.replace(/\D/g, ''); // Remove tudo que não é dígito
    let formatted = cleaned.replace(/(\d{3})(\d)/, '$1.$2')
                           .replace(/(\d{3})(\d)/, '$1.$2')
                           .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    setCpf(formatted);
  };

  // Função para mostrar o alerta com título e mensagem personalizados
  const showAlert = (title, message) => {
    Alert.alert(title, message, [{ text: "OK" }]);
  };

  return (
    <View style={styles.cadprofessor}>
      <View style={styles.banner}>
        <Image
          style={styles.logo}
          contentFit="cover"
          source={require("../assets/imgs/logo.png")}
        />
        <Text style={styles.titulo}>B I O M E T R I C  C A L L </Text>
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
        <TouchableOpacity style={styles.btnContinuar} onPress={() => showAlert('Login', 'Insira suas credenciais para acessar.')}>
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
      
      <TouchableOpacity style={styles.infoIconContainer} onPress={() => showAlert('Ajuda!', 'Insira seu e-mail, CPF e senha para se conectar. Caso não tenha uma conta, clique em "Cadastre-se" para criar uma nova.')}>
        <Image
          source={require('../assets/imgs/info.png')} 
          style={styles.infoIcon}
        />
      </TouchableOpacity>
      <View style={styles.footer} />

    </View>
    
  );
};


const styles = StyleSheet.create({
  txtboxSpacing: {
    marginVertical: 8,
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
    marginTop: 50,
    marginBottom: -220,
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
    bottom: 10, // ajuste para cima ou para baixo
    right: 10, // ajustar para direita
    padding: 10,
    zIndex: 2, //deixa esse icone em cima do bloco amarelo

  },
  infoIcon: {
    width: 30,
    height: 30,
   
  },
});

export default ConectarProfessor;
