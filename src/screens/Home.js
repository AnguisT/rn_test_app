import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  View,
  Platform,
  Text,
  TouchableOpacity,
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
    firstYPositions: [],

    secondPrice: 0,
    secondActive: 0,
    secondYPositions: [],
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

  _renderItem = ({item, index}) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.name}</Text>
      </View>
    );
  };

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

  render() {
    const {firstPrice, secondPrice} = this.state;
    const {pizza} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.containerCarousel}>
          <Carousel
            onRef={(ref) => (this.scrollViewLeft = ref)}
            pizza={pizza}
            onScroll={(event) =>
              this.onScroll(event, 'firstPrice', 'firstActive')
            }
            activeItem={this.state.firstActive}
            onLayoutItem={(event) =>
              this.onLayoutItem(event, 'firstYPositions')
            }
          />
          <Carousel
            right
            onRef={(ref) => (this.scrollViewRight = ref)}
            pizza={pizza}
            onScroll={(event) =>
              this.onScroll(event, 'secondPrice', 'secondActive')
            }
            activeItem={this.state.secondActive}
            onLayoutItem={(event) =>
              this.onLayoutItem(event, 'secondYPositions')
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
          onPress={() => {
            const {firstYPositions, secondYPositions} = this.state;
            this.scrollViewLeft.scrollTo({
              y: firstYPositions[Math.floor(Math.random() * 6)],
              animated: true,
            });
            this.scrollViewRight.scrollTo({
              y: secondYPositions[Math.floor(Math.random() * 6)],
              animated: true,
            });
          }}>
          <Image
            resizeMode="contain"
            style={styles.randomImage}
            source={require('../../assets/random.png')}
          />
        </TouchableOpacity>
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
  },
  containerCarousel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerPrice: {
    position: 'absolute',
    bottom: 70 * BW,
    left: 15 * BW,
    right: 15 * BW,
    paddingTop: 5 * BW,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textPrice: {
    fontSize: 16 * BW,
  },
  containerFinishButton: {
    position: 'absolute',
    bottom: 0 * BW,
    right: 0 * BW,
    left: 0 * BW,
    height: 70 * BW,
    padding: 10 * BW,
    backgroundColor: 'white',
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
