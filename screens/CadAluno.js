import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { TextInputMask } from "react-native-masked-text"; 
import {Padding, Color, Border, FontFamily, FontSize} from "../GlobalStyles";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const CadAluno = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [errorEnd, setErrorEnd] = useState("");  
  const [errorNum, setErrorNum] = useState("");
  const [errorNome, setErrorNome] = useState("");
  const [errorCpf, setErrorCpf] = useState("");
  const [numEnd, setNumEnd] = useState("");
  const [cep, setCep] = useState("");

  const navigation = useNavigation();

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
    setErrorCpf("");

    if (nome.trim() === "") {
      setErrorNome("Por favor, insira o nome do estudante");
      error = true;
    }
    if (endereco.trim() === "") {
      setErrorEnd("Por favor, insira o endereço do estudante");
      error = true;
    }
    if (numEnd.trim() === "") {
      setErrorNum("Por favor, insira o número da casa");
      error = true;
    }
    if (cpf.trim() === "" || cpf.length < 14) {
      setErrorCpf("Por favor, insira um CPF válido");
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
        
        <SafeAreaView style={styles.bannerAzul}>
          <TouchableOpacity style={styles.voltarIconContainer} onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/imgs/voltar.png')} 
              style={styles.voltar}
            />
          </TouchableOpacity>


          <Text style={styles.titulo}>Cadastrar Aluno</Text>
          <Image
            source={require('../assets/imgs/imgcad.png')}
            style={styles.image}
          />
        </SafeAreaView>

        <View style={styles.retangulo} />

        <SafeAreaView style={styles.form}>
          {errorNome ? <Text style={styles.errorMessage}>{errorNome}</Text> : null}
          <TextInput
            style={[styles.input, { borderColor: errorNome ? 'red' : '#40A2E3' }]}
            placeholder="Nome do Aluno"
            placeholderTextColor="#000"
            value={nome}
            onChangeText={setNome}
          />

          {errorCpf ? <Text style={styles.errorMessage}>{errorCpf}</Text> : null}
          <TextInputMask
            type={'cpf'}
            style={[styles.input, { borderColor: errorCpf ? 'red' : '#40A2E3' }]}
            placeholder="CPF"
            placeholderTextColor="#000"
            value={cpf}
            onChangeText={setCpf}
          />

          <TextInput
            style={[styles.input, { borderColor: errorEnd ? 'red' : '#40A2E3' }]}
            placeholder="CEP"
            placeholderTextColor="#000"
            value={cep}
            onChangeText={(text) => setCep(text)}
            onBlur={buscarCEP}
            keyboardType="numeric"
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
              placeholder="Nº"
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

        <View></View>
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
  bannerAzul: {
    width: '100%',
    backgroundColor: '#40A2E3',
    height: 151,
    position: "absolute",
  },
  image: {
    marginTop: 40,
    width: 200,
    height: 120,
  },
  titulo: {
    marginTop: 50,
    fontSize: 28,
    color: '#40A2E3',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
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
    top: 130, // ajustar altura
    left: 10,
    zIndex: 2,
  },
  voltar: {
    width: 20,
    height: 20,
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
  retangulo: {

    top: 134,
    
    left: 14,
    
    shadowColor: "rgba(0, 0, 0, 0.25)",
    
    shadowOffset: {
    
    width: 0,
    
    height: 0,
    
    },
    
    shadowRadius: 20.5,
    
    elevation: 20.5,
    
    shadowOpacity: 1,
    
    width: 326,
    
    height: 607,
    
    borderRadius: Border.br_xl,
    
    position: "absolute",
    
    backgroundColor: Color.colorWhite,
    
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
