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
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  containerCarousel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  containerPrice: {
    paddingTop: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textPrice: {
    fontSize: 16,
  },
  containerFinishButton: {
    height: 70,
    padding: 10,
  },
  finishButton: {
    borderRadius: 10,
    backgroundColor: '#e96c2c',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    height: '100%',
  },
  finishText: {
    color: 'white',
    fontSize: 16,
  },
  randomImage: {
    height: 25,
    width: 25,
  },
  floatButton: {
    position: 'absolute',
    height: 50,
    width: 50,
    borderRadius: 25,
    bottom: 100,
    right: 15,
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
