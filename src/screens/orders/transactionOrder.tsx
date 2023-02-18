import * as React from 'react';
import {View, ScrollView, ActivityIndicator, Alert} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {ListItem, Avatar, Text, Button} from '@rneui/themed';
import {Paystack, paystackProps} from 'react-native-paystack-webview';

import {themeColors} from '../../constants/color';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../redux/store';
import moment from 'moment';
import {s} from 'react-native-size-matters';
import {TransactionStatus} from '../../types/general';
import {styles} from './style';
import {OrderTransaction} from '../../types/cart';
import {Naira, paystack_key} from '../../constants/general';

function TransactionOrderDetailScreen({navigation, route}) {
  const transactionId = route?.params?.id;
  const dispatch = useDispatch<Dispatch>();

  const [transaction, setTransaction] =
    React.useState<OrderTransaction | null>();

  const loading = useSelector(
    (root: RootState) => root.loading.effects.generalModel.getOrderTransaction,
  );
  const statusLoading = useSelector(
    (root: RootState) =>
      root.loading.effects.generalModel.deleteOrderTransaction,
  );

  const {user} = useSelector((root: RootState) => root.userModel);

  const paystackWebViewRef = React.useRef<paystackProps.PayStackRef>();

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Details',
      headerTintColor: themeColors.white,
      headerStyle: {
        backgroundColor: themeColors.mazarine,
      },
      headerShadowVisible: false,
    });
  }, [navigation, transactionId]);

  React.useEffect(() => {
    if (transactionId) {
      dispatch.generalModel
        .getOrderTransaction(transactionId)
        .then(t => setTransaction(t));
    }
  }, [dispatch, transactionId]);

  const handlePayment = () => paystackWebViewRef.current.startTransaction();

  const handlePaymentComplete = () => {
    dispatch.generalModel.getOrderTransaction(transactionId);
    Alert.alert(
      'Payment Completed',
      'Thank you. Your order has been sent to the vendor.',
    );
  };

  const handleDelete = async () => {
    const success = await dispatch.generalModel.deleteOrderTransaction(
      transactionId,
    );
    if (success) {
      navigation.goBack();
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: themeColors.mazarine,
        paddingHorizontal: 20,
        width: '100%',
      }}>
      {loading ? (
        <ActivityIndicator color={themeColors.white} size="large" />
      ) : (
        <></>
      )}
      {!transaction ? (
        <></>
      ) : (
        <>
          <ScrollView>
            <View style={{paddingTop: 15, width: '100%'}}>
              <ListItem
                Component={TouchableScale}
                friction={90}
                tension={100}
                activeScale={0.95}
                containerStyle={{
                  borderRadius: 10,
                  backgroundColor: themeColors.pico,
                  width: '100%',
                }}>
                <ListItem.Content>
                  <ListItem.Title
                    style={{color: themeColors.white, fontWeight: 'bold'}}>
                    {transaction.status}
                  </ListItem.Title>
                  <ListItem.Subtitle
                    numberOfLines={1}
                    style={{
                      color: themeColors.white,
                      textTransform: 'capitalize',
                      paddingTop: 10,
                    }}>
                    Date:{' '}
                    {moment(transaction?.createdAt).format('DD, MMM YYYY')}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle
                    numberOfLines={1}
                    style={{
                      color: themeColors.white,
                      textTransform: 'capitalize',
                      paddingTop: 10,
                    }}>
                    Address:{' '}
                    {transaction?.orders?.[0]?.deliveryAddress?.streetName}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </View>

            <View style={{paddingTop: 25, width: '100%'}}>
              <Text h4 style={{color: themeColors.white, paddingBottom: 10}}>
                Orders
              </Text>
              {transaction.orders.map(item => {
                return item.products.map(prod => (
                  <ListItem
                    key={prod._id}
                    Component={TouchableScale}
                    friction={90}
                    tension={100}
                    activeScale={0.95}
                    containerStyle={{
                      borderRadius: 10,
                      backgroundColor: themeColors.pico,
                      maxHeight: 100,
                      width: '100%',
                      marginVertical: 5,
                    }}
                    onPress={() =>
                      navigation.navigate('OrderDetail', {
                        id: item._id,
                      })
                    }>
                    <Avatar
                      source={{
                        uri: prod.product.photo,
                      }}
                    />
                    <ListItem.Content>
                      <ListItem.Title
                        style={{
                          color: themeColors.white,
                          fontWeight: 'bold',
                          textTransform: 'capitalize',
                        }}>
                        {prod.product.name}
                      </ListItem.Title>
                      <ListItem.Subtitle
                        numberOfLines={1}
                        style={{
                          color: themeColors.white,
                          textTransform: 'capitalize',
                          fontWeight: 'bold',
                          paddingVertical: s(5),
                        }}>
                        {Naira} {prod.totalPrice} - Qty ({prod.quantity})
                      </ListItem.Subtitle>
                      <ListItem.Subtitle
                        style={{
                          color: themeColors.white,
                          textTransform: 'capitalize',
                        }}>
                        Vendor - {item.business.name}
                      </ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron color={themeColors.white} />
                  </ListItem>
                ));
              })}
            </View>

            <View style={{paddingTop: 25, width: '100%'}}>
              <Text h4 style={{color: themeColors.white, paddingBottom: 10}}>
                Total
              </Text>
              <ListItem
                Component={TouchableScale}
                friction={90}
                tension={100}
                activeScale={0.95}
                containerStyle={{
                  borderRadius: 10,
                  backgroundColor: themeColors.pico,
                  maxHeight: 100,
                  width: '100%',
                }}>
                <ListItem.Content>
                  <ListItem.Title
                    style={{color: themeColors.white, fontWeight: 'bold'}}>
                    Total Cost - {Naira} {transaction.totalPayableAmount}
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            </View>
          </ScrollView>
          {transaction.status === TransactionStatus.PENDING ? (
            <View style={styles.btnView}>
              <Button
                title="Complete Payment"
                titleStyle={{fontWeight: 'bold', color: themeColors.mazarine}}
                buttonStyle={styles.btnStyle}
                radius={30}
                onPress={handlePayment}
              />
              <View style={{marginVertical: 7}} />
              <Button
                title="Cancel Order"
                titleStyle={{fontWeight: 'bold'}}
                buttonStyle={[
                  styles.btnStyle,
                  {backgroundColor: themeColors.nasturcian},
                ]}
                radius={30}
                loading={statusLoading}
                onPress={handleDelete}
              />
            </View>
          ) : (
            <></>
          )}
          <Paystack
            paystackKey={paystack_key}
            billingEmail={user?.username}
            billingName={`${user?.firstName} ${user?.lastName}`}
            amount={`${transaction?.totalPayableAmount}`}
            refNumber={transaction?.referenceId}
            onCancel={() => {}}
            onSuccess={handlePaymentComplete}
            ref={paystackWebViewRef}
          />
        </>
      )}
    </View>
  );
}

export default TransactionOrderDetailScreen;
