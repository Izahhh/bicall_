import React, { useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import * as Font from 'expo-font';
import { Color, FontSize, FontFamily } from "../GlobalStyles";
import { useNavigation } from '@react-navigation/native';

const TelaSerie = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        'Baloo': require('../assets/Fonts/Baloo.ttf'),
      });
    };
    loadFont();
  }, []);

  return (
    <View style={styles.telaprincipal}>
      <View style={styles.banner}>
        

        <Text style={styles.titulo}>BIOMETRIC CALL</Text>
      </View>
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
    </View>
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
    width: '110%',
    height: 60,
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30
  },
  txtButton: {
    color: "white",
    fontSize: 20,
  },
  banner: {
    alignItems: "center",
    marginTop: 30,
    flexDirection: "row",
  },
  logo: {
    width: 60,
    height: 60,
    marginTop: 10,
    marginRight: 10
  },
  titulo: {
    
    fontSize: 30,
    color: "#FFA404",
    fontFamily: 'Baloo',
    fontWeight:'bold'
  },
  divBtns: {
    width: '80%',
    alignItems: 'center',
    marginTop: 150
  },
});

export default TelaSerie;
