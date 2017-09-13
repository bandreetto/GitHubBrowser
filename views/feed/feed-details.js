'use strict'

import React, {Component} from 'react'
import {FlatList, Image, StyleSheet, Text, View} from 'react-native'
import moment from "moment"

export default class Details extends Component {
    renderItem(rowData) {
        return (
            <View
                style={styles.commits}>
                <Text>
                    <Text
                        style={styles.bold}>
                        {rowData.item.sha.substring(0, 6)} - </Text>
                </Text>
                <Text>
                    {rowData.item.message}
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
        return (
            <View style={styles.container}>
                <Image
                    source={{uri: this.props.pushEvent.actor.avatar_url}}
                    style={styles.avatar}/>

                <Text
                    style={styles.moment}>
                    {moment(this.props.pushEvent.created_at).fromNow()}
                </Text>

                <Text>
                    <Text
                        style={styles.bold}>
                        {this.props.pushEvent.actor.login}
                    </Text>
                    <Text> pushed to</Text>
                </Text>

                <Text
                    style={styles.bold}>
                    {this.props.pushEvent.payload.ref.replace('refs/heads/')}
                </Text>
                <Text>
                    <Text>at </Text>
                    <Text
                        style={styles.bold}>
                        {this.props.pushEvent.repo.name}
                    </Text>
                </Text>
                <Text
                    style={styles.commitCount}>
                    {this.props.pushEvent.payload.commits.length} Commit(s)
                </Text>

                <FlatList
                    data={this.props.pushEvent.payload.commits}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={item => item.sha}
                    ItemSeparatorComponent={this.renderSeparator.bind(this)}
                    automaticallyAdjustContentInsets={false}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    avatar: {
        height: 120,
        width: 120,
        borderRadius: 60
    },
    moment: {
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 20
    },
    commitCount: {
        paddingTop: 40,
        fontSize: 20
    },
    commits: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center'
    },
    separator: {
        height: 1,
        backgroundColor: "#d7d7d7"
    },
    bold: {
        fontWeight: 'bold',
        fontSize: 16
    }
})
