/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { PureComponent } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
} from 'react-native';

import stripe from 'tipsi-stripe';
import axios from 'axios';



stripe.setOptions({
  publishableKey: 'pk_test_0muzBam7ElJOaYb1pGzyhZpV00QceMJWJK',
});

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      token: null,
      number: '',
      expMonth: '',
      expYear: '',
      cvc: '',
      name: '',
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true, token: null })
    const token = await stripe.paymentRequestWithCardForm();

    this.setState({ isLoading: false, token });
  }

  handleCardPayPress = async () => {

    this.setState({isLoading:true});

    axios({
      method:'POST',
      url:'https://us-central1-react-native-stripe-67233.cloudfunctions.net/completePaymentWith3DSecureStripe',
      data: {
        amount: 100,
        currency: 'usd',
        token: this.state.token,
      },
    }).then(response => {
      console.log(response);
      this.setState({isLoading: false});
    });

  }

  render() {
    return (
        <View style={{padding: 10}}>
          <Button onPress={this.handleCardPayPress} title={'subscribe'} />
        </View>
    );
  }
}
