import { View, Text, Modal, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { SCREEN } from '../utils/constantes'
import { Button } from 'react-native-paper'

const SaleModale = ({showModal}) => {
   const [formData, setFormData] = useState({
      clientName: '',
      productName: '',
      quantity: '',
      unitPrice: '',
   });

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

   return (
    <>
      <Modal visible={showModal} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>ENEGISTREMENT D'UNE VENTE</Text>

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
    </>
  )
}

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
     width: SCREEN.width,
     marginHorizontal: 15
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
     height: 60,
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

export default SaleModale