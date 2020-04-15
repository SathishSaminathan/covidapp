import call from 'react-native-phone-call';

export default class PhoneCall {
  makeCall() {
    const args = {
      number: '8012941249', // String value with the number to call
      prompt: false, // Optional boolean property. Determines if the user should be prompt prior to the call
    };

    call(args).catch(console.error);
  }
}
