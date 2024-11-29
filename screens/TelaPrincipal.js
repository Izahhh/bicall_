import React, { useRef, useState } from 'react';
import { Button, DrawerLayoutAndroid, Text, StyleSheet, View, TouchableOpacity, ScrollView, Image, Alert, BackHandler } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const TelaPrincipal = () => {
  const navigation = useNavigation();
  const drawer = useRef(null);
  const [drawerPosition, setDrawerPosition] = useState('left');

  const changeDrawerPosition = () => {
    setDrawerPosition(drawerPosition === 'left' ? 'right' : 'left');
  };

  const handleExitApp = () => {
    Alert.alert(
      'Confirmar Saída',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          onPress: () => {
            BackHandler.exitApp(); 
          }
        }
      ]
    );
  };

  const navigationView = () => (
    <SafeAreaView style={[styles.container, styles.navigationContainer]}>
      <Image source={require('../assets/imgs/perfil.png')} style={styles.perfilft} />
      <Text style={styles.paragraph}>Olá Gestor(a)!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('cadastrarGestor')}>
        <Image source={require('../assets/imgs/editar.png')} style={styles.buttonImage} />
        <Text style={styles.buttonText}>Editar Cadastro</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Alert.alert('Ajuda!', 'Em caso de dúvidas ou problemas, entre em contato conosco pelo e-mail: biometriccall@gmail.com. Estamos à disposição para ajudar!');
        }}>
        <Image source={require('../assets/imgs/duvidas.png')} style={styles.buttonImage} />
        <Text style={styles.buttonText}>Ajuda</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={handleExitApp}>
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
          <View style={styles.topoContainer}>
            <View style={styles.ondulacao} />
          </View>
          <View style={styles.bannerPrincipal}>
            <Image
              style={styles.bannerImage}
            />
          </View>
          <View style={styles.banner}>
            <Image
              style={styles.logo}
              source={require('../assets/imgs/logotipo.png')}
            />
            <Text style={styles.titulo}> B I C A L L</Text>
          </View>
          <TouchableOpacity
            style={styles.menuIconContainer}
            onPress={() => drawer.current.openDrawer()}
          >
            <Image
              source={require('../assets/imgs/menu.png')}
              style={styles.menuIcon}
            />
          </TouchableOpacity>
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
  topoContainer: {
    width: '100%',
    backgroundColor: '#ef9e05',
    height: 100,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 5, 
  },
  ondulacao: {
    width: '100%',
    height: 30,
    backgroundColor: '#ef9e05',
    transform: [{ rotate: '180deg' }],
    position: 'absolute',
    top: 50,
  },
  bannerPrincipal: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
  perfilft: {
    width: 150,
    height: 150,
    marginRight: 5,
    borderRadius: 30,
    overflow: 'hidden',
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
  menuIconContainer: {
    position: 'absolute',
    top:50, 
    left: 20, 
    zIndex: 2,
  },
  menuIcon: {
    width: 30,
    height: 30,
  },
  banner: {
    alignItems: 'center',
    marginTop: -40,
    marginBottom: 20,
  },
  logo: {
    width: '35%',
    height: undefined,
    aspectRatio: 1,
    resizeMode: 'contain',
    marginTop: -80,
  },
  titulo: {
    fontSize: 30,
    color: '#1C1C1C',
    fontWeight: 'bold',
    marginTop: 5,
  },
  divBtns: {
    width: '80%',
    alignItems: 'center',
    marginTop: 42,
  },
});

export default TelaPrincipal;
