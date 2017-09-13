'use strict';

import React, {Component} from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'

export default class Details extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Some Details</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        justifyContent: 'flex-start'
    },
    text: {
        textAlign: 'center'
    }
})
