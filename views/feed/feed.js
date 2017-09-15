'use strict';

import React, {Component} from 'react'
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableHighlight, View} from 'react-native'
import moment from 'moment'

export default class Feed extends Component {
    renderRow(rowData) {
        return (
            <TouchableHighlight
                onPress={() => this.props.rowPressEvent(rowData.item)}
                underlayColor='#ddd'>
                <View style={styles.row}>
                    <Image
                        source={{uri: rowData.item.actor.avatar_url}}
                        style={styles.avatar}/>

                    <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            {moment(rowData.item.created_at).fromNow()}
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.boldText}>{rowData.item.actor.login}</Text> pushed to
                        </Text>
                        <Text style={styles.boldText}>
                            {rowData.item.payload.ref.replace('refs/heads/', '')}
                        </Text>
                        <Text style={styles.text}>
                            at <Text style={styles.boldText}>{rowData.item.repo.name}</Text>
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    renderSeparator() {
        return (
            <View
                style={styles.separator}/>
        )
    }

    renderFooter() {
        return (
            <View style={styles.bottomLoader}>
                <ActivityIndicator
                    size='large'
                    animating={true}/>
            </View>
        )
    }

    render() {
        if (this.props.isLoading()) {
            return (
                <View style={styles.loader}>
                    <ActivityIndicator
                        size="large"
                        animating={true}/>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.dataSource()}
                    renderItem={this.renderRow.bind(this)}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={this.renderSeparator.bind(this)}
                    ListFooterComponent={this.renderFooter.bind(this)}
                    onEndReached={this.props.endReachedEvent()}
                    onEndReachedThreshold={0}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 60,
        marginBottom: 45
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        backgroundColor: "#FFF"
    },
    loader: {
        flex: 1,
        justifyContent: 'center'
    },
    avatar: {
        height: 40,
        width: 40,
        borderRadius: 20
    },
    textContainer: {
        paddingLeft: 20
    },
    text: {
        backgroundColor: '#FFF'
    },
    boldText: {
        fontWeight: 'bold'
    },
    separator: {
        height: 1,
        backgroundColor: "#d7d7d7"
    },
    bottomLoader: {
        paddingVertical: 20
    }
})
