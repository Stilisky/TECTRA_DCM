import { View, Text, Modal, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { API_URL, SCREEN } from '../utils/constantes'
import { Button } from 'react-native-paper'
import { fonts } from '../utils/theme'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SaleModale = ({showModal, closeModal}) => {
   const [formData, setFormData] = useState({
      clientName: '',
      produit: '',
      quantity: '',
      price: '',
   });
   const [error, setError] = useState(null)

   const handleCloseModal = () => {
      closeModal()
      setFormData({
        clientName: '',
        produit: '',
        quantity: '',
        price: '',
      });
   };
  
   const handleSaveSale = async () => {
      try {
        const url = `${API_URL}/ventes`;
        const token = await AsyncStorage.getItem('token')
        if(formData.clientName && formData.price && formData.produit && formData.quantity) {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              ...formData,
            }),
          });
    
          if (response.ok) {
            handleCloseModal();
          } else {
            console.error('Error during sale recording:', response.statusText);
          }
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
                value={formData.produit}
                onChangeText={(text) => setFormData({ ...formData, produit: text })}
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
                value={formData.price}
                onChangeText={(text) => setFormData({ ...formData, price: text })}
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
            
            <View style={{ flexDirection:'row', justifyContent: 'space-around', marginTop:5 }}>
              <TouchableOpacity 
                onPress={handleSaveSale}
                style={{ backgroundColor:'green', padding: 10,paddingHorizontal:20, borderRadius: 20 }}
              >
                <Text style={{ color: 'white', fontFamily: fonts.font600 }}>Ajouter</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                onPress={handleCloseModal}
                style={{ backgroundColor:'red', padding: 10,paddingHorizontal:20, borderRadius: 20 }}
              >
                <Text style={{ color: 'white', fontFamily: fonts.font600 }}>Fermer</Text>
              </TouchableOpacity>
            </View>
            
            {/* <Button 
              label={"Ajouter"}
              labelStyle={{ 
                fontFamily: fonts.font500,
                fontSize: 14,
              }}
              onPress={handleSaveSale}
            />
            <Button 
              label={"Fermer"} 
              onPress={handleCloseModal} 
              style={{ backgroundColor:'red', color:'white' }}
            /> */}
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
   modalContainer: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     width: SCREEN.width,
   },
   modalContent: {
     backgroundColor: 'white',
     padding:20,
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