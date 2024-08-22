import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView, Dimensions } from "react-native";
import { useNavigation } from '@react-navigation/native';

const ApagarAluno = () => {
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
            <Text style={styles.titulo}>A P A G A R</Text>
            <Text style={styles.subTitulo}>A L U N O</Text>
            <TouchableOpacity style={styles.voltarIconContainer} onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/imgs/voltar.png')}
                style={styles.voltar}
              />
            </TouchableOpacity>
            <Image
              source={require('../assets/imgs/iconapagar.png')}
              style={styles.image}
            />
          </SafeAreaView>

          <View style={styles.form}>
            <TextInput
              style={styles.txtcod}
              placeholder="Código do Aluno (a)"
              placeholderTextColor="#000"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.txtnome}
              placeholder="Nome completo do Aluno (a)"
              placeholderTextColor="#000"
            />
          </View>

          <TouchableOpacity style={styles.btnCon}>
            <Text style={styles.txtCon}>Continuar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.footer} />
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
    paddingBottom: 60, // Espaço para o footer
  },
  banner: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    marginTop: 65,
    width: 207,
    height: 244,
  },
  titulo: {
    marginTop: 70,
    fontSize: 30,
    color: '#FFA404',
    marginBottom: -55,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subTitulo: {
    marginTop: 70,
    fontSize: 25,
    color: '#FFA404',
    marginBottom: -70,
    textAlign: 'center',
  },
  form: {
    marginBottom: 20, // Espaço acima do botão
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
  txtcod: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingLeft: 20,
    marginBottom: 20,
    fontSize: 16,
    borderColor: '#40A2E3',
    borderWidth: 1,
    width: 200,
  },
  btnCon: {
    height: 50,
    backgroundColor: '#40A2E3',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // Espaço acima do footer
  },
  txtCon: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  voltarIconContainer: {
    position: 'absolute',
    top: 115, // Ajustar altura
    left: 7,
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
});

export default ApagarAluno;
