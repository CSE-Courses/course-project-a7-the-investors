import {Appbar} from "react-native-paper";
import * as React from "react";
import {Component} from "react";

export default class AppHeader extends Component {


    render() {

        return (

            <Appbar.Header>
                <Appbar.Content title="Global" />

            </Appbar.Header>
        )
            ;

    }
};

const style = {
    appbar: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center'
    }
}