"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;

var _reactNative = require("react-native");

const styles = _reactNative.StyleSheet.create({
  container: { ..._reactNative.StyleSheet.absoluteFillObject
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 34
  },
  imageContainer: {
    overflow: 'hidden',
    marginBottom: 64
  },
  title: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: 36,
    marginBottom: 16
  },
  description: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 18
  },
  background: { ..._reactNative.StyleSheet.absoluteFillObject
  },
  next: {
    marginTop: 16,
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignContent: 'center',
    justifyContent: 'center'
  },
  nextText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '600'
  }
});

exports.styles = styles;
//# sourceMappingURL=styles.js.map