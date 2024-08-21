import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Padding, FontSize, Color, FontFamily, Border } from "../GlobalStyles";

const CadAluno = () => {
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [errorNome, setErrorNome] = useState("");
  const [errorCodigo, setErrorCodigo] = useState("");
  const [fontLoaded, setFontLoaded] = useState(false);

  const navigation = useNavigation();

  const validar = () => {
    let error = false;
    setErrorNome("");
    setErrorCodigo("");

    if (nome.trim() === "") {
      setErrorNome("Por favor, insira o nome do aluno");
      error = true;
    }
    if (codigo.trim() === "") {
      setErrorCodigo("Por favor, insira o código do aluno");
      error = true;
    }
    return !error;
  };

  const salvar = () => {
    if (validar()) {
      const data = {
        nome: nome,
        codigo: codigo
      };
      // Substitua esta chamada com a chamada para o serviço apropriado
      usuarioService.cadastrarAluno(data)
        .then(response => {
          // Lógica de tratamento da resposta
        })
        .catch(error => {
          // Lógica de tratamento de erro
        });
    }
  };

  return (
    <View style={styles.cadaluno}>
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

      <SafeAreaView style={styles.form}>
        <TextInput
          style={[styles.input, { borderColor: errorNome ? 'red' : '#40A2E3' }]}
          placeholder="Nome Completo "
          placeholderTextColor="#000"
          value={nome}
          onChangeText={setNome}
        />
        {errorNome ? <Text style={styles.errorMessage}>{errorNome}</Text> : null}

        <TextInput
          style={[styles.input, { borderColor: errorCodigo ? 'red' : '#40A2E3' }]}
          placeholder="Código do Aluno (a)"
          placeholderTextColor="#000"
          value={codigo}
          onChangeText={setCodigo}
        />
        {errorCodigo ? <Text style={styles.errorMessage}>{errorCodigo}</Text> : null}
      </SafeAreaView>

      <TouchableOpacity style={styles.btnCon} onPress={salvar}>
        <Text style={styles.txtCon}>Continuar</Text>
      </TouchableOpacity>
      <View style={styles.footer} />

    </View>
  );
};

const styles = StyleSheet.create({
  cadaluno: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  banner: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    marginTop:40,
    width:207,
    height: 244,
  },
  titulo: {
    marginTop:65,
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
    marginBottom:50,
    top:-40,
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
  infoIconContainer: {
    position: 'absolute',
    bottom: 8,
    right: 10,
    padding: 10,
    zIndex: 2,
  },
  infoIcon: {
    width: 30,
    height: 30,
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
    backgroundColor: Color.colorOrange,
    width: "400%",
    height: 35,
    position: "absolute",
    bottom: 0,
  },
});

export default CadAluno;
