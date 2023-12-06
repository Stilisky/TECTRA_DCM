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
    setFormData({
      clientName: '',
      productName: '',
      quantity: '',
      unitPrice: '',
    });
  };

  const handleSaveSale = async () => {
    try {
      const url = `${API_URL}/sales`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      if (response.ok) {
        const newSale = await response.json();
        setSalesList([...salesList, newSale]);
        handleCloseModal();
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
      <FlatList
        data={salesList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.saleItem}>
            <Text>Date: {item.date}</Text>
            <Text>Client: {item.clientName}</Text>
            <Text>Produit: {item.productName}</Text>
            <Text>Quantité: {item.quantity}</Text>
            <Text>Prix unitaire: {item.unitPrice}</Text>
          </View>
        )}
      />

      {/* Modal */}
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>FORMULAIRE ENEGISTREMENT D'UNE VENTE</Text>

            <View style={styles.formGroup}>
              <FontAwesome5 name="user" style={styles.icon} />
              <TextInput
                placeholder="Nom du client"
                value={formData.clientName}
                onChangeText={(text) => setFormData({ ...formData, clientName: text })}
                style={styles.input}
              />
            </View>

            <View style={styles.formGroup}>
              <FontAwesome5 name="tag" style={styles.icon} />
              <TextInput
                placeholder="Nom du produit"
                value={formData.productName}
                onChangeText={(text) => setFormData({ ...formData, productName: text })}
                style={styles.input}
              />
            </View>

            <View style={styles.formGroup}>
              <FontAwesome5 name="cube" style={styles.icon} />
              <TextInput
                placeholder="Quantité"
                value={formData.quantity}
                onChangeText={(text) => setFormData({ ...formData, quantity: text })}
                keyboardType="numeric"
                style={styles.input}
              />
            </View>

            <View style={styles.formGroup}>
              <FontAwesome5 name="money-bill" style={styles.icon} />
              <TextInput
                placeholder="Prix unitaire"
                value={formData.unitPrice}
                onChangeText={(text) => setFormData({ ...formData, unitPrice: text })}
                keyboardType="numeric"
                style={styles.input}
              />
            </View>

            <Button title="Enregistrer la vente" onPress={handleSaveSale} />
            <Button title="Fermer" onPress={handleCloseModal} />
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={handleShowModal} style={styles.addButton}>
        <FontAwesome5 name="plus" size={24} color="white" />
      </TouchableOpacity>
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
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  formGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    marginRight: 8,
    fontSize: 20,
    color: 'gray',
  },
  input: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  saleItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    marginBottom: 8,
  },
});

export default VenteScreen;
