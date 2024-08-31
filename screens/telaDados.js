import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import axios from 'axios';

const TelaDados = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.0.17:3001/dados'); // Substitua pelo IP da maquina e do servidor mysql
        setData(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Erro ao buscar dados:', err);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={[styles.row, index % 2 === 0 ? styles.evenRow : styles.oddRow]}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.nome}</Text>
      <Text style={styles.cell}>{item.curso}</Text>
      <Text style={styles.cell}>{item.serie}</Text>
      <Text style={styles.cell}>{item.cpf}</Text>
      <Text style={styles.cell}>{item.datanasc}</Text>
      <Text style={styles.cell}>{item.endereco}</Text>
      <Text style={styles.cell}>{item.telefone}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {error && <Text style={styles.error}>Erro: {error}</Text>}
      <ScrollView horizontal>
        <View>
          <View style={styles.header}>
            <Text style={styles.headerCell}>ID</Text>
            <Text style={styles.headerCell}>Nome</Text>
            <Text style={styles.headerCell}>Curso</Text>
            <Text style={styles.headerCell}>Série</Text>
            <Text style={styles.headerCell}>CPF</Text>
            <Text style={styles.headerCell}>Data de Nascimento</Text>
            <Text style={styles.headerCell}>Endereço</Text>
            <Text style={styles.headerCell}>Telefone</Text>
          </View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F5FCFF',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#009879',
    padding: 12,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerCell: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: '#fff',
    minWidth: 100, // largura mínima para as células do cabeçalho
  },
  row: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  evenRow: {
    backgroundColor: '#f3f3f3',
  },
  oddRow: {
    backgroundColor: '#fff',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: '#ddd',
    minWidth: 100, // largura mínima para as células dos dados
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default TelaDados;
