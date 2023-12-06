import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { fonts, sizes } from '../../../components/utils/theme';

export default function HomeScreen() {
  const products = [
    { id: '1', title: 'SAC DE RIZ ', price: '25000FCFA ', image: require('../../../assets/sacderiz.avif') },
    { id: '2', title: ' CEREALES', price: '650FCFA', image: require('../../../assets/cereales.avif') },
    { id: '3', title: ' Riz parfume', price: '1000 FCFA', image: require('../../../assets/rizcuit.avif') },


    { id: '4', title: 'TULE ONDULEE', price: '5500FCFA', image: require('../../../assets/tule.avif') },
    { id: '5', title: 'TUYAU PVC', price: '12000 FCFA ', image: require('../../../assets/tuyau.avif') },
    { id: '6', title: 'SACS DAMME', price: '35000FCFA', image: require('../../../assets/1.avif') },
    // Ajoutez autant d'éléments que nécessaire
  ];

  const renderProductItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image style={styles.productImage} source={item.image} />
      <Text style={styles.productTitle}>{item.title}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <TouchableOpacity
        style={styles.buyButton}
        onPress={() => { /* Code to run when the "Acheter" button is pressed */ }}
      >
        <Text style={styles.buyButtonText}>Acheter</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Liste des Produits</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderProductItem}
        contentContainerStyle={styles.productsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
  },
  title:{
    marginTop: 20,
    textAlign: 'center',
    fontFamily: fonts.font700,
    fontSize: sizes.xxl,
    color: 'blue'
  },
  productsList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  productContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 8,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
    paddingHorizontal: 8,
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    paddingHorizontal: 8,
  },
  buyButton: {
    backgroundColor: '#4a69bd',
    padding: 10,
    borderRadius: 4,
    margin: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
