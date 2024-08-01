import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const TelaDados = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://10.67.168.156:3000/dados') // Use o IP local do servidor e a porta 3000
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar dados:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      {data.map(item => (
        <Text key={item.id}>{item.nome}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default TelaDados;
