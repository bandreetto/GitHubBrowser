'use strict'

import React, {Component} from 'react'
import {NavigatorIOS, TabBarIOS} from 'react-native'
import SmartFeed from './feed/smart-feed'
import SmartSearch from "./search/smart-search";

export default class MainView extends Component {
    componentWillMount() {
        this.setState({
            selectedTab: 'feed'
        })
    }

    render() {
        return (
            <TabBarIOS>
                <TabBarIOS.Item
                    title="Feed"
                    selected={this.state.selectedTab === 'feed'}
                    icon={require('../img/inbox.png')}
                    onPress={() => this.setState({selectedTab: 'feed'})}>
                    <NavigatorIOS
                        style={{flex: 1}}
                        initialRoute={{
                            component: SmartFeed,
                            title: 'Feed'
                        }}/>
                </TabBarIOS.Item>
                <TabBarIOS.Item
                    title="Search"
                    selected={this.state.selectedTab === 'search'}
                    icon={require('../img/search.png')}
                    onPress={() => this.setState({selectedTab: 'search'})}>
                    <NavigatorIOS
                        style={{flex: 1}}
                        initialRoute={{
                            component: SmartSearch,
                            title: 'Search'
                        }}/>
                </TabBarIOS.Item>
            </TabBarIOS>
        )
    }
}
