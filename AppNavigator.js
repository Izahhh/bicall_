import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { AuthContext } from "./screens/authContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import conectarGestor from "./screens/conectarGestor";
import TelaPrincipal from "./screens/TelaPrincipal";
import CadAluno from "./screens/CadAluno";
import cadastrarGestor from "./screens/cadastrarGestor";
import AtualizarAluno from "./screens/AtualizarAluno";
import telaCurso from "./screens/telaCurso";
import telaSerie from "./screens/telaSerie";
import desvinAluno from "./screens/desvinAluno";
import VerificarAluno from "./screens/VerificarAluno";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="TelaPrincipal" component={TelaPrincipal} />
          <Stack.Screen name="CadAluno" component={CadAluno} />
          <Stack.Screen name="telaCurso" component={telaCurso} />
          <Stack.Screen name="telaSerie" component={telaSerie} />
          <Stack.Screen name="desvinAluno" component={desvinAluno} />
          <Stack.Screen name="VerificarAluno" component={VerificarAluno} />
          <Stack.Screen name="AtualizarAluno" component={AtualizarAluno} />
        </>
      ) : (
        <>
          <Stack.Screen name="conectarGestor" component={conectarGestor} />
          <Stack.Screen name="cadastrarGestor" component={cadastrarGestor} />
        </>
      )}
    </Stack.Navigator>
  );
}
