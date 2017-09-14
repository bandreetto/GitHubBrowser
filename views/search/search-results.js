'use strict'

import React, {Component} from 'react'
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from "react-native"

export default class SearchResults extends Component {
    renderItem(rowData) {
        return (
            <View style={styles.row}>
                <Text style={styles.rowText}>
                    {rowData.item.full_name}
                </Text>
            </View>
        )
    }

    renderSeparator() {
        return (
            <View
                style={styles.separator}/>
        )
    }

    render() {
        if (this.props.isLoading()) {
            return (
                <View style={styles.loader}>
                    <ActivityIndicator
                        size='large'
                        animating={true}/>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.repositories()}
                    keyExtractor={item => item.id}
                    renderItem={this.renderItem.bind(this)}
                    ItemSeparatorComponent={this.renderSeparator.bind(this)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 63,
        marginBottom: 45
    },
    loader: {
        flex: 1,
        justifyContent: 'center'
    },
    separator: {
        height: 1,
        backgroundColor: "#d7d7d7"
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
    },
    rowText: {
        fontSize: 20,
        fontWeight: '600'
    }
})