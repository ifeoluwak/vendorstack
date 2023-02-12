import * as React from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import {Button} from '@rneui/themed';

import {themeColors} from '../../constants/color';
import {useDispatch, useSelector} from 'react-redux';
import {Dispatch, RootState} from '../../redux/store';
import {styles} from './style';
import HomeTrendingProduct from '../../components/HomeTrendingProduct';
import HomeUserVendors from '../../components/HomeUserVendors';
import PromotedProductList from '../../components/PromotedProductList';
import HomeTrendingVendor from '../../components/HomeTrendingVendor';
import HomeTopRatedVendor from '../../components/HomeTopRatedVendor';

import Logo from '../../assets/images/vendorstack2.svg';
import Animated, { FadeIn } from 'react-native-reanimated';
import HomeHeaderRight from '../../components/HomeHeaderRight';
import HomeVendors from '../../components/HomeVendors';

function HomeScreen({navigation}) {
  const dispatch = useDispatch<Dispatch>();

  const loading = useSelector(
    (root: RootState) => root.loading.models.userModel,
  );
  const {user} = useSelector((root: RootState) => root.userModel);
  const {token} = useSelector((root: RootState) => root.authModel);

  const onRefresh = () => {
    if (token) {
      // dispatch.userModel.getUserVendors();
      dispatch.userModel.getUserProfile();
      // dispatch.userModel.getUserOrders();
    }
    Promise.all([
      dispatch.vendorModel.getHomeVendors(),
      // dispatch.generalModel.getTrendingProducts(),
      // dispatch.generalModel.getTrendingVendors(),
      // dispatch.generalModel.getTopratedVendors(),
    ]);
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTintColor: themeColors.white,
      headerStyle: {
        backgroundColor: themeColors.mazarine,
      },
      headerShadowVisible: false,
      headerLeft: () => <Logo style={{ marginLeft: 8 }} />,
      headerRight: () => (
        <HomeHeaderRight hasBusiness={!!user?.businesses?.length} />
      ),
    });
  }, [navigation, user]);

  React.useEffect(() => {
    onRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, token]);

  const home_data = React.useMemo(
    () => [
      <HomeVendors />,
      <HomeUserVendors onRefresh={onRefresh} />,
      // <PromotedProductList />,
      // <HomeTrendingProduct />,
      // <HomeTrendingVendor />,
      // <PromotedProductList />,
      // <HomeTopRatedVendor />,
    ],
    [token],
  );

  return (
    <Animated.View entering={FadeIn} style={styles.container}>
      {loading ? (
        <ActivityIndicator color={themeColors.white} size="large" />
      ) : (
        <></>
      )}
      <FlatList
        onRefresh={onRefresh}
        refreshing={loading}
        data={home_data}
        renderItem={({item}) => item}
        extraData={loading}
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      />
    </Animated.View>
  );
}

export default HomeScreen;
