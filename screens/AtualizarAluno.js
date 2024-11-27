import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const AtualizarAluno = () => {
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [senha, setSenha] = useState(""); // Para a senha de confirmação
  const [errorNome, setErrorNome] = useState("");
  const [errorCodigo, setErrorCodigo] = useState("");
  const [errorSenha, setErrorSenha] = useState(""); // Erro de senha
  const navigation = useNavigation();

  const buscarAluno = async () => {
    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser; // Pega o usuário logado
    if (!user) {
      setErrorSenha("Você precisa estar logado para realizar essa ação.");
      return;
    }

    try {
      const alunosRef = collection(db, "alunos");
      const q = query(alunosRef, where("codigo", "==", codigo)); // Filtra pela propriedade 'codigo'

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const aluno = querySnapshot.docs[0].data(); // Pega o primeiro documento retornado
        setNome(aluno.nome); // Preenche o nome do estudante
        setErrorNome(""); // Limpa a mensagem de erro
      } else {
        setErrorCodigo("Aluno não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao buscar aluno:", error);
      setErrorCodigo("Erro ao buscar aluno.");
    }
  };

  const validar = () => {
    let error = false;
    setErrorNome("");
    setErrorCodigo("");
    setErrorSenha("");

    if (nome.trim() === "") {
      setErrorNome("Por favor, insira o nome do estudante");
      error = true;
    }
    if (codigo.trim() === "") {
      setErrorCodigo("Por favor, insira o código do estudante");
      error = true;
    }
    if (senha.trim() === "") {
      setErrorSenha("Por favor, insira a senha para confirmar a alteração.");
      error = true;
    }

    return !error;
  };

  const salvar = () => {
    if (validar()) {
      // Aqui, você pode adicionar a lógica para confirmar a senha e redirecionar
      navigation.navigate('CadAluno', { nome, codigo }); // Passa os dados para a tela CadAluno
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
              editable={false} // Desabilita a edição do nome
            />

            {errorCodigo ? <Text style={styles.errorMessage}>{errorCodigo}</Text> : null}
            <TextInput
              style={[styles.input, { borderColor: errorCodigo ? 'red' : '#40A2E3' }]}
              placeholder="Código do Estudante"
              placeholderTextColor="#000"
              value={codigo}
              onChangeText={setCodigo}
              keyboardType="numeric"
              onBlur={buscarAluno} // Chama a função ao sair do campo
            />

            {errorSenha ? <Text style={styles.errorMessage}>{errorSenha}</Text> : null}
            <TextInput
              style={[styles.input, { borderColor: errorSenha ? 'red' : '#40A2E3' }]}
              placeholder="Senha para confirmação"
              placeholderTextColor="#000"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
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
