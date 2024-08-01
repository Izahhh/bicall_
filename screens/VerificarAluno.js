import React from 'react';
import { Text, SafeAreaView, StyleSheet, View, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// Um componente pode receber dados através de propriedades (props), permitindo criar componentes reutilizáveis e passe dados específicos para eles.
const orders = [
  { nome: 'Betty Sheldon', rm: '#1213', presenca: false },
  { nome: 'Francisca Austin', rm: '#1213', presenca: false },
  { nome: 'Oscar Clausing', rm: '#1213', presenca: true },
  { nome: 'Cynthia Back', rm: '#1213', presenca: true },
  { nome: 'Pauline Brown', rm: '#1213', presenca: false },
  { nome: 'Jennifer Walters', rm: '#1213', presenca: false },
  { nome: 'Betty Sheldon', rm: '#1213', presenca: false },
  { nome: 'Francisca Austin', rm: '#1213', presenca: false },
  { nome: 'Oscar Clausing', rm: '#1213', presenca: true },
  { nome: 'Cynthia Back', rm: '#1213', presenca: true },
  { nome: 'Pauline Brown', rm: '#1213', presenca: false },
  { nome: 'Jennifer Walters', rm: '#1213', presenca: false },
  { nome: 'Betty Sheldon', rm: '#1213', presenca: false },
  { nome: 'Francisca Austin', rm: '#1213', presenca: false },
  { nome: 'Oscar Clausing', rm: '#1213', presenca: true },
  { nome: 'Cynthia Back', rm: '#1213', presenca: true },
  { nome: 'Pauline Brown', rm: '#1213', presenca: false },
  { nome: 'Jennifer Walters', rm: '#1213', presenca: false },
];

// Componente que recebe um objeto order como uma propriedade.
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
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {/* Título */}
        <View style={styles.banner}>
          <Image
            source={require('../assets/imgs/logotipo.png')}
            style={styles.image}
          />
          <Text style={styles.titulo}>Cadastrar Aluno</Text>
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
    flexDirection: 'row'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFA500',
  },
  table: {
    width: '100%',
    marginTop: 20,
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
    marginRight: 20,
  },
});

