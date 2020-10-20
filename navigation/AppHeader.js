import {Appbar,Text} from "react-native-paper";
import * as React from "react";
import {Component} from "react";


export default class AppHeader extends Component {


    render() {

        return (

            <Appbar.Header style={style.appBar}>
                <Appbar.Content
                    title={<Text>Global</Text>}
                    style={{ alignItems: 'center' }}
                />
            </Appbar.Header>
        )
            ;

    }
};

const style = {
    appBar: {
        backgroundColor: "white"
    }
}