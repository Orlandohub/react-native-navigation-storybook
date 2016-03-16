import React, {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  AlertIOS
} from 'react-native';

// important imports, the magic is here
import { Navigation, Screen } from 'react-native-navigation';

// instead of React.Component, we extend Screen (imported above)
class SecondTabScreen extends Screen {
  constructor(props) {
    super(props);
    this.buttonsCounter = 0;
  }
  render() {
    return (
      <View style={{flex: 1, padding: 20}}>

        <TouchableOpacity onPress={ this.onChangeButtonsPress.bind(this) }>
          <Text style={styles.button}>Change Buttons</Text>
        </TouchableOpacity>

      </View>
    );
  }
  onChangeButtonsPress() {
    let buttons;
    if (this.buttonsCounter % 3 == 0) {
      buttons = [
        {
          title: 'Edit',
          id: 'edit'
        },
        {
          icon: require('../../img/navicon_add.png'),
          id: 'add'
        }
      ];
    } else if (this.buttonsCounter % 3 == 1) {
      buttons = [{
        title: 'Save',
        id: 'save'
      }];
    } else {
      buttons = [];
    }
    this.buttonsCounter++;

    this.navigator.setButtons({
      rightButtons: buttons,
      animated: true
    });
  }
  onNavigatorEvent(event) {
    if (event.id == 'edit') {
      AlertIOS.alert('NavBar', 'Dynamic Edit button pressed');
    }
    if (event.id == 'add') {
      AlertIOS.alert('NavBar', 'Dynamic Add button pressed');
    }
    if (event.id == 'save') {
      AlertIOS.alert('NavBar', 'Dynamic Save button pressed');
    }
  }
}

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 10,
    marginTop:10,
    color: 'blue'
  }
});

// every screen must be registered with a unique name
Navigation.registerScreen('example.SecondTabScreen', () => SecondTabScreen);
