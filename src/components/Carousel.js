import React, {Component} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BW} from '../const';

class Carousel extends Component {
  state = {
    animation: new Animated.Value(1),
  };

  startAnimation = (index) => {
    Animated.timing(this.state.animation, {
      toValue: 0,
      timing: 300,
      useNativeDriver: true,
    }).start(() => {
      this.props.onSelect(index);
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  render() {
    const {pizza, right, activeItem} = this.props;
    return (
      <View style={styles.containerCarousel}>
        {activeItem > 0 ? (
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.startAnimation(activeItem - 1)}
            style={styles.buttonChange}>
            <Image
              resizeMode="contain"
              style={styles.arrowImage}
              source={require('../../assets/arrow-up.png')}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonChange} />
        )}
        <View style={styles.flex}>
          {pizza.map((item, index) => {
            return (
              index === activeItem && (
                <Animated.View
                  key={`l${item.id}`}
                  style={[
                    styles.containerItem,
                    {opacity: this.state.animation},
                  ]}>
                  <View
                    style={
                      right ? styles.rightPizzaTitle : styles.leftPizzaTitle
                    }>
                    <Text style={styles.pizzaTitle}>{item.name}</Text>
                    <Text style={[styles.pizzaTitle, styles.opacity]}>
                      {item.price} ₽
                    </Text>
                  </View>
                  <View
                    style={
                      right ? styles.itemRightCarousel : styles.itemLeftCarousel
                    }>
                    <View
                      style={
                        right
                          ? styles.rightCarouselImageWrapper
                          : styles.leftCarouselImageWrapper
                      }>
                      <Image
                        resizeMode="contain"
                        style={styles.pizzaImage}
                        source={{uri: item.image}}
                      />
                    </View>
                  </View>
                </Animated.View>
              )
            );
          })}
        </View>
        {activeItem < pizza.length - 1 ? (
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => this.startAnimation(activeItem + 1)}
            style={[styles.buttonChange]}>
            <Image
              style={styles.arrowImage}
              resizeMode="contain"
              source={require('../../assets/arrow-down.png')}
            />
          </TouchableOpacity>
        ) : (
          <View style={[styles.buttonChange]} />
        )}
      </View>
    );
  }
}

export default Carousel;

const styles = StyleSheet.create({
  containerCarousel: {
    width: '50%',
    overflow: 'hidden',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  buttonChange: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {flex: 1},
  containerItem: {
    paddingHorizontal: 1 * BW,
  },
  itemLeftCarousel: {
    alignItems: 'flex-end',
  },
  leftCarouselImageWrapper: {
    width: 120 * BW,
    height: 250 * BW,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  leftPizzaTitle: {
    height: 25 * BW,
    alignItems: 'flex-start',
  },
  itemRightCarousel: {
    alignItems: 'flex-start',
  },
  rightCarouselImageWrapper: {
    width: 130 * BW,
    height: 250 * BW,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    alignItems: 'flex-end',
  },
  rightPizzaTitle: {
    height: 25 * BW,
    alignItems: 'flex-end',
  },
  pizzaImage: {
    width: 250 * BW,
    height: 250 * BW,
    borderRadius: 110 * BW,
    backgroundColor: 'transparent',
  },
  pizzaTitle: {
    color: 'black',
  },
  pizzaTitleNone: {
    color: 'white',
  },
  opacity: {
    opacity: 0.5,
  },
  marginTop: {marginTop: 25 * BW},
  arrowImage: {
    height: 25 * BW,
    width: 25 * BW,
  },
});
