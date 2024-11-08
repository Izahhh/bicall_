import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';

const AtualizarAluno = () => {
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [errorNome, setErrorNome] = useState("");
  const [errorCodigo, setErrorCodigo] = useState("");
  const navigation = useNavigation();

  const validar = () => {
    let error = false;
    setErrorNome("");
    setErrorCodigo("");

    if (nome.trim() === "") {
      setErrorNome("Por favor, insira o nome do estudante");
      error = true;
    }
    if (codigo.trim() === "") {
      setErrorCodigo("Por favor, insira o código do estudante");
      error = true;
    }
    return !error;
  };

  const salvar = () => {
    if (validar()) {
      // Navegar para a tela CadastrarAluno
      navigation.navigate('CadAluno');
    }
  };

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
            <Text style={styles.titulo}>   A T U A L I Z A R </Text>
            <Text style={styles.subTit}>    A L U N O </Text>

            <TouchableOpacity style={styles.voltarIconContainer} onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/imgs/voltar.png')} 
                style={styles.voltar}
              />
            </TouchableOpacity>

            <Image
              source={require('../assets/imgs/iconatualizar.png')}
              style={styles.image}
            />
          </SafeAreaView>

          <View style={styles.form}>
            <TextInput
              style={[styles.input, { borderColor: errorNome ? 'red' : '#40A2E3' }]}
              placeholder="Nome Completo do Estudante"
              placeholderTextColor="#000"
              value={nome}
              onChangeText={setNome}
            />
            {errorNome ? <Text style={styles.errorMessage}>{errorNome}</Text> : null}

            <TextInput
              style={[styles.input, { borderColor: errorCodigo ? 'red' : '#40A2E3' }]}
              placeholder="Código do Estudante"
              placeholderTextColor="#000"
              value={codigo}
              onChangeText={setCodigo}
              keyboardType="numeric"
            />
            {errorCodigo ? <Text style={styles.errorMessage}>{errorCodigo}</Text> : null}
          </View>

          <TouchableOpacity style={styles.btnCon} onPress={salvar}>
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
    flex: 1,
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
    marginTop: 40,
    width: 207,
    height: 244,
  },
  titulo: {
    marginTop: 65,
    fontSize: 30,
    color: '#FFA404',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subTit: {
    fontSize: 25,
    color: '#FFA404',
    marginBottom: 0,
    textAlign: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 20, // Espaço acima do botão
  },
  input: {
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
    marginBottom: 10, // Espaço acima do footer
  },
  txtCon: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginLeft: 10,
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

export default AtualizarAluno;
