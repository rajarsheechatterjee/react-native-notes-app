import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableHighlight } from "react-native";
import Colors from "../../theming/colors";
import { FAB, Portal, Provider } from "react-native-paper";

// Custom components
import DeleteButton from "./Components/DeleteTaskButton";
import EditButton from "./Components/EditTaskButton";
import { deleteTask } from "../../utils/firebase";

import moment from "moment";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function TaskItem({ route, navigation }) {
    const { id, taskTitle, taskContent, taskTime, isCompleted } = route.params;

    const [state, setState] = useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;

    return (
        <Provider>
            <View style={{ flex: 1 }}>
                <View style={styles.mainContainer}>
                    <View
                        style={{
                            borderBottomWidth: 1,
                            borderBottomColor: "#E8E8E8",
                        }}
                    >
                        <Text style={styles.taskTitle}>
                            {taskTitle}{" "}
                            {isCompleted && (
                                <MaterialCommunityIcons
                                    name="check-all"
                                    color="green"
                                    size={25}
                                    style={{ paddingTop: 15 }}
                                />
                            )}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.taskDate}>
                            Due {moment(taskTime).calendar()}
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.taskContent}>{taskContent}</Text>
                    </View>
                </View>
                {/* <EditButton navigation={navigation} taskItem={route.params} />
                <DeleteButton navigation={navigation} taskId={id} /> */}
                <Portal>
                    <FAB.Group
                        open={open}
                        color="white"
                        fabStyle={{ backgroundColor: Colors.accentColor }}
                        icon={open ? "dots-vertical" : "dots-horizontal"}
                        actions={[
                            {
                                icon: "share-variant",
                                color: Colors.accentColor,
                                label: "Share",
                            },
                            {
                                icon: "trash-can-outline",
                                color: "#E53935",
                                label: "Delete",
                                onPress: () => deleteTask(navigation, id),
                            },
                            {
                                icon: "pencil",
                                label: "Edit",
                                color: Colors.accentColor,
                                onPress: () =>
                                    navigation.navigate(
                                        "EditTask",
                                        route.params
                                    ),
                            },
                        ]}
                        onStateChange={onStateChange}
                    />
                </Portal>
            </View>
        </Provider>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 20,
        margin: 10,
        padding: 20,
        elevation: 1,
        paddingTop: 15,
        borderRadius: 15,
        backgroundColor: "white",
        color: Colors.textColor,
    },
    taskTitle: {
        fontWeight: "700",
        fontSize: 36,
        paddingTop: 5,
        paddingBottom: 10,
    },
    taskDate: {
        paddingVertical: 10,
        fontSize: 14,
        color: Colors.subTextColor,
    },
    taskContent: {
        fontSize: 18,
        lineHeight: 29,
    },
});