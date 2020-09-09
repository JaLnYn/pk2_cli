import {View, StyleSheet, Text, TextInput} from 'react-native';
import * as React from 'react'
import FilledButton from './FilledButton'
import DateTimePicker from '@react-native-community/datetimepicker';
    


export default function Input(props){
    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);
    
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || props.date;
        setShow(Platform.OS === 'ios');
        props.onChange(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };
    return (
        <View style={styles.container}>
            <View style={styles.textbox}>
                <Text style={styles.text}>
                    {props.text}
                </Text>
            </View>
            
            <FilledButton {...props} style={[props.style, styles.input]} title={"(y-m-d): "+ props.date.getFullYear() + "-" + (props.date.getMonth() + 1) + "-" + props.date.getDate()}
            onPress={() => {showDatepicker()}}/>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={props.date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: '100%'
    },
    textbox: {
        padding: 5,
        justifyContent: 'center',
        alignContent: 'center',
        flex: 2
    },
    text: {

    },

    input: {
        backgroundColor: '#ccc',
        flex: 6,
        padding: 10,
        borderRadius:8,
    }
})