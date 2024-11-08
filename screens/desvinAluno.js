import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView, Dimensions } from "react-native";
import { Color, Border, Padding, FontFamily, FontSize } from "../GlobalStyles";
import { useNavigation } from '@react-navigation/native';

const desvinAluno = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps='handled'
        >
          <SafeAreaView style={styles.banner}>

          <View style={[styles.retangulo, styles.retanguloLayout]} />
          <View style={[styles.retangulo1, styles.retanguloLayout]} />
          <View style={[styles.retangulo2, styles.retanguloLayout]} />
          <Image
           style={styles.imgdesIcon}
           contentFit="cover"
           source={require("../assets/imgs/imgdes.png")}
         />
</SafeAreaView>

            <TouchableOpacity style={styles.voltarIconContainer} onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/imgs/voltar.png')}
                style={styles.voltar}
              />
            </TouchableOpacity>
          

          <View style={styles.form}>

          <Text style={styles.title}>Desvincular aluno</Text>
          
          <TextInput
              style={styles.txtnome}
              placeholder="Nome completo do Estudante"
              placeholderTextColor="#000"
            /> 
            <TextInput
              style={styles.txtcod}
              placeholder="Código do Estudante"
              placeholderTextColor="#000"
              keyboardType="numeric"
            />
            

            <TextInput
              style={styles.txtBox}
              placeholder="Senha"
              placeholderTextColor="#000"
              secureTextEntry={true}
            />

            <TextInput
              style={styles.txtBox}
              placeholder="Confirme a Senha"
              placeholderTextColor="#000"
              secureTextEntry={true}
            />

           
          </View>

          <TouchableOpacity style={styles.btnCon}>
            <Text style={styles.txtCon}>Continuar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 2,
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 60,
  },
  banner: {
    alignItems: 'center',
    marginBottom: 100,
    width:'125%'
  },
  image: {
    marginTop: 65,
    width: 207,
    height: 244,
  },
  title: {
    fontSize: 28,
    color: "#000000", // Branco para o texto de boas-vindas
    fontWeight:'bold',
    marginBottom: 30,
  },

  form: {
    marginBottom: 20,
    marginTop:'60%',

  },
  txtnome: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingLeft: 20,
    marginBottom: 20,
    fontSize: 16,
    borderColor: '#40A2E3',
    borderWidth: 1,
  },

  txtBox: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingLeft: 20,
    marginBottom: 20,
    fontSize: 16,
    borderColor: '#40A2E3',
    borderWidth: 1,
  },
  txtcod: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingLeft: 20,
    marginBottom: 20,
    fontSize: 16,
    borderColor: '#40A2E3',
    borderWidth: 1,

  },
  btnCon: {
    height: 50,
    backgroundColor: '#40A2E3',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  txtCon: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
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
  footer: {
    backgroundColor: '#FFA404',
    width: "100%",
    height: 35,
    position: "relative",
    bottom: 0,
  },
  
  retanguloLayout: {
    borderTopRightRadius: 107,
    borderBottomRightRadius: 107,
    borderBottomLeftRadius: 107,
    borderTopLeftRadius: 0,
    backgroundColor: Color.colorDeepskyblue,
    position: "absolute",
  },
  retangulo: {
    right: 120, 
    width: '25%',
    height: 230,
  },
  retangulo1: {
    top: -25,
    width: '125%',
    height: 180,
  },
  retangulo2: {
    right: 15,
    width: '25%',
    height: 300,
  },

  imgdesIcon: {
    top: 57,
    left: 53,
    width: 254,
    height: 187,
    position: "absolute",
    overflow: "hidden",
  },

});

export default desvinAluno;
