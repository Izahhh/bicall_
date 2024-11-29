import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { getAuth, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

const AtualizarAluno = () => {
  const [nome, setNome] = useState("");
  const [codigo, setCodigo] = useState("");
  const [cpf, setCpf] = useState("");
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [senha, setSenha] = useState(""); // Campo para nova senha
  const [senhaAtual, setSenhaAtual] = useState(""); // Campo para autenticação
  const [alunoId, setAlunoId] = useState(""); // ID do documento no Firestore
  const [errorCodigo, setErrorCodigo] = useState("");
  const navigation = useNavigation();

  const buscarAlunoPorCodigo = async () => {
    try {
      const db = getFirestore();
      const codigoNumero = parseInt(codigo, 10);

      if (isNaN(codigoNumero)) {
        alert("O código do aluno deve ser um número válido!");
        limparCampos();
        return;
      }

      const q = query(collection(db, 'alunos'), where('codigo', '==', codigoNumero));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const alunoData = doc.data();
          setAlunoId(doc.id); // Armazena o ID do documento
          setNome(alunoData.nome || "");
          setCpf(alunoData.cpf || "");
          setEndereco(alunoData.endereco || "");
          setNumero(alunoData.numero || "");
          setBairro(alunoData.bairro || "");
          setSenha(""); // Limpa o campo de nova senha
          setSenhaAtual(""); // Limpa o campo de senha atual
          setErrorCodigo("");
        });
      } else {
        limparCampos();
        setErrorCodigo('Aluno não encontrado!');
      }
    } catch (error) {
      console.error("Erro ao buscar aluno:", error);
      alert('Erro ao buscar aluno: ' + error.message);
    }
  };

  const limparCampos = () => {
    setNome("");
    setCpf("");
    setEndereco("");
    setNumero("");
    setBairro("");
    setSenha("");
    setSenhaAtual("");
    setAlunoId("");
  };

  const validar = () => {
    if (!codigo.trim()) {
      setErrorCodigo("Por favor, insira o código do estudante.");
      return false;
    }
    if (!senhaAtual.trim()) {
      alert("Por favor, insira sua senha atual para confirmar.");
      return false;
    }
    return true;
  };

  const salvar = async () => {
    if (validar() && alunoId) {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          alert("Usuário não autenticado. Por favor, faça login novamente.");
          return;
        }

        const credential = EmailAuthProvider.credential(user.email, senhaAtual);

        // Re-autenticação
        await reauthenticateWithCredential(user, credential);

        // Atualizar dados do aluno no Firestore
        const db = getFirestore();
        const alunoRef = doc(db, "alunos", alunoId);

        await updateDoc(alunoRef, {
          nome,
          cpf,
          endereco,
          numero,
          bairro,
          senha, // Atualiza a senha no Firestore
        });

        alert("Dados atualizados com sucesso!");
        navigation.goBack();
      } catch (error) {
        console.error("Erro ao salvar aluno:", error);
        if (error.code === "auth/wrong-password") {
          alert("Senha atual incorreta.");
        } else {
          alert("Erro ao salvar os dados: " + error.message);
        }
      }
    } else {
      alert("Busque um aluno válido antes de salvar.");
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
            {errorCodigo ? <Text style={styles.errorMessage}>{errorCodigo}</Text> : null}
            <TextInput
              style={[styles.input, { borderColor: errorCodigo ? 'red' : '#40A2E3' }]}
              placeholder="Código do Estudante"
              placeholderTextColor="#000"
              value={codigo}
              onChangeText={setCodigo}
              keyboardType="numeric"
              onBlur={buscarAlunoPorCodigo}
            />
            <TextInput
              style={styles.input}
              placeholder="Nome Completo"
              placeholderTextColor="#000"
              value={nome}
              onChangeText={setNome}
            />
            <TextInput
              style={styles.input}
              placeholder="CPF"
              placeholderTextColor="#000"
              value={cpf}
              onChangeText={setCpf}
            />
            <TextInput
              style={styles.input}
              placeholder="Endereço"
              placeholderTextColor="#000"
              value={endereco}
              onChangeText={setEndereco}
            />
            <TextInput
              style={styles.input}
              placeholder="Número"
              placeholderTextColor="#000"
              value={numero}
              onChangeText={setNumero}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Bairro"
              placeholderTextColor="#000"
              value={bairro}
              onChangeText={setBairro}
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              placeholderTextColor="#000"
              value={senhaAtual}
              onChangeText={setSenhaAtual}
              secureTextEntry
            />
           
          </View>

          <TouchableOpacity style={styles.btnCon} onPress={salvar}>
            <Text style={styles.txtCon}>Salvar</Text>
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
    marginBottom: 25,
    fontSize: 16,
    borderColor: '#40A2E3',
    borderWidth: 1,
  },
  btnCon: {
    width: '90%',
    height: 50,
    backgroundColor: '#40A2E3',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    margin: 'auto',
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
