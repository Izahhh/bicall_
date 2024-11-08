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
        <Text style={styles.titulo}>   B I C A L L</Text>
      </View>
      <TouchableOpacity style={styles.voltarIconContainer} onPress={() => navigation.goBack()}>
        <Image
          source={require('../assets/imgs/voltar.png')} 
          style={styles.voltar}
        />
      </TouchableOpacity>

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

        <TouchableOpacity style={styles.btns} onPress={() => navigation.navigate('desvinAluno')}>
          <Image
            source={require('../assets/imgs/desAluno.png')}
            style={styles.imagedes}
          />
          <Text style={styles.txtButton}>Desvincular Aluno</Text>
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
  image: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  imagedes: {
    width: 60,
    height: 60,
    marginRight: 20,
  },
  voltarIconContainer: {
    position: 'absolute',
    top: 60, 
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
    width: '110%',
    height: 60,
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20, // Ajustado para ficar mais harmônico
  },
  txtButton: {
    color: "white",
    fontSize: 16, // Ajustado para manter a harmonia
  },
  banner: {
    alignItems: "center",
    marginTop: 70, // Ajuste do espaço superior
    marginBottom: 40, // Ajuste do espaço inferior
    flexDirection: "column",
  },
  logo: {
    width: '35%', // Tamanho ajustado para maior harmonização
    height: undefined,
    aspectRatio: 1, // Mantém a proporção da imagem
    resizeMode: 'contain',
  },
  titulo: {
    fontSize: 30, 
    color: "#FFA404",
    fontFamily: FontFamily.beVietnamProSemiBold,
    fontWeight: 'bold',
    marginTop: 10,
  },
  divBtns: {
    width: '80%',
    alignItems: 'center',
    marginTop: 30,
  },
  footer: {
    backgroundColor: Color.colorOrange,
    width: "100%",
    height: 80,
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  infoIconContainer: {
    position: 'absolute',
    bottom: 4,
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
