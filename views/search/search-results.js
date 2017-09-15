'use strict'

import React, {Component} from 'react'
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, View} from "react-native"

export default class SearchResults extends Component {
    renderItem = (rowData) => {
        return (
            <View style={styles.row}>
                <Text style={styles.rowText}>
                    {rowData.item.full_name}
                </Text>

                <View style={styles.repoInfo}>
                    <View style={styles.repoCell}>
                        <Image
                            source={require('../../img/star.png')}
                            style={styles.repoCellIcon}/>
                        <Text style={styles.repoCellLabel}>
                            {rowData.item.stargazers_count}
                        </Text>
                    </View>

                    <View style={styles.repoCell}>
                        <Image
                            source={require('../../img/fork.png')}
                            style={styles.repoCellIcon}/>
                        <Text style={styles.repoCellLabel}>
                            {rowData.item.forks}
                        </Text>
                    </View>

                    <View style={styles.repoCell}>
                        <Image
                            source={require('../../img/issues2.png')}
                            style={styles.repoCellIcon}/>
                        <Text style={styles.repoCellLabel}>
                            {rowData.item.open_issues}
                        </Text>
                    </View>
                </View>
            </View>
        )
    }

    renderSeparator = () => {
        return (
            <View
                style={styles.separator}/>
        )
    }

    renderFooter = () => {
        if (this.props.hideFooter) {
            return <View/>
        }

        return (
            <View style={styles.bottomLoader}>
                <ActivityIndicator
                    size='large'
                    animating={true}/>
            </View>
        )
    }

    render() {
        if (this.props.isLoading) {
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
                    data={this.props.repositories}
                    keyExtractor={item => item.full_name}
                    renderItem={this.renderItem}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListFooterComponent={this.renderFooter()}
                    onEndReached={this.props.endReachedEvent}
                    onEndReachedThreshold={1}
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
        padding: 20,
        alignItems: 'center',
    },
    rowText: {
        alignSelf: 'baseline',
        fontSize: 20,
        fontWeight: '600'
    },
    repoInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    repoCell: {
        flex: 1,
        width: 40,
        alignItems: 'center'
    },
    repoCellIcon: {
        width: 20,
        height: 20
    },
    repoCellLabel: {
        textAlign: 'center'
    },
    bottomLoader: {
        paddingVertical: 20
    }
})