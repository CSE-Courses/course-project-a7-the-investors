import * as React from "react";
import {Text, View} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import {Button} from "react-native-paper";
import * as SecureStore from "expo-secure-store";
import {AsyncStorage} from "react-native";
import Parse, {User} from "parse/react-native.js";

export default class FollowBoardRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dollars: 1
        };
    }

    async delFollower(follow) {
        console.log(follow);
        Parse.setAsyncStorage(AsyncStorage);
        Parse.serverURL = "https://parseapi.back4app.com"; // This is your Server URL
        Parse.initialize(
            "DQkWjHzOqleUvvD7H4seMLVzihUkKAFvxmjXzEAz", // This is your Application ID
            "97TLDTbw7uSO8KL3jcOIAUpK500K02bv7440VqV4" // This is your Javascript key
        );

        let sessionToken;

        SecureStore.getItemAsync("sessionToken").then((token) => {
            sessionToken = token;
        });

        const User = new Parse.User();
        const query = new Parse.Query(User);
        let followList;
        let followIds;

        await SecureStore.getItemAsync("followingIds").then((tfollowingIds) => {
            followIds = JSON.parse(tfollowingIds);
        });


        await Parse.User.me(sessionToken)
            .then((user) => {
                const currentUser = Parse.User.current();
                followList = currentUser.get('following');
                //followIds = currentUser.get('followIds')
                if (followList !== undefined) {
                    let idx = followList.indexOf(follow);
                    console.log(idx);
                    if (idx != -1) {
                        followList.splice(idx, 1);
                        followIds.splice(idx, 1);
                        currentUser.set("following", followList);
                        currentUser.set("following", followIds);

                        user
                            .save()
                            .then((response) => {
                                if (typeof document !== "undefined")
                                    document.write(`Updated user: ${JSON.stringify(response)}`);
                                console.log("Updated user", response);
                            })
                            .catch((error) => {
                                if (typeof document !== "undefined")
                                    document.write(
                                        `Error while updating user: ${JSON.stringify(error)}`
                                    );
                                console.error("Error while updating user", error);
                            });
                    }
                }
            })
            .catch((error) => {
                if (typeof document !== "undefined")
                    document.write(
                        `Error while logging in user: ${JSON.stringify(error)}`
                    );
                console.error("Error while logging in user", error);
            });


    }

    render() {
        return (
            <View style={styles.container}
            >

                <TouchableOpacity onPress={() => this.props.navigation.navigate('FollowingPortfolio', {
                    id: this.props.id,

                })}>
                    <Text style={styles.textStyling}> {this.props.username} </Text>
                </TouchableOpacity>
                    {/*<Text style={styles.textStyling}> ${this.props.money} </Text> */}
                    <Button style={styles.buttonRemoveFollow}
                            onPress={() => this.delFollower(this.props.username)}>del</Button>

            </View>

        );
    }
}

const styles = {
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: "grey",
        width: "95%",
        alignSelf: "center",
        height: 45,
        marginTop: 8,
    },
    textStyling: {
        fontSize: 20,
        //flex: 1,
    },
    buttonRemoveFollow: {
        elevation: 8,
        backgroundColor: "#FF0000",
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 5,
    }
};
