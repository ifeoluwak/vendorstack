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

  const {token} = useSelector((root: RootState) => root.authModel);

  const {cart} = useSelector((root: RootState) => root.cartModel);
  const {products, vendors, reviews} = useSelector(
    (root: RootState) => root.vendorModel,
  );

  const vendorCart = cart || {};
  const vendor = vendors?.[vendorId];
  const vendorProducts = useMemo(() => {
    return products ? products[vendorId] : [];
  }, [products, vendorId]);
  const vendorReviews = useMemo(() => {
    return reviews ? reviews[vendorId] : [];
  }, [reviews, vendorId]);

  useEffect(() => {
    if (vendorId) {
      Promise.all([
        dispatch.vendorModel.getVendor(vendorId),
        dispatch.vendorModel.getVendorProducts(vendorId),
        dispatch.vendorModel.getVendorReviews(vendorId),
      ]);
      if (token) {
        dispatch.userModel.getUserVendorOrders(vendorId);
      }
    }
  }, [dispatch.vendorModel, vendorId, token, dispatch.userModel]);

  useEffect(() => {
    if (product) {
      onOpen();
    }
  }, [product]);

  useEffect(() => {
    if (product_id && vendorProducts?.length) {
      const prod = vendorProducts.find(p => p._id === product_id);
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
    if (vendorCart?.[product?._id!]?.count || 0) {
      navigation.navigate('Basket', {id: vendorId});
    } else {
      dispatch.cartModel.addToCart({vendorId, product});
      navigation.navigate('Basket', {id: vendorId});
    }
  };

  // console.log('VendorScreen', vendor);

  return (
    <View style={styles.wrapper}>
      {loading ? (
        <ActivityIndicator color={themeColors.white} size="large" />
      ) : (
        <></>
      )}

      {vendor ? (
        <View style={styles.vendorContainer}>
          <VendorHeader
            rating={1}
            vendor={vendor!}
            productCount={vendorProducts?.length}
          />

          <ToggleButtonBordered
            activeBtn={activeBtn}
            setActiveBtn={setActiveBtn}
            btns={[
              'Products',
              `Reviews(${vendorReviews?.length | 0})`,
              'Your Orders',
            ]}
            style={{height: mvs(40), marginBottom: 5}}
            textStyle={{fontWeight: 'normal'}}
            stickBorderRadius={10}
          />

          {activeBtn === Section.ORDERS && <VendorOrders orders={[]} />}
          {activeBtn === Section.REVIEWS && (
            <VendorReviews reviews={vendorReviews} />
          )}
          {activeBtn === Section.PRODUCTS && (
            <MasonryFlashList
              ListHeaderComponent={<VendorActionButtons id={vendor?._id} />}
              data={vendorProducts}
              numColumns={3}
              renderItem={({item}) => (
                <View key={item._id}>
                  <TouchableOpacity onPress={() => setProduct(item)}>
                    <Image source={{uri: item.photo}} style={styles.item} />
                  </TouchableOpacity>
                </View>
              )}
              estimatedItemSize={200}
            />
          )}
        </View>
      ) : (
        <></>
      )}

      <CartCountButton />

      <Portal>
        <Modalize
          ref={modalizeRef}
          adjustToContentHeight
          onClose={() => setProduct(null)}
          childrenStyle={{marginBottom: 20}}>
          <VendorProductView
            onBuy={handleBuyNow}
            cartItem={vendorCart?.[product?._id!]}
            product={product!}
            vendorId={vendorId}
            takingOrder={vendor?.takingOrder!}
          />
        </Modalize>
      </Portal>
    </View>
  );
}

export default VendorScreen;
