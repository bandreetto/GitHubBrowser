'use strict'

import React, {Component} from 'react'
import {Image, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native'

export default class Search extends Component {
    render() {
        return (
            <View
                style={styles.container}>
                <Image style={styles.logo}
                       source={require('../../img/Octocat.png')}/>
                <TextInput
                    onChangeText={this.props.setQueryInput}
                    placeholder="What are you looking for?"
                    style={styles.searchInput}/>
                <TouchableHighlight
                    onPress={this.props.searchEvent}
                    style={styles.searchButton}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        alignItems: 'center',
        marginTop: 50,
        padding: 10
    },
    searchInput: {
        height: 50,
        alignSelf: 'stretch',
        marginTop: 40,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48BBEC',
    },
    searchButton: {
        height: 50,
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
        backgroundColor: '#48BBEC'
    },
    buttonText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 22
    },
    logo: {
        width: 198,
        height: 165,
        marginTop: 40
    }
})


