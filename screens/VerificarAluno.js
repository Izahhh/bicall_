import React from 'react';
import { Text, SafeAreaView, TouchableOpacity, StyleSheet, View, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { Color } from "../GlobalStyles";



const orders = [
  { nome: 'Ana Oliveira', cd: '1213', presenca: false },
  { nome: 'Ana Souza Fernandes', cd: '2585', presenca: false },
  { nome: 'Beatriz Santos', cd: '5547', presenca: false },
  { nome: 'Carlos Santana', cd: '4755', presenca: true },
  { nome: 'Daniela Souza', cd: '2522', presenca: true },
  { nome: 'Danilo Oliveira', cd: '4757', presenca: true },
  { nome: 'Fransisco Silva', cd: '7444', presenca: false },
  { nome: 'Gabriel Barbosa', cd: '4445', presenca: true },
  { nome: 'Henrique Pereira', cd: '4222', presenca: true },
  { nome: 'Isaias Matos', cd: '2212', presenca: true },
  { nome: 'Joana Freitas', cd: '3256', presenca: false },
  { nome: 'Larissa Almeida', cd: '1258', presenca: false },
];

const TableRow = ({ order }) => (
  
  <View style={styles.tableRow}>
    <Text style={[styles.tableCell, styles.cellName]}>{order.nome}</Text>
    <Text style={[styles.tableCell, styles.cellId]}>{order.cd}</Text>
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
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.bannerContainer}>

          <View style={styles.bannerazul} />
          <Text style={styles.tit}>Verificar {"\n"} Chamada</Text>

          <Image
            source={require('../assets/imgs/imgchamada.png')}
            style={styles.imgchamadaIcon}
          />
          
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
            <Text style={[styles.tableCellHeader, styles.cellId]}>CD</Text>
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
  },
  bannerContainer: {
    width: '100%',
    height: 151,
    position: 'relative',
    marginBottom: 20,
  },
  tit: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 28,
    marginRight: 10,
    marginTop: 60,
    marginLeft: 230,
  },
  bannerazul: {
    position: 'absolute',
    top: -14,
    left: 0,
    backgroundColor: Color.colorDeepskyblue,
    width: '100%',
    height: 161,
  },
  imgchamadaIcon: {
    position: 'absolute',
    top: 61,
    left: 40,
    width: 162,
    height: 152,
    overflow: "hidden",
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
  table: {
    width: '90%',
    marginTop: 60,
    marginBottom: 40,
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
});
