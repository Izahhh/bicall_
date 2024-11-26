import React, { useRef, useState } from 'react';
import { Button, DrawerLayoutAndroid, Text, StyleSheet, View, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const TelaPrincipal = () => {
  const navigation = useNavigation();
  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState('left');

  const changeDrawerPosition = () => {
    setDrawerPosition(drawerPosition === 'left' ? 'right' : 'left');
  };

  const navigationView = () => (
    <SafeAreaView style={[styles.container, styles.navigationContainer]}>
      <Text style={styles.paragraph}>Usuario</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('cadastrarGestor')}>
        <Image source={require('../assets/imgs/editar.png')} style={styles.buttonImage} />
        <Text style={styles.buttonText}>Editar Dados</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Alert.alert('Informação', 'Aqui você pode tirar dúvidas!');
        }}>
        <Image source={require('../assets/imgs/duvidas.png')} style={styles.buttonImage} />
        <Text style={styles.buttonText}>Dúvidas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <Image source={require('../assets/imgs/sair.png')} style={styles.buttonImage} />
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );

  return (
    <SafeAreaProvider>
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition={drawerPosition}
        renderNavigationView={navigationView}
      >
        <ScrollView contentContainerStyle={styles.telaprincipal}>
          <View style={styles.bannerPrincipal}>
            <Image
              style={styles.bannerImage}
              source={require('../assets/imgs/bannerPrincipal.png')} // Imagem do banner
            />
          </View>

          <View style={styles.banner}>
            <Image
              style={styles.logo}
              source={require('../assets/imgs/logotipo.png')}
            />
            <Text style={styles.titulo}> B I C A L L</Text>
          </View>
          <TouchableOpacity style={styles.voltarIconContainer} onPress={() => navigation.goBack()}>
        <Image
          source={require('../assets/imgs/voltar.png')} 
          style={styles.voltar}
        />
      </TouchableOpacity>

          <View style={styles.divBtns}>
            <TouchableOpacity
              style={styles.btns}
              onPress={() => navigation.navigate('CadAluno')}
            >
              <Image
                source={require('../assets/imgs/cadImg.png')}
                style={styles.image}
              />
              <Text style={styles.txtButton}>Cadastrar Aluno</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btns}
              onPress={() => navigation.navigate('AtualizarAluno')}
            >
              <Image
                source={require('../assets/imgs/upImg.png')}
                style={styles.image}
              />
              <Text style={styles.txtButton}>Atualizar Aluno</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btns}
              onPress={() => navigation.navigate('VerificarAluno')}
            >
              <Image
                source={require('../assets/imgs/verImg.png')}
                style={styles.image}
              />
              <Text style={styles.txtButton}>Verificar Chamada</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btns}
              onPress={() => navigation.navigate('desvinAluno')}
            >
              <Image
                source={require('../assets/imgs/desAluno.png')}
                style={styles.imagedes}
              />
              <Text style={styles.txtButton}>Desvincular Aluno</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </DrawerLayoutAndroid>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  telaprincipal: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  navigationContainer: {
    backgroundColor: '#D3D3D3',
    flex: 1,
  },
  bannerPrincipal: {
    width: '100%',
    height: 200, // Altura do banner
    resizeMode: 'cover', // Garantir que a imagem ocupe toda a largura
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // A imagem será cortada se necessário para cobrir a área
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 20,
  },
  imagedes: {
    width: 60,
    height: 60,
    marginRight: 20,
  },
  btns: {
    backgroundColor: '#40A2E3',
    borderRadius: 10,
    width: '110%',
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#40A2E3',
    width: '80%',
    borderRadius: 10,
  },
  buttonImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  txtButton: {
    color: 'white',
    fontSize: 16,
  },
  voltarIconContainer: {
    position: 'absolute',
    top: 195,
    left: 20,
    zIndex: 2,
  },
  voltar: {
    width: 20,
    height: 20,
  },
  banner: {
    alignItems: 'center',
    marginTop: -20, 
    marginBottom: 40,
  },
  logo: {
    width: '35%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  titulo: {
    fontSize: 30,
    color: '#1C1C1C',
    fontWeight: 'bold',
    marginTop: 10,
  },
  divBtns: {
    width: '80%',
    alignItems: 'center',
    marginTop: 30,
  },
});

export default TelaPrincipal;
