import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

import HomeScreen from '../screens/home';
import VendorScreen from '../screens/vendor';
import SearchScreen from '../screens/search';
import BasketScreen from '../screens/basket';
import ProfileScreen from '../screens/profile';
import LoginScreen from '../screens/auth/loginScreen';
import AddressScreen from '../screens/address';
import AddAddressScreen from '../screens/address/addAddress';
import UserOrdersScreen from '../screens/orders';
import SignupScreen from '../screens/auth/signupScreen';
import OrderDetailScreen from '../screens/orders/detail';
import MoreScreen from '../screens/more';
import BusinessCustomersScreen from '../screens/business/customer';
import BusinessProfileScreen from '../screens/business/profile';
import BusinessScreen from '../screens/business';
import BusinessOrdersScreen from '../screens/business/order';
import BusinessProductsScreen from '../screens/business/product';
import ProductDetailScreen from '../screens/business/product/detail';
import CustomerDetailScreen from '../screens/business/customer/detail';
import BusinessOrderDetailScreen from '../screens/business/order/detail';
import BusinessAddProductScreen from '../screens/business/product/add-product';
import {Product} from '../types/product';
import {Customer} from '../types/user';
import {Order} from '../types/general';
import VendorOptionsScreen from '../screens/vendor/options';
import AddReviewScreen from '../screens/vendor/addReview';
import VendorContactScreen from '../screens/vendor/contact';
import BusinessCreateScreen from '../screens/business/create';
import BankAccountScreen from '../screens/bank';
import AddBankAccountScreen from '../screens/bank/addBank';
import TransactionOrderDetailScreen from '../screens/orders/transactionOrder';
import UserWithdrawalHistoryScreen from '../screens/withdrawals';
import UserWalletWithdrawScreen from '../screens/withdrawals/withdraw';
import UserWalletScreen from '../screens/wallet';
import BusinessSaleScreen from '../screens/business/sales';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Basket: {id: string; title: string};
  More: undefined;
  Profile: undefined;
  UserWallet: undefined;
  UserWalletWithdraw: undefined;
  UserWithdrawalHistory: undefined;
  Login: undefined;
  Signup: undefined;
  Address: undefined;
  Orders: undefined;
  AddReview: undefined;
  BankAccount: undefined;
  AddBankAccount: undefined;
  BusinessCreate: undefined;
  BusinessCustomers: undefined;
  BusinessMore: undefined;
  BusinessProfile: undefined;
  BusinessOrders: undefined;
  BusinessProducts: undefined;
  BusinessAddProduct: undefined;
  BusinessSale: undefined;
  BusinessOrderDetail: {order: Order};
  BusinessProductDetail: {product: Product};
  BusinessCustomerDetail: {customer: Customer};
  OrderDetail: {id: string};
  TransactionOrderDetail: {id: string};
  AddAddress: undefined;
  Vendor: {id: string; title: string};
  VendorOptions: {id: string};
  VendorContact: {id: string};
  Feed: {sort: 'latest' | 'top'} | undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

export default function RootNavigation() {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect(() => {
    if (Platform.OS === 'ios') {
      requestUserPermission();
    }
    RNBootSplash.hide({fade: true, duration: 500}); // fade with custom duration
  }, []);

  return (
    <RootStack.Navigator detachInactiveScreens={false} initialRouteName="Home">
      <RootStack.Screen name="Home" component={HomeScreen} />
      <RootStack.Screen name="Vendor" component={VendorScreen} />
      <RootStack.Screen name="VendorOptions" component={VendorOptionsScreen} />
      <RootStack.Screen name="Search" component={SearchScreen} />
      <RootStack.Screen name="Basket" component={BasketScreen} />
      <RootStack.Screen name="More" component={MoreScreen} />
      <RootStack.Screen name="Profile" component={ProfileScreen} />
      <RootStack.Screen name="UserWallet" component={UserWalletScreen} />
      <RootStack.Screen
        name="UserWithdrawalHistory"
        component={UserWithdrawalHistoryScreen}
      />
      <RootStack.Screen
        name="UserWalletWithdraw"
        options={{title: 'Make a Withdrawal'}}
        component={UserWalletWithdrawScreen}
      />
      <RootStack.Screen name="Orders" component={UserOrdersScreen} />
      <RootStack.Screen name="OrderDetail" component={OrderDetailScreen} />
      <RootStack.Screen
        name="TransactionOrderDetail"
        component={TransactionOrderDetailScreen}
      />
      <RootStack.Screen name="AddReview" component={AddReviewScreen} />
      <RootStack.Screen name="VendorContact" component={VendorContactScreen} />
      <RootStack.Screen
        name="BusinessCreate"
        component={BusinessCreateScreen}
      />
      <RootStack.Screen
        name="BusinessProducts"
        component={BusinessProductsScreen}
      />
      <RootStack.Screen
        name="BusinessCustomers"
        component={BusinessCustomersScreen}
      />
      <RootStack.Screen
        name="BusinessProfile"
        options={{title: 'Update Business'}}
        component={BusinessProfileScreen}
      />
      <RootStack.Screen
        name="BusinessMore"
        options={{title: 'Your Business'}}
        component={BusinessScreen}
      />
      <RootStack.Screen
        name="BusinessOrders"
        component={BusinessOrdersScreen}
      />
      <RootStack.Screen
        name="BusinessOrderDetail"
        component={BusinessOrderDetailScreen}
      />
      <RootStack.Screen
        name="BusinessProductDetail"
        component={ProductDetailScreen}
      />
      <RootStack.Screen
        name="BusinessAddProduct"
        component={BusinessAddProductScreen}
      />
      <RootStack.Screen
        name="BusinessCustomerDetail"
        component={CustomerDetailScreen}
      />
      <RootStack.Screen
        name="BusinessSale"
        options={{title: 'Business Sales'}}
        component={BusinessSaleScreen}
      />
      <RootStack.Screen
        name="BankAccount"
        options={{title: 'Bank Account'}}
        component={BankAccountScreen}
      />
      <RootStack.Screen
        name="AddBankAccount"
        options={{title: 'Add Bank Account'}}
        component={AddBankAccountScreen}
      />
      <RootStack.Screen name="Address" component={AddressScreen} />
      <RootStack.Screen name="AddAddress" component={AddAddressScreen} />
      <RootStack.Screen name="Login" component={LoginScreen} />
      <RootStack.Screen name="Signup" component={SignupScreen} />
    </RootStack.Navigator>
  );
}
