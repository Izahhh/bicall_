import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, SafeAreaView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome';

const CadAluno = () => {
  const [nome, setNome] = useState("");
  const [selectedSerie, setSelectedSerie] = useState("");
  const [selectedCurso, setSelectedCurso] = useState("");
  const [errorNome, setErrorNome] = useState("");
  const [errorSerie, setErrorSerie] = useState("");
  const [errorCurso, setErrorCurso] = useState("");

  const validar = () => {
    let error = false;
    setErrorNome("");
    setErrorSerie("");
    setErrorCurso("");

    if (nome.trim() === "") {
      setErrorNome("Por favor, insira o nome do aluno");
      error = true;
    }
    if (selectedSerie === "") {
      setErrorSerie("Por favor, selecione a série do aluno");
      error = true;
    }
    if (selectedCurso === "") {
      setErrorCurso("Por favor, selecione o curso do aluno");
      error = true;
    }
    return !error;
  };

  const salvar = () => {
    if (validar()) {
      const data = {
        nome: nome,
        serie: selectedSerie,
        curso: selectedCurso
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
        <Text style={styles.titulo}>Atualizar Aluno</Text>
        <Image
           source={require('../assets/imgs/atualizarImg.png')}
          style={styles.image}
        />
      </SafeAreaView>

      <SafeAreaView style={styles.form}>
        <TextInput
          style={[styles.input, { borderColor: errorNome ? 'red' : '#40A2E3' }]}
          placeholder="Nome Completo"
          placeholderTextColor="#000"
          value={nome}
          onChangeText={setNome}
        />
        {errorNome ? <Text style={styles.errorMessage}>{errorNome}</Text> : null}

        <View style={[styles.pickerContainer, { borderColor: errorSerie ? 'red' : '#40A2E3' }]}>
          <Picker
            selectedValue={selectedSerie}
            onValueChange={itemValue => setSelectedSerie(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione a série do aluno" value="" />
            <Picker.Item label="1ª Série" value="1" />
            <Picker.Item label="2ª Série" value="2" />
            <Picker.Item label="3ª Série" value="3" />
          </Picker>
        </View>
        {errorSerie ? <Text style={styles.errorMessage}>{errorSerie}</Text> : null}

        <View style={[styles.pickerContainer, { borderColor: errorCurso ? 'red' : '#40A2E3' }]}>
          <Picker
            selectedValue={selectedCurso}
            onValueChange={itemValue => setSelectedCurso(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Selecione o curso do aluno" value="" />
            <Picker.Item label="ADM" value="A" />
            <Picker.Item label="DS" value="D" />
            <Picker.Item label="LOG" value="L" />
          </Picker>
        </View>
        {errorCurso ? <Text style={styles.errorMessage}>{errorCurso}</Text> : null}
      </SafeAreaView>

      <TouchableOpacity style={styles.btnCon} onPress={salvar}>
        <Text style={styles.txtCon}>Continuar</Text>
      </TouchableOpacity>
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
    width:300,
    height: 300,
  },
  titulo: {
    marginTop:30,
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
  pickerContainer: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 25,
    justifyContent: 'center',
    marginBottom: 20,
    borderColor: '#40A2E3',
    borderWidth: 1,
  },
  picker: {
    height: 50,
    color: '#000',
  },
  btnCon: {
    height: 50,
    backgroundColor: '#40A2E3',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20
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
