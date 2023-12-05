// VenteScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, Button, FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../utils/constantes';

const VenteScreen = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [salesList, setSalesList] = useState([]);
  const [formData, setFormData] = useState({
    clientName: '',
    productName: '',
    quantity: '',
    unitPrice: '',
  });

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveSale = async () => {
    try {
      const url = `${API_URL}/sales`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`, // Ajoutez le jeton d'authentification
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      if (response.ok) {
        const newSale = await response.json();
        setSalesList([...salesList, newSale]);
        setFormData({
          clientName: '',
          productName: '',
          quantity: '',
          unitPrice: '',
        });
        setShowModal(false);
      } else {
        console.error('Error during sale recording:', response.statusText);
      }
    } catch (error) {
      console.error('Error during sale recording:', error.message);
    }
  };

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const salesUrl = `${API_URL}/sales`;
        const response = await fetch(salesUrl, {
          headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const salesData = await response.json();
          setSalesList(salesData);
        } else {
          console.error('Error fetching sales:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching sales:', error.message);
      }
    };

    fetchSales();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TouchableOpacity onPress={handleShowModal} style={styles.addButton}>
        <FontAwesome5 name="plus" size={24} color="white" />
      </TouchableOpacity>

      <Text>Liste des ventes de la semaine :</Text>
      <FlatList
        data={salesList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.saleItem}>
            <Text>Date: {item.date}</Text>
            <Text>Client: {item.clientName}</Text>
            <Text>Produit: {item.productName}</Text>
            <Text>Quantité: {item.quantity}</Text>
          </View>
        )}
      />

      <Modal visible={showModal} animationType="slide" transparent>
        <View style={[styles.modalContainer, { zIndex: 1 }]}>
          <View style={styles.modalContent}>
            <Text>Formulaire d'enregistrement de vente</Text>
            <TextInput
              placeholder="Nom du client"
              value={formData.clientName}
              onChangeText={(text) => setFormData({ ...formData, clientName: text })}
            />
            <TextInput
              placeholder="Nom du produit"
              value={formData.productName}
              onChangeText={(text) => setFormData({ ...formData, productName: text })}
            />
            <TextInput
              placeholder="Quantité"
              value={formData.quantity}
              onChangeText={(text) => setFormData({ ...formData, quantity: text })}
              keyboardType="numeric"
            />
            <Button title="Enregistrer la vente" onPress={handleSaveSale} />
            <Button title="Fermer" onPress={handleCloseModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: 'green',
    padding: 16,
    borderRadius: 50,
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 10,
    elevation: 5,
  },
  saleItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    marginBottom: 8,
  },
});

export default VenteScreen;
