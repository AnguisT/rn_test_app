import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {BW} from '../const';

class Carousel extends Component {
  render() {
    const {right, pizza} = this.props;
    return (
      <ScrollView
        ref={(ref) => this.props.onRef(ref)}
        onScroll={this.props.onScroll}
        showsVerticalScrollIndicator={false}
        decelerationRate={0}
        snapToInterval={255 * BW}
        contentContainerStyle={{
          paddingVertical: 255 * BW,
        }}
        snapToAlignment={'center'}
        overScrollMode="never"
        pagingEnabled>
        {pizza.map((item, index) => {
          const styleTitle =
            this.props.activeItem === index
              ? styles.pizzaTitle
              : styles.pizzaTitleNone;
          return (
            <View
              key={`l${item.id}`}
              style={styles.containerItem}
              onLayout={this.props.onLayoutItem}>
              <View
                style={right ? styles.rightPizzaTitle : styles.leftPizzaTitle}>
                <Text style={styleTitle}>{item.name}</Text>
                <Text style={styleTitle}>{item.price} ₽</Text>
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
          );
        })}
      </ScrollView>
    );
  }
}

export default Carousel;

const styles = StyleSheet.create({
  containerItem: {height: 255 * BW},
  itemLeftCarousel: {
    alignItems: 'flex-end',
  },
  leftCarouselImageWrapper: {
    width: 120,
    height: 250,
    backgroundColor: 'transparent',
    overflow: 'hidden',
  },
  leftPizzaTitle: {
    alignItems: 'flex-start',
  },
  itemRightCarousel: {
    alignItems: 'flex-start',
  },
  rightCarouselImageWrapper: {
    width: 130,
    height: 250,
    backgroundColor: 'transparent',
    overflow: 'hidden',
    alignItems: 'flex-end',
  },
  rightPizzaTitle: {
    alignItems: 'flex-end',
  },
  pizzaImage: {
    width: 250,
    height: 250,
    borderRadius: 110,
    backgroundColor: 'transparent',
  },
  pizzaTitle: {
    color: 'black',
  },
  pizzaTitleNone: {
    color: 'white',
  },
});
