import React from 'react';
import { Text, SafeAreaView, TouchableOpacity, StyleSheet, View, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const orders = [
  { nome: 'Ana Oliveira', rm: '#1213', presenca: false },
  { nome: 'Ana Souza Fernandes', rm: '#2585', presenca: false },
  { nome: 'Beatriz Santos', rm: '#5547', presenca: false },
  { nome: 'Carlos Santana', rm: '#4755', presenca: true },
  { nome: 'Daniela Souza', rm: '#2522', presenca: true },
  { nome: 'Danilo Oliveira', rm: '#4757', presenca: true },
  { nome: 'Fransisco Silva', rm: '#7444', presenca: false },
  { nome: 'Gabriel Barbosa', rm: '#4445', presenca: true },
  { nome: 'Henrique Pereira', rm: '#4222', presenca: true },
  { nome: 'Isaias Matos', rm: '#2212', presenca: true },
  { nome: 'Joana Freitas', rm: '#3256', presenca: false },
  { nome: 'Larissa Almeida', rm: '#1258', presenca: false },
];

// Componente que representa uma linha da tabela
const TableRow = ({ order }) => (
  <View style={styles.tableRow}>
    <Text style={[styles.tableCell, styles.cellName]}>{order.nome}</Text>
    <Text style={[styles.tableCell, styles.cellId]}>{order.rm}</Text>
    <View style={[styles.tableCell, styles.cellIcon]}>
      <Icon 
        name={order.presenca ? "check-circle" : "times-circle"} 
        size={24} 
        color={order.presenca ? "green" : "red"} 
      />
    </View>
  </View>
);

// Componente principal do aplicativo
export default function App() {
  const navigation = useNavigation(); // Mover useNavigation para dentro do componente

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Título */}
        <View style={styles.banner}>
          <Image
            source={require('../assets/imgs/lista.png')}
            style={styles.image}
          />
          <Text style={styles.titulo}>Lista de Presença</Text>
          <TouchableOpacity style={styles.voltarIconContainer} onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/imgs/voltar.png')} 
              style={styles.voltar}
            />
          </TouchableOpacity>
        </View>
        {/* Tabela */}
        <View style={styles.table}>
          {/* Cabeçalho da Tabela */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableCellHeader, styles.cellName]}>Nome</Text>
            <Text style={[styles.tableCellHeader, styles.cellId]}>RM</Text>
            <Text style={[styles.tableCellHeader, styles.cellIcon]}>Presença</Text>
          </View>
          {/* Linhas da Tabela */}
          {orders.map((order) => (
            <TableRow key={order.nome} order={order} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContainer: {
    alignItems: 'center',
    padding: 20,
  },
  banner: {
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
  },
  titulo: {
    fontSize: 28,
    color: '#000', // Atualize com a cor definida em GlobalStyles
    fontFamily: 'Cambay-Bold',
    fontWeight: "600",
    marginBottom: 55,
    top: 60,
    marginLeft: -16, // Ajustado para mover para a direita
  },
  table: {
    width: '100%',
    marginTop: 62,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tableCell: {
    padding: 10,
    flex: 1,
    textAlign: 'left',
  },
  tableCellHeader: {
    padding: 10,
    flex: 1,
    textAlign: 'center',
  },
  cellName: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cellId: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  cellIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    width: 30,
    height: 30,
    top: 65,
    marginLeft: 240, // Ajustado para mover para a direita
    position: 'absolute',
  },
  infoIconContainer: {
    position: 'absolute',
    bottom: 8,
    right: 10,
    padding: 10,
    zIndex: 2,
  },
  infoIcon: {
    width: 30,
    height: 30,
  },
  voltarIconContainer: {
    position: 'absolute',
    top: 130, // Ajustar altura
    left: -50, // Ajustado para mover para a direita
    zIndex: 2,
  },
  voltar: {
    width: 20,
    height: 20,
  },
});
