import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Platform,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Carousel from '../components/Carousel';
import {pizzaRequestAsync} from '../../redux/actions';
import {BW} from '../const';

class Home extends Component {
  state = {
    firstPrice: 0,
    firstActive: 0,

    secondPrice: 0,
    secondActive: 0,
  };

  componentDidMount() {
    this.props.pizzaRequestAsync();
  }

  componentDidUpdate(prevProps) {
    if (this.props.pizza !== prevProps.pizza) {
      if (this.props.pizza.length) {
        this.setState({
          firstPrice: this.props.pizza[0].price,
          secondPrice: this.props.pizza[1].price,
        });
      }
    }
  }

  onScroll = (event, field, active) => {
    const index = Math.round(event.nativeEvent.contentOffset.y / 255);
    this.setState({[field]: this.props.pizza[index].price, [active]: index});
  };

  onLayoutItem = (event, array) => {
    const yPosition = event.nativeEvent.layout.y;
    this.setState((state) => ({
      [array]: [...state[array], yPosition],
    }));
  };

  changePizza = (val, active, field) => {
    const {pizza} = this.props;
    this.setState({[active]: val, [field]: pizza[val].price});
  };

  randomPizza = () => {
    const {pizza} = this.props;
    const first = Math.floor(Math.random() * 6);
    const second = Math.floor(Math.random() * 6);
    this.setState({
      firstActive: first,
      secondActive: second,
      firstPrice: pizza[first].price,
      secondPrice: pizza[second].price,
    });
  };

  render() {
    const {firstPrice, secondPrice} = this.state;
    const {pizza, isLoadingPizza} = this.props;
    return (
      <View style={styles.container}>
        {isLoadingPizza ? (
          <ActivityIndicator size="large" color="red" />
        ) : (
          <>
            <View style={styles.containerCarousel}>
              <Carousel
                pizza={pizza}
                activeItem={this.state.firstActive}
                onSelect={(val) =>
                  this.changePizza(val, 'firstActive', 'firstPrice')
                }
              />
              <Carousel
                right
                pizza={pizza}
                activeItem={this.state.secondActive}
                onSelect={(val) =>
                  this.changePizza(val, 'secondActive', 'secondPrice')
                }
              />
            </View>
            <View style={styles.containerPrice}>
              <Text style={styles.textPrice}>
                Цена {firstPrice + secondPrice} ₽
              </Text>
            </View>
            <View style={styles.containerFinishButton}>
              <TouchableOpacity
                style={styles.finishButton}
                onPress={() => console.log('Объединить половинки')}>
                <Text style={styles.finishText}>Объединить половинки</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.floatButton}
              onPress={this.randomPizza}>
              <Image
                resizeMode="contain"
                style={styles.randomImage}
                source={require('../../assets/random.png')}
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoadingPizza: state.isLoadingPizza,
  pizza: state.pizza,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({pizzaRequestAsync}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingHorizontal: 15 * BW,
    justifyContent: 'center',
  },
  containerCarousel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  containerPrice: {
    paddingTop: 5 * BW,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPrice: {
    fontSize: 16 * BW,
  },
  containerFinishButton: {
    height: 70 * BW,
    padding: 10 * BW,
  },
  finishButton: {
    borderRadius: 10 * BW,
    backgroundColor: '#e96c2c',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    height: '100%',
  },
  finishText: {
    color: 'white',
    fontSize: 16 * BW,
  },
  randomImage: {
    height: 25 * BW,
    width: 25 * BW,
  },
  floatButton: {
    position: 'absolute',
    height: 50 * BW,
    width: 50 * BW,
    borderRadius: 25 * BW,
    bottom: 100 * BW,
    right: 15 * BW,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
