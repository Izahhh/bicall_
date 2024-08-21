import * as React from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, SafeAreaView } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { Padding, FontSize, Color, FontFamily, Border } from "../GlobalStyles";

const ApagarAluno = () => {
  const [selectedSerie, setSelectedSerie] = React.useState();
  const [selectedCurso, setSelectedCurso] = React.useState();
  const navigation = useNavigation();

  return (
    <View style={styles.cadaluno}>
      <SafeAreaView style={styles.banner}>
        <Text style={styles.titulo}>A P A G A R</Text>
        <Text style={styles.subTitulo}>  A L U N O </Text>
        <TouchableOpacity style={styles.voltarIconContainer} onPress={() => navigation.goBack()}>
        <Image
          source={require('../assets/imgs/voltar.png')} 
          style={styles.voltar}
        />
      </TouchableOpacity>
        <Image
           source={require('../assets/imgs/iconapagar.png')}
          style={styles.image}
        />
      </SafeAreaView>

      <SafeAreaView style={styles.form}>
        <TextInput
          style={styles.txtcod}
          placeholder="Código do Aluno (a)"
          placeholderTextColor="#000"
        />
        <TextInput
          style={styles.txtnome}
          placeholder="Nome completo do Aluno (a)"
          placeholderTextColor="#000"
        />
        

      </SafeAreaView>

      <TouchableOpacity style={styles.btnCon}>
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
    marginTop:65,
    width:207,
    height: 244,
  },
  titulo: {
    marginTop:70,
    fontSize: 30,
    color: '#FFA404',
    marginBottom:-55,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subTitulo: {
    marginTop:70,
    fontSize: 25,
    color: '#FFA404',
    marginBottom: -70,
    textAlign: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
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
  txtcod: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 25,
    paddingLeft: 20,
    marginBottom: 20,
    fontSize: 16,
    borderColor: '#40A2E3',
    borderWidth: 1,
    width:200
  },

  btnCon: {
    height: 50,
    backgroundColor: '#40A2E3',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:120,
    top:-21
  },
  txtCon: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
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

export default ApagarAluno;
