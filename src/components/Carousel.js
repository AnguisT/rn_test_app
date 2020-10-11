import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BW} from '../const';

class Carousel extends Component {
  render() {
    const {pizza, right, activeItem} = this.props;
    return (
      <View style={styles.containerCarousel}>
        {activeItem > 0 ? (
          <TouchableOpacity
            onPress={() => this.props.onSelect(activeItem - 1)}
            style={styles.buttonChange}>
            <Text>Prev</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonChange} />
        )}
        <View style={styles.flex}>
          {pizza.map((item, index) => {
            return (
              index === activeItem && (
                <View
                  key={`l${item.id}`}
                  style={styles.containerItem}
                  onLayout={this.props.onLayoutItem}>
                  <View
                    style={
                      right ? styles.rightPizzaTitle : styles.leftPizzaTitle
                    }>
                    <Text style={styles.pizzaTitle}>{item.name}</Text>
                    <Text style={styles.pizzaTitle}>{item.price} ₽</Text>
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
                </View>
              )
            );
          })}
        </View>
        {activeItem < pizza.length - 1 ? (
          <TouchableOpacity
            onPress={() => this.props.onSelect(activeItem + 1)}
            style={styles.buttonChange}>
            <Text>Next</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.buttonChange} />
        )}
      </View>
    );
  }
}

export default Carousel;

const styles = StyleSheet.create({
  containerCarousel: {
    width: '50%',
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
    zIndex: 100,
    position: 'absolute',
    top: 0,
    left: 0,
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
    zIndex: 100,
    position: 'absolute',
    top: 0,
    right: 0,
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
});
