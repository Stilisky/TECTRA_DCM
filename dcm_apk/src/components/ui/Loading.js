import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export const Loading = ({color, size}) => {
    return (
        <View style={styles.wrapper}>
            <ActivityIndicator color={'blue'} size={20}/>
        </View>
    )
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})