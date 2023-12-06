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
            <Text style={{ fontFamily: fonts.font500, fontSize: sizes.lg, paddingTop: 8 }}>Pierre Molo</Text>
            <Text style={{ fontFamily: fonts.font500, fontSize: sizes.md, paddingTop: 8 }}>21/5/63</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontFamily: fonts.font400 }}>Sac de riz</Text>
            <Text style={{ fontFamily: fonts.font400 }}>25.622 FCFA</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontFamily: fonts.font400 }}>Qty: 15</Text>
            <Text style={{ fontFamily: fonts.font400 }}>PU: 10.622 FCFA</Text>
          </View>
        </View>
      </Card>

    </>
  )
}

export default SaleCard