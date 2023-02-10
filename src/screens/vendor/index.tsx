/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {View, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import {MasonryFlashList} from '@shopify/flash-list';
import {Portal} from 'react-native-portalize';
import {Modalize} from 'react-native-modalize';

import {themeColors} from '../../constants/color';
import CartCountButton from '../../components/CartCountButton';
import {Product} from '../../types/product';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../redux/store';
import {getOrdersFromVendor, getVendorInFollows} from '../../helpers';
import {styles} from './style';
import ToggleButtonBordered from '../../components/ToggleButton/ToggleButtonBordered';
import {mvs} from 'react-native-size-matters';
import VendorActionButtons from '../../components/VendorActionButtons';
import VendorProductView from '../../components/VendorProductView';
import VendorHeader from '../../components/VendorHeader';
import VendorReviews from '../../components/VendorReviews';
import VendorOrders from '../../components/VendorOrders';

enum Section {
  PRODUCTS = 0,
  REVIEWS = 1,
  ORDERS = 2,
}

function VendorScreen({navigation, route}) {
  const vendorId = route?.params?.id;
  const title = route?.params?.title;
  const product_id = route?.params?.product_id;

  const [product, setProduct] = useState<Product | null>(null);
  const [activeBtn, setActiveBtn] = useState<Section>(Section.PRODUCTS);

  const modalizeRef = useRef<Modalize>(null);
  const dispatch = useDispatch<Dispatch>();

  const loading = useSelector(
    (root: RootState) =>
      root.loading.effects.vendorModel.getVendor ||
      root.loading.effects.vendorModel.getVendorProducts,
  );

  // const {token} = useSelector((root: RootState) => root.authModel);

  // const followLoading = useSelector(
  //   (root: RootState) =>
  //     root.loading.effects.userModel.followVendor ||
  //     root.loading.effects.userModel.unfollowVendor,
  // );
  const {cart} = useSelector((root: RootState) => root.cartModel);
  const {products, vendors} = useSelector(
    (root: RootState) => root.vendorModel,
  );

  const vendorCart = cart?.[vendorId] || {};
  const vendor = vendors?.[vendorId];
  const vendorProducts = useMemo(() => {
    return products ? products[vendorId] : [];
  }, [products, vendorId]);

  // const followed = getVendorInFollows(vendorId);
  // const orders = getOrdersFromVendor(vendorId);

  useEffect(() => {
    if (vendorId) {
      dispatch.vendorModel.getVendor(vendorId);
      dispatch.vendorModel.getVendorProducts(vendorId);
    }
  }, [dispatch.vendorModel, vendorId]);

  useEffect(() => {
    if (product) {
      onOpen();
    }
  }, [product]);

  useEffect(() => {
    if (product_id && vendorProducts?.length) {
      const prod = vendorProducts.find(p => p.id === product_id);
      if (prod) {
        setProduct(prod);
      }
    }
  }, [product_id, vendorProducts]);

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      headerTintColor: themeColors.white,
      headerBackTitle: null,
      headerStyle: {
        backgroundColor: themeColors.mazarine,
      },
      headerShadowVisible: false,
    });
  }, [navigation, title]);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const handleBuyNow = () => {
    modalizeRef.current?.close();
    if (vendorCart?.[product?.id!]?.count || 0) {
      navigation.navigate('Basket', {id: vendorId});
    } else {
      dispatch.cartModel.addToCart({vendorId, product});
      navigation.navigate('Basket', {id: vendorId});
    }
  };

  return (
    <View style={styles.wrapper}>
      {loading ? (
        <ActivityIndicator color={themeColors.white} size="large" />
      ) : (
        <></>
      )}
      <View style={styles.vendorContainer}>
        <VendorHeader vendor={vendor} />

        <ToggleButtonBordered
          activeBtn={activeBtn}
          setActiveBtn={setActiveBtn}
          btns={[
            'Products',
            `Reviews(${vendor?.review_count | 0})`,
            'Your Orders',
          ]}
          style={{height: mvs(40), marginBottom: 5}}
          textStyle={{fontWeight: 'normal'}}
          stickBorderRadius={10}
        />

        {activeBtn === Section.ORDERS && <VendorOrders orders={orders} />}
        {activeBtn === Section.REVIEWS && (
          <VendorReviews reviews={vendor?.reviews} />
        )}
        {activeBtn === Section.PRODUCTS && (
          <MasonryFlashList
            ListHeaderComponent={
              <VendorActionButtons
                id={vendor?.id}
                followLoading={followLoading}
                followed={followed}
              />
            }
            data={vendorProducts}
            numColumns={3}
            renderItem={({item}) => (
              <View key={item.id}>
                <TouchableOpacity onPress={() => setProduct(item)}>
                  <Image source={{uri: item.url}} style={styles.item} />
                </TouchableOpacity>
              </View>
            )}
            estimatedItemSize={200}
          />
        )}
      </View>

      <CartCountButton vendorId={vendorId} />

      <Portal>
        <Modalize
          ref={modalizeRef}
          adjustToContentHeight
          onClose={() => setProduct(null)}
          childrenStyle={{marginBottom: 20}}>
          <VendorProductView
            onBuy={handleBuyNow}
            cartItem={vendorCart?.[product?.id!]}
            product={product}
            vendorId={vendorId}
          />
        </Modalize>
      </Portal>
    </View>
  );
}

export default VendorScreen;
