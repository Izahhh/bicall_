import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { useNavigation } from '@react-navigation/native';

const AtualizarAluno = () => {
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [cep, setCep] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [numEnd, setNumEnd] = useState("");
  const [errorNome, setErrorNome] = useState("");
  const [errorCodigo, setErrorCodigo] = useState("");
  const [errorEnd, setErrorEnd] = useState("");
  const [errorNum, setErrorNum] = useState("");
  const navigation = useNavigation();

  const buscarCEP = async () => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep.replace("-", "")}/json/`);
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
    setErrorCodigo("");
    setErrorEnd("");
    setErrorNum("");

    if (nome.trim() === "") {
      setErrorNome("Por favor, insira o nome do estudante");
      error = true;
    }
    if (codigo.trim() === "") {
      setErrorCodigo("Por favor, insira o código do estudante");
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

    return !error;
  };

  const salvar = () => {
    if (validar()) {
      navigation.navigate('CadAluno');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        
        <View style={styles.bannerAzul}>
          <TouchableOpacity style={styles.voltarIconContainer} onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/imgs/voltar.png')} 
              style={styles.voltar}
            />
          </TouchableOpacity>

          <Image
            source={require('../assets/imgs/imgup.png')}
            style={styles.image}
          />
        </View>

        <View style={styles.retangulo}>
          <Text style={styles.title}>Atualizar aluno</Text>
          <View style={styles.form}>
            {errorNome ? <Text style={styles.errorMessage}>{errorNome}</Text> : null}
            <TextInput
              style={[styles.input, { borderColor: errorNome ? 'red' : '#40A2E3' }]}
              placeholder="Nome Completo do Estudante"
              placeholderTextColor="#000"
              value={nome}
              onChangeText={setNome}
            />

            {errorCodigo ? <Text style={styles.errorMessage}>{errorCodigo}</Text> : null}
            <TextInput
              style={[styles.input, { borderColor: errorCodigo ? 'red' : '#40A2E3' }]}
              placeholder="Código do Estudante"
              placeholderTextColor="#000"
              value={codigo}
              onChangeText={setCodigo}
              keyboardType="numeric"
            />

            <TextInputMask
              type={'zip-code'}
              style={[styles.input, { borderColor: errorEnd ? 'red' : '#40A2E3' }]}
              placeholder="CEP"
              placeholderTextColor="#000"
              value={cep}
              onChangeText={setCep}
              onBlur={buscarCEP}
              keyboardType="numeric"
            />

            <View style={styles.divEndNum}>
              {errorEnd ? <Text style={styles.errorMessage}>{errorEnd}</Text> : null}
              <TextInput
                style={[styles.inputEnd, { borderColor: errorEnd ? 'red' : '#40A2E3' }]}
                placeholder="Rua"
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
                keyboardType="numeric"
              />
            </View>

            <TextInput
              style={styles.input}
              placeholder="Bairro"
              placeholderTextColor="#000"
              value={bairro}
              onChangeText={setBairro}
            />
          </View>

          <TouchableOpacity style={styles.btnCon} onPress={salvar}>
            <Text style={styles.txtCon}>Continuar</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    color: "#000000",
    fontWeight: 'bold',
    marginBottom: 30,
    marginLeft: 20,
  },
  txtEImg:{
    flexDirection: "row",
    justifyContent: 'space-around',
    width: '100%',
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
  },
  bannerAzul: {
    width: '100%',
    backgroundColor: '#40A2E3',
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginTop: 20,
    width: 140,
    height: 120,
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
  retangulo: {
    marginTop: -20,
    width: '100%',
    height: '80%',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingVertical: 50,
    paddingHorizontal: 5,
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingLeft: 20,
    marginBottom: 40,
    fontSize: 16,
    borderColor: '#40A2E3',
    borderWidth: 1,
  },
  divEndNum: {
    flexDirection: "row",
    justifyContent: 'space-between',
    width: '90%',
  },
  inputEnd: {
    flex: 3,
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingLeft: 20,
    marginBottom: 40,
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
    marginBottom: 15,
    fontSize: 16,
    borderColor: '#40A2E3',
    borderWidth: 1,
    marginLeft: 10,
  },
  btnCon: {
    width: '100%',
    height: 50,
    backgroundColor: '#40A2E3',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  txtCon: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
});

export default AtualizarAluno;
