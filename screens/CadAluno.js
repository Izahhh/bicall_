import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const CadAluno = () => {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [errorEnd, setErrorEnd] = useState("");  
  const [errorNum, setErrorNum] = useState("");
  const [errorNome, setErrorNome] = useState("");
  const [numEnd, setNumEnd] = useState("");
  const [cep, setCep] = useState("");

  const buscarCEP = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        setErrorEnd("CEP não encontrado");
      } else {
        setEndereco(data.logradouro);
        setBairro(data.bairro);
        setErrorEnd("");
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      setErrorEnd("Erro ao buscar CEP");
    }
  };

  const validar = () => {
    let error = false;
    setErrorNome("");
    setErrorEnd("");
    setErrorNum("");

    if (nome.trim() === "") {
      setErrorNome("Por favor, insira o nome do aluno");
      error = true;
    }
    if (endereco.trim() === "") {
      setErrorEnd("Por favor, insira o endereço do aluno");
      error = true;
    }
    if (numEnd.trim() === "") {
      setErrorNum("Por favor, insira o número da casa");
      error = true;
    }
    
    if (!error) {
      console.log("Dados válidos, continuar...");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.cadaluno}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <SafeAreaView style={styles.banner}>
          <Text style={styles.titulo}>Cadastrar Aluno</Text>
          <Image
            source={require('../assets/imgs/alunoImg.png')}
            style={styles.image}
          />
        </SafeAreaView>

        <SafeAreaView style={styles.form}>
          {errorNome ? <Text style={styles.errorMessage}>{errorNome}</Text> : null}
          <TextInput
            style={[styles.input, { borderColor: errorNome ? 'red' : '#40A2E3' }]}
            placeholder="Nome Completo"
            placeholderTextColor="#000"
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={[styles.input, { borderColor: errorEnd ? 'red' : '#40A2E3' }]}
            placeholder="CEP"
            placeholderTextColor="#000"
            value={cep}
            onChangeText={(text) => setCep(text)}
            onBlur={buscarCEP}
          />

          <View style={styles.divEndNum}>
            {errorEnd ? <Text style={styles.errorMessage}>{errorEnd}</Text> : null}
            <TextInput
              style={[styles.inputEnd, { borderColor: errorEnd ? 'red' : '#40A2E3' }]}
              placeholder="Endereço"
              placeholderTextColor="#000"
              value={endereco}
              onChangeText={setEndereco}
            />
            {errorNum ? <Text style={styles.errorMessage}>{errorNum}</Text> : null}
            <TextInput
              style={[styles.inputNum, { borderColor: errorNum ? 'red' : '#40A2E3' }]}
              placeholder="Número"
              placeholderTextColor="#000"
              value={numEnd}
              onChangeText={setNumEnd}
            />
          </View>

          <TextInput
            style={styles.input}
            placeholder="Bairro"
            placeholderTextColor="#000"
            value={bairro}
            onChangeText={setBairro}
          />
        </SafeAreaView>

        <TouchableOpacity style={styles.btnCon} onPress={validar}>
          <Text style={styles.txtCon}>Continuar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  cadaluno: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  scrollView: {
    flexGrow: 1,
  },
  banner: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    marginTop: 40,
    width: 300,
    height: 300,
  },
  titulo: {
    marginTop: 30,
    fontSize: 30,
    color: '#FFA404',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  divEndNum: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
  inputEnd: {
    flex: 3,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingLeft: 20,
    marginBottom: 20,
    fontSize: 16,
    borderColor: '#40A2E3',
    borderWidth: 1,
  },
  inputNum: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingLeft: 20,
    marginBottom: 20,
    fontSize: 16,
    borderColor: '#40A2E3',
    borderWidth: 1,
    marginLeft: 10,
  },
  btnCon: {
    height: 50,
    backgroundColor: '#40A2E3',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
});

export default CadAluno;
