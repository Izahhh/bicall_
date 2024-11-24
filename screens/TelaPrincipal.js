import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Componente TelaPrincipal
const TelaPrincipal = () => {
  const navigation = useNavigation(); // Este hook é utilizado dentro do DrawerNavigator, funcionando normalmente

  return (
    <ScrollView contentContainerStyle={styles.telaprincipal}>
      <View style={styles.banner}>
        <Image
          style={styles.logo}
          contentFit="cover"
          source={require("../assets/imgs/logotipo.png")}
        />
        <Text style={styles.titulo}>B I C A L L</Text>
      </View>

      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => navigation.openDrawer()} // Funciona corretamente dentro do Drawer.Navigator
      >
        <Image
          source={require("../assets/imgs/menu.png")}
          style={styles.menuIcon}
        />
      </TouchableOpacity>

      {/* Outros botões e conteúdo */}
      <View style={styles.divBtns}>
        <TouchableOpacity
          style={styles.btns}
          onPress={() => navigation.navigate("CadAluno")}
        >
          <Image
            source={require("../assets/imgs/cadImg.png")}
            style={styles.image}
          />
          <Text style={styles.txtButton}>Cadastrar Aluno</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btns}
          onPress={() => navigation.navigate("AtualizarAluno")}
        >
          <Image
            source={require("../assets/imgs/upImg.png")}
            style={styles.image}
          />
          <Text style={styles.txtButton}>Atualizar Aluno</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btns}
          onPress={() => navigation.navigate("VerificarAluno")}
        >
          <Image
            source={require("../assets/imgs/verImg.png")}
            style={styles.image}
          />
          <Text style={styles.txtButton}>Verificar Chamada</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btns}
          onPress={() => navigation.navigate("DesvinAluno")}
        >
          <Image
            source={require("../assets/imgs/desAluno.png")}
            style={styles.imagedes}
          />
          <Text style={styles.txtButton}>Desvincular Aluno</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// Componente Drawer
const renderDrawer = () => (
  <View style={styles.drawerContainer}>
    <View style={styles.userSection}>
      <Image
        source={require("../assets/imgs/user.png")}
        style={styles.userIcon}
      />
      <Text style={styles.userName}>user2</Text>
    </View>

    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => alert("Editar dados")}
    >
      <Image
        source={require("../assets/imgs/editar.png")}
        style={styles.menuIcon}
      />
      <Text style={styles.menuText}>Editar dados</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => alert("Dúvidas")}
    >
      <Image
        source={require("../assets/imgs/duvidas.png")}
        style={styles.menuIcon}
      />
      <Text style={styles.menuText}>Dúvidas</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => alert("Sair")}
    >
      <Image
        source={require("../assets/imgs/sair.png")}
        style={styles.menuIcon}
      />
      <Text style={styles.menuText}>Sair</Text>
    </TouchableOpacity>
  </View>
);

// DrawerNavigator com a TelaPrincipal
const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="TelaPrincipal">
        <Drawer.Screen name="TelaPrincipal" component={TelaPrincipal} />
        {/* Adicione outras telas ao Drawer se necessário */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  telaprincipal: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
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
    backgroundColor: "#00bfff",
    borderRadius: 10,
    width: "110%",
    height: 60,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  txtButton: {
    color: "white",
    fontSize: 16,
  },
  banner: {
    alignItems: "center",
    marginTop: 70,
    marginBottom: 40,
    flexDirection: "column",
  },
  logo: {
    width: "35%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
  },
  titulo: {
    fontSize: 30,
    color: "#FFA404",
    fontWeight: "bold",
    marginTop: 10,
  },
  divBtns: {
    width: "80%",
    alignItems: "center",
    marginTop: 30,
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: "#e6e6e6",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3366cc",
    padding: 15,
    borderRadius: 10,
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
  },
  menuIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: "#333",
  },
  menuButton: {
    position: "absolute",
    top: 60,
    left: 20,
  },
});

export default TelaPrincipal;
