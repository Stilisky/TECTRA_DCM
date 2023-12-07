// VenteScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import { fonts, sizes } from '../../../components/utils/theme';
import SaleCard from '../../../components/ui/SaleCard';
import { API_URL } from '../../../components/utils/constantes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const History = () => {
  const [salesList, setSalesList] = useState([]);
  
  useEffect(() => {
    fetchSales()
  }, []);

  const fetchSales = async () => {
    try {
      const url = `${API_URL}/users/id`;
      const token = await AsyncStorage.getItem('token')
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setSalesList(data.ventes.reverse());
      } else {
        console.error('Error fetching sales:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching sales:', error.message);
    }
  };

  fetchSales();

  return (
    <>
    <SafeAreaView style={{ flex: 1, paddingBottom: 10}}>
      <ScrollView>
        <View style={{ flexDirection:'row', justifyContent:'center', alignItems: 'center', paddingHorizontal:5, marginTop: 5}}>
          <Text style={{ fontFamily: fonts.font600, marginLeft: 10, fontSize: sizes.xxl}}>Mes ventes</Text>
        </View>

        {salesList && salesList.map((vente, index) => {
          return <SaleCard vente={vente} key={index}/>
        })}

      </ScrollView>
    </SafeAreaView>
    </>
  );
};
export default History;
