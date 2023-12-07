import { View, Text } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'
import { fonts, sizes } from '../utils/theme'

const SaleCard = ({vente}) => {
  return (
    <>
      <Card style={{ backgroundColor: 'white', margin: 15, paddingRight:10, marginBottom: 10 }}>
        <View style={{ paddingLeft: 25, paddingBottom:10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontFamily: fonts.font500, fontSize: sizes.lg, paddingTop: 8 }}>{vente.clientName}</Text>
            <Text style={{ fontFamily: fonts.font500, fontSize: sizes.md, paddingTop: 8 }}>{21/5/63}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontFamily: fonts.font400 }}>{vente.produit}</Text>
            <Text style={{ fontFamily: fonts.font400 }}>{vente.sellingPrice} FCFA</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontFamily: fonts.font400 }}>Qty: {vente.quantity}</Text>
            <Text style={{ fontFamily: fonts.font400 }}>PU: {vente.price} FCFA</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <Text style={{ fontFamily: fonts.font400, paddingRight: 5}}>15H12</Text>
          </View>
        </View>
      </Card>

    </>
  )
}

export default SaleCard