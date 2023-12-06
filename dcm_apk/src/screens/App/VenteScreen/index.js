// VenteScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, TextInput, Button, FlatList, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SCREEN } from '../../../components/utils/constantes';
import SaleModale from '../../../components/ui/SaleModale';
import { fonts } from '../../../components/utils/theme';
import SaleCard from '../../../components/ui/SaleCard';

const VenteScreen = () => {
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  const [salesList, setSalesList] = useState([]);
  

  const handleShowModal = () => {
    setShowModal(true);
  };

  

  useEffect(() => {
    // const fetchSales = async () => {
    //   try {
    //     const salesUrl = `${API_URL}/sales`;
    //     const response = await fetch(salesUrl, {
    //       headers: {
    //         Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
    //       },
    //     });

    //     if (response.ok) {
    //       const salesData = await response.json();
    //       setSalesList(salesData);
    //     } else {
    //       console.error('Error fetching sales:', response.statusText);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching sales:', error.message);
    //   }
    // };

    // fetchSales();
  }, []);

  return (
    <>
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight}}>
      <ScrollView>
        <View style={{ flexDirection:'row', justifyContent:'space-between', marginTop: 15, paddingHorizontal:5}}>
          <Text style={{ fontFamily: fonts.font600, marginLeft: 10, fontSize: 18}}>Mes 10 dernières ventes</Text>
          <TouchableOpacity style={{ marginRight:10 }}>
            <Text style={{ color: 'blue', fontSize: 18, fontFamily: fonts.font600, textDecorationLine: 'underline'}}>Voir Tout</Text>
          </TouchableOpacity>
        </View>

        <SaleCard/>
        <SaleCard/>
        <SaleCard/>
        <SaleCard/>
        <SaleCard/>
        <SaleCard/>
        <SaleCard/>
        <SaleCard/>
        <SaleCard/>
        <SaleCard/>
        {/* Modal */}

      </ScrollView>
      <TouchableOpacity onPress={handleShowModal} style={styles.addButton}>
        <FontAwesome5 name="plus" size={24} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
    <SaleModale showModal={showModal} closeModal={() => setShowModal(false)}/>
    </>
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

export default VenteScreen;
