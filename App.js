import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ConectarProfessor from "./screens/ConectarProfessor";
import TelaPrincipal from "./screens/TelaPrincipal";
import CadAluno from "./screens/CadAluno";
import AtualizarAluno from "./screens/AtualizarAluno";
import ApagarAluno from "./screens/ApagarAluno";
import VerificarAluno from "./screens/VerificarAluno";
import CadastrarProfessor from "./screens/CadastrarProfessor";
import TelaCurso from "./screens/telaCurso";
import TelaSerie from "./screens/telaSerie";


//teste
const Stack = createNativeStackNavigator();

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(true);

  return (
    <NavigationContainer>
      {hideSplashScreen ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="ConectarProfessor"
            component={ConectarProfessor}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="telaCurso"
            component={TelaCurso}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="telaSerie"
            component={TelaSerie}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TelaPrincipal"
            component={TelaPrincipal}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CadAluno"
            component={CadAluno}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AtualizarAluno"
            component={AtualizarAluno}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ApagarAluno"
            component={ApagarAluno}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="VerificarAluno"
            component={VerificarAluno}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CadastrarProfessor"
            component={CadastrarProfessor}
            options={{ headerShown: false }}
          />
          
        </Stack.Navigator>
      ) : null}
    </NavigationContainer>
  );
};

export default App;
