import React, {Text, View, Animated, Image, StyleSheet, Platform} from 'react-native';

var ParsedText = require('react-native-parsed-text');

let styles = StyleSheet.create({
  bubble: {
    borderRadius: 15,
    paddingLeft: 14,
    paddingRight: 14,
    paddingBottom: 10,
    paddingTop: 8,
  },
  text: {
    color: '#000',
  },
  textLeft: {
  },
  textRight: {
    color: '#fff',
  },
  bubbleLeft: {
    marginRight: 70,
    backgroundColor: '#e6e6eb',
    alignSelf: "flex-start",
  },
  bubbleRight: {
    marginLeft: 70,
    backgroundColor: '#007aff',
    alignSelf: "flex-end"
  },
  bubbleError: {
    backgroundColor: '#e01717'
  },
  url: {
     color: 'red',
     textDecorationLine: 'underline',
   },

   email: {
     textDecorationLine: 'underline',
   },

   text: {
     color: 'black',
     fontSize: 15,
   },

   phone: {
     color: 'blue',
     textDecorationLine: 'underline',
   },

   name: {
     color: 'red',
   },

   username: {
     color: 'green',
     fontWeight: 'bold'
   },

   magicNumber: {
     fontSize: 42,
     color: 'pink',
   },

   hashTag: {
     fontStyle: 'italic',
     textDecorationLine: 'underline',
     color: 'blue',
   },

});

export default class Bubble extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    Object.assign(styles, this.props.styles);
  }

  renderText(text = "", position) {

    if (this.props.renderCustomText) {
      return this.props.renderCustomText(text, position);
    }

    if (this.props.parseText === true && Platform.OS !== 'android') {
      return (
        <ParsedText
          style={[styles.text, (position === 'left' ? styles.textLeft : styles.textRight)]}
          parse={
            [
              {type: 'url',                       style: styles.url, onPress: this.props.handleUrlPress},
              {type: 'phone',                     style: styles.phone, onPress: this.props.handlePhonePress},
              {type: 'email',                     style: styles.email, onPress: this.props.handleEmailPress},
              {pattern: /#(\w+)/,                 style: styles.hashTag, onPress: this.props.handleHashPress},
              {pattern: /share robinhealth/i,     style: styles.hashTag, onPress: this.props.handleHashPress},
            ]
          }
        >
          {text}
        </ParsedText>      );
    }
    return (
      <Text style={[styles.text, (position === 'left' ? styles.textLeft : styles.textRight)]}>
        {text}
      </Text>
    );
  }

  render(){
    var flexStyle = {};
    if ( this.props.text.length > 40 ) {
     flexStyle.flex = 1;
    }

    return (
      <View style={[styles.bubble,
        (this.props.position === 'left' ? styles.bubbleLeft : styles.bubbleRight),
        (this.props.status === 'ErrorButton' ? styles.bubbleError : null),
        flexStyle]}>
        {this.renderText(this.props.text, this.props.position)}
      </View>
    )
  }
}

Bubble.propTypes = {
  position: React.PropTypes.oneOf(['left','right']),
  status: React.PropTypes.string,
  text: React.PropTypes.string,
  renderCustomText: React.PropTypes.func
}
