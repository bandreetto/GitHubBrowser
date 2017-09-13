'use strict';

import React, {Component} from 'react'
import {
    ActivityIndicator,
    Image,
    ListView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native'
import moment from 'moment'

export default class Feed extends Component {
    renderRow(rowData) {
        return (
            <TouchableHighlight
                onPress={() => this.props.rowPressEvent(rowData)}
                underlayColor='#ddd' >
                <View style={styles.row}>
                    <Image
                        source={{uri: rowData.actor.avatar_url}}
                        style={styles.avatar}/>

                    <View style={styles.textContainer}>
                        <Text style={styles.text}>
                            {moment(rowData.created_at).fromNow()}
                        </Text>
                        <Text style={styles.text}>
                            <Text style={styles.boldText}>{rowData.actor.login}</Text> pushed to
                        </Text>
                        <Text style={styles.boldText}>
                            {rowData.payload.ref.replace('refs/heads/', '')}
                        </Text>
                        <Text style={styles.text}>
                            at <Text style={styles.boldText}>{rowData.repo.name}</Text>
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
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
                <ListView
                    dataSource={this.props.dataSource()}
                    renderRow={this.renderRow.bind(this)}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 60
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        backgroundColor: "#FFF",
        borderColor: '#d7d7d7',
        borderBottomWidth: 1
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
    }
})
