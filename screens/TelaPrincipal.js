import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import * as Font from 'expo-font';
import { Color, FontFamily } from "../GlobalStyles";
import { useNavigation } from '@react-navigation/native';

const TelaPrincipal = () => {
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
          source={require("../assets/imgs/logotipo.png")}
        />
        <Text style={styles.titulo}>B I C A L L </Text>
      </View>

      <View style={styles.divBtns}>
        <TouchableOpacity style={styles.btns} onPress={() => navigation.navigate('CadAluno')}>
          <Image
            source={require('../assets/imgs/cadImg.png')}
            style={styles.image}
          />
          <Text style={styles.txtButton}>Cadastrar Aluno</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btns} onPress={() => navigation.navigate('AtualizarAluno')}>
          <Image
            source={require('../assets/imgs/upImg.png')}
            style={styles.image}
          />
          <Text style={styles.txtButton}>Atualizar Aluno</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.btns} onPress={() => navigation.navigate('VerificarAluno')}>
          <Image
            source={require('../assets/imgs/verImg.png')}
            style={styles.image}
          />
          <Text style={styles.txtButton}>Verificar Chamada</Text>
        </TouchableOpacity>

  

        <TouchableOpacity style={styles.btns} onPress={() => navigation.navigate('ApagarAluno')}>
          <Image
            source={require('../assets/imgs/delImg.png')}
            style={styles.image}
          />
          <Text style={styles.txtButton}>Apagar Aluno</Text>
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
  btns: {
    backgroundColor: Color.colorDeepskyblue,
    borderRadius: 10,
    width: '110%', // Largura restaurada como estava antes
    height: 60,
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  txtButton: {
    color: "white",
    fontSize: 20,
  },
  banner: {
    alignItems: "center",
    marginTop: 90,
    flexDirection: "row",
  },
  logo: {
    width: 41,
    height: 57,
    marginRight: 10,
    marginTop:-35,
  },
  titulo: {
    fontSize: 20,
    color: "#FFA404",
    fontFamily: FontFamily.beVietnamProSemiBold,
    fontWeight: 'bold',
    marginTop: 35,
    marginBottom: 60, 
  },
  divBtns: {
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  footer: {
    backgroundColor: Color.colorOrange,
    width: "100%",
    height: 65,
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  infoIconContainer: {
    position: 'absolute',
    bottom: 4, // Ajuste para garantir que o ícone não sobreponha o footer
    right: 10,
    padding:10,
    zIndex: 2,
  },
  infoIcon: {
    width: 30,
    height: 30,
  },
});

export default TelaPrincipal;
