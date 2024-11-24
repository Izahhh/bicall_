import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, query, where, getDocs, updateDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../screens/firebaseConfig'; // Certifique-se de que a conexão com o Firestore está correta

const desvincularAluno = () => {
  const navigation = useNavigation();
  const [nome, setNome] = React.useState('');
  const [codigo, setCodigo] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [confirmaSenha, setConfirmaSenha] = React.useState('');

  // Função para buscar o aluno pelo código
  const buscarAlunoPorCodigo = async (codigoAluno) => {
    try {
      const codigoNumero = parseInt(codigoAluno, 10);
      if (isNaN(codigoNumero)) {
        alert("O código do aluno deve ser um número válido!");
        setNome('');
        return;
      }

      console.log("Buscando aluno com o código:", codigoNumero);

      const q = query(collection(db, 'alunos'), where('codigo', '==', codigoNumero));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const alunoData = doc.data();
          console.log("Aluno encontrado:", alunoData);
          setNome(alunoData.nome);
        });
      } else {
        console.log("Aluno não encontrado.");
        setNome('');
        alert('Aluno não encontrado!');
      }
    } catch (error) {
      console.error("Erro ao buscar aluno:", error);
      alert('Erro ao buscar aluno: ' + error.message);
    }
  };

  // Função para gravar o aluno desvinculado na coleção 'alunos_desvinculados'
  const gravarAlunoDesvinculado = async (alunoData) => {
    try {
      const desvinculadosRef = collection(db, 'alunos_desvinculados');
      const dataDesvinculacao = new Date();
      const alunoDesvinculado = {
        ...alunoData,
        dataDesvinculacao: dataDesvinculacao,
        timestamp: dataDesvinculacao.toISOString(),
      };

      await setDoc(doc(desvinculadosRef), alunoDesvinculado);
      console.log("Aluno desvinculado gravado:", alunoDesvinculado);
    } catch (error) {
      console.error("Erro ao gravar aluno desvinculado:", error);
      alert("Erro ao gravar aluno desvinculado: " + error.message);
    }
  };

  // Função para desvincular o aluno com base no código
  const handleDesvincular = async () => {
    if (senha !== confirmaSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    if (codigo.trim() === '') {
      alert("O código do aluno é obrigatório!");
      return;
    }

    try {
      const codigoNumero = parseInt(codigo, 10);
      if (isNaN(codigoNumero)) {
        alert("O código do aluno deve ser um número válido!");
        return;
      }

      console.log("Buscando aluno com o código:", codigoNumero);

      const q = query(collection(db, 'alunos'), where('codigo', '==', codigoNumero));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (docSnapshot) => {
          const alunoData = docSnapshot.data();

          // Gravar o aluno na coleção 'alunos_desvinculados'
          await gravarAlunoDesvinculado(alunoData);

          // Desvincular aluno no banco de dados (marcando como desvinculado)
          try {
            const alunoRef = doc(db, 'alunos', docSnapshot.id);
            await updateDoc(alunoRef, { vinculo: false }); // Marcar o aluno como desvinculado
            console.log("Aluno desvinculado:", docSnapshot.id);
            alert("Aluno desvinculado com sucesso!");
            navigation.goBack();
          } catch (updateError) {
            console.error("Erro ao desvincular aluno:", updateError);
            alert("Erro ao desvincular aluno: " + updateError.message);
          }
        });
      } else {
        console.log("Nenhum aluno encontrado para o código:", codigoNumero);
        alert("Aluno não encontrado para desvinculação.");
      }
    } catch (error) {
      console.error("Erro ao desvincular aluno:", error);
      alert("Erro ao desvincular aluno: " + error.message);
    }
  };

  React.useEffect(() => {
    if (codigo) {
      buscarAlunoPorCodigo(codigo);
    }
  }, [codigo]);

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
            <View style={[styles.retangulo, styles.retanguloLayout]} />
            <View style={[styles.retangulo1, styles.retanguloLayout]} />
            <View style={[styles.retangulo2, styles.retanguloLayout]} />
            <Image
              style={styles.imgdesIcon}
              contentFit="cover"
              source={require("../assets/imgs/imgdes.png")}
            />
          </SafeAreaView>

          <TouchableOpacity style={styles.voltarIconContainer} onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/imgs/voltar.png')}
              style={styles.voltar}
            />
          </TouchableOpacity>

          <View style={styles.form}>
            <Text style={styles.title}>Desvincular aluno</Text>

            <TextInput
              style={styles.txtcod}
              placeholder="Código do Estudante"
              placeholderTextColor="#000"
              value={codigo}
              onChangeText={setCodigo}
              keyboardType="numeric"
            />

            <TextInput
              style={styles.txtnome}
              placeholder="Nome completo do Estudante"
              placeholderTextColor="#000"
              value={nome}
              editable={false}
            />

            <TextInput
              style={styles.txtBox}
              placeholder="Senha"
              placeholderTextColor="#000"
              secureTextEntry={true}
              value={senha}
              onChangeText={setSenha}
            />

            <TextInput
              style={styles.txtBox}
              placeholder="Confirme a Senha"
              placeholderTextColor="#000"
              secureTextEntry={true}
              value={confirmaSenha}
              onChangeText={setConfirmaSenha}
            />
          </View>

          <TouchableOpacity style={styles.btnCon} onPress={handleDesvincular}>
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
    flex: 2,
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 60,
  },
  banner: {
    alignItems: 'center',
    marginBottom: 50, // Ajuste para deixar um espaço adequado
    width: '100%',
    position: 'relative',
  },
  title: {
    fontSize: 28,
    color: "#000000", // Branco para o texto de boas-vindas
    fontWeight: 'bold',
    marginBottom: 30,
  },

  form: {
    marginBottom: 20,
    marginTop: '60%',
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

  txtBox: {
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
  },
  btnCon: {
    height: 50,
    backgroundColor: '#40A2E3',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  txtCon: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
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
  footer: {
    backgroundColor: '#FFA404',
    width: "100%",
    height: 35,
    position: "relative",
    bottom: 0,
  },

  retanguloLayout: {
    borderTopRightRadius: 107,
    borderBottomRightRadius: 107,
    borderBottomLeftRadius: 107,
    borderTopLeftRadius: 0,
    backgroundColor: '#40A2E3',
    position: "absolute",
  },
  retangulo: {
    right: 120,
    width: '25%',
    height: 230,
  },
  retangulo1: {
    top: -25,
    width: '125%',
    height: 180,
  },
  retangulo2: {
    right: 0,
    top: -100,
    width: '75%',
    height: 190,
  },
  imgdesIcon: {
    top: 57,
    left: 80,
    width: 254,
    height: 187,
    position: "absolute",
    overflow: "hidden",
  }
});


export default desvincularAluno;
