import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { IconButton } from '@react-native-material/core';
import { Badge } from 'react-native-elements';
import Icon from '@expo/vector-icons/Feather';

import HomeScreen from './src/screens/Home';
import ProductListScreen from './src/screens/ProductList';
import ProductDetailsScreen from './src/screens/ProductDetails';
import CartScreen from './src/screens/Cart';
import AccountScreen from './src/screens/Account';
import React from 'react';

import { Provider, useSelector } from 'react-redux';
import { store } from './src/redux/store';

const Stack = createNativeStackNavigator();
const CartHeaderIcons = () => {
    const productCart = useSelector((state) => state.cart);
    const getTotalQuantity = () => {
        let total = 0;
        if (productCart.cart !== []) {
            productCart.cart.forEach((item) => {
                total += item.quantity;
            });
        }
        return total;
    };

    const navigation = useNavigation();
    let totalQty = getTotalQuantity() || null;
    var qty = totalQty;
    if (totalQty > 99) {
        qty = '99+';
    }
    return (
        <IconButton
            style={{ alignItems: 'center', fontSize: 20 }}
            color='primary'
            icon={(props) => (
                <View>
                    <Icon name='shopping-bag' {...props} />
                    {qty !== null && (
                        <Badge
                            containerStyle={{
                                position: 'absolute',
                                left: 10,
                                top: 0,
                            }}
                            status='warning'
                            value={`${qty}`}></Badge>
                    )}
                </View>
            )}
            onPress={() => navigation.navigate('Cart')}
        />
    );
};

const FavHeaderIcons = () => {
    const navigation = useNavigation();
    return (
        <IconButton
            style={{ alignItems: 'center', fontSize: 20 }}
            color='primary'
            icon={(props) => <Icon name='heart' {...props} />}
            onPress={() => navigation.navigate('Favorite')}
        />
    );
};

function Navigation() {
    return (
        <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
            <Stack.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    headerLeft: () => (
                        <IconButton
                            style={{ alignItems: 'center', fontSize: 20 }}
                            color='primary'
                            icon={(props) => <Icon name='menu' {...props} />}
                            onPress={() => alert('Clicked Menu Icon')}
                        />
                    ),
                    headerTitle: () => (
                        <View style={{ flexDirection: 'row' }}>
                            <Text
                                style={{
                                    marginLeft: 8,
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: '#000',
                                    backgroundColor: '#fff',
                                }}>
                                E-Shop
                            </Text>
                        </View>
                    ),
                    headerRight: () => <CartHeaderIcons />,
                    headerStyle: {
                        flex: 1,
                        elevation: 25,
                        shadowColor: '#fff',
                        alignContent: 'space-between',
                    },
                }}
            />
            <Stack.Screen
                name='Product List'
                component={ProductListScreen}
                options={{
                    headerTitle: () => (
                        <View style={{ flexDirection: 'row' }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: '#000',
                                    backgroundColor: '#fff',
                                }}>
                                E-Shop
                            </Text>
                        </View>
                    ),
                    headerRight: () => <CartHeaderIcons />,
                    headerStyle: {
                        flex: 1,
                        elevation: 25,
                        shadowColor: '#fff',
                        alignContent: 'space-between',
                    },
                }}
            />
            <Stack.Screen
                name='Product Details'
                component={ProductDetailsScreen}
                options={{
                    title: '',
                    headerRight: () => <FavHeaderIcons />,
                    headerStyle: {
                        flex: 1,
                        elevation: 25,
                        shadowColor: '#fff',
                        alignContent: 'space-between',
                    },
                }}
            />

            <Stack.Screen
                name='Favorite'
                component={AccountScreen}
                options={{
                    headerTitle: () => (
                        <View style={{ flexDirection: 'row' }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: '#000',
                                    backgroundColor: '#fff',
                                }}>
                                E-Shop
                            </Text>
                        </View>
                    ),
                    headerRight: () => <CartHeaderIcons />,
                    headerStyle: {
                        flex: 1,
                        elevation: 25,
                        shadowColor: '#fff',
                        alignContent: 'space-between',
                    },
                }}
            />

            <Stack.Screen
                name='Cart'
                component={CartScreen}
                options={{
                    headerTitle: () => (
                        <View style={{ flexDirection: 'row' }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: '#000',
                                    backgroundColor: '#fff',
                                }}>
                                E-Shop
                            </Text>
                        </View>
                    ),
                    headerRight: () => <CartHeaderIcons />,
                    headerStyle: {
                        flex: 1,
                        elevation: 25,
                        shadowColor: '#fff',
                        alignContent: 'space-between',
                    },
                }}
            />
            <Stack.Screen
                name='Account'
                component={AccountScreen}
                options={{
                    headerTitle: () => (
                        <View style={{ flexDirection: 'row' }}>
                            <Text
                                style={{
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: '#000',
                                    backgroundColor: '#fff',
                                }}>
                                E-Shop
                            </Text>
                        </View>
                    ),
                }}
            />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                    <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: '#fff' }}>
                        <View style={{ flex: 1, backgroundColor: '#000' }}>
                            <Navigation />
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </NavigationContainer>
        </Provider>
    );
}
