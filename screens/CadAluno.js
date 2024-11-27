import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, SafeAreaView, Color, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { useNavigation } from '@react-navigation/native';
import { db } from '../screens/firebaseConfig';  // Importando o Firestore firestoreConfig.js
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore"; // Importando funções do Firestore

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
  const [codigoAluno, setCodigoAluno] = useState(null);  // Estado para o código do aluno

  const navigation = useNavigation();

  // Função para buscar o último código cadastrado
  const buscarUltimoCodigo = async () => {
    try {
      const q = query(collection(db, "alunos"), orderBy("codigo", "desc"));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const ultimoAluno = querySnapshot.docs[0].data();
        setCodigoAluno(ultimoAluno.codigo + 1); // Incrementa o último código
      } else {
        setCodigoAluno(1); // Caso não haja alunos cadastrados, inicia com o código 1
      }
    } catch (error) {
      console.error("Erro ao buscar o último código:", error);
    }
  };

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

    if (!error && codigoAluno !== null) {
      // Cadastro no Firestore
      cadastrarNoFirestore();
    } else {
      buscarUltimoCodigo(); // Se não tiver código, busca o último
    }
  };

  const cadastrarNoFirestore = async () => {
    try {
      const docRef = await addDoc(collection(db, "alunos"), {
        nome: nome,
        cpf: cpf,
        endereco: endereco,
        bairro: bairro,
        numero: numEnd,
        cep: cep,
        codigo: codigoAluno,  // Salva o código gerado
      });
      console.log("Aluno cadastrado com ID: ", docRef.id);
      // Navegar para outra tela após o cadastro
      navigation.navigate('telaCurso');  // Modifique conforme sua navegação
    } catch (e) {
      console.error("Erro ao adicionar documento: ", e);
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

          <View style={styles.txtEImg}>
            <Text style={styles.titulo}>Cadastrar {"\n"} Aluno</Text>
            <Image
              source={require('../assets/imgs/imgcad.png')}
              style={styles.image}
            />
          </View>
          
        </View>

        <View style={styles.retangulo}>
          <View style={styles.form}>
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

          <TouchableOpacity style={styles.btnCon} onPress={validar}>
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
  txtEImg: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
  },
  bannerAzul: {
    width: '100%',
    backgroundColor: '#40A2E3',
    height: 161,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginTop: 10,
    width: 140,
    height: 120,
  },
  titulo: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 28,
    marginRight: 10,
    marginTop: 30,
    marginLeft: 20,
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
    marginTop: -15,
    width: '90%',
    height: '80%',
    backgroundColor: '#fff', // Substituindo Color.colorWhite por uma cor direta
    borderRadius: 25, // Ajuste a borda como necessário
    paddingVertical: 50,
    paddingHorizontal: 5,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20.5,
    elevation: 20.5,
  },
  form: {
    width: '100%',
    alignItems: 'center',
  },
  input: {
    width: '100%',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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

export default CadAluno;
