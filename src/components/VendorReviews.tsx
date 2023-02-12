import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ListItem, Icon} from '@rneui/themed';
import TouchableScale from 'react-native-touchable-scale';
import {themeColors} from '../constants/color';
import {Review} from '../types/general';
import {s} from 'react-native-size-matters';

function VendorReviews({reviews}: {reviews: Review[]}) {
  return (
    <FlatList
      data={reviews}
      contentContainerStyle={{paddingHorizontal: 5, paddingTop: 5}}
      renderItem={({item}) => (
        <ListItem
          key={item._id}
          bottomDivider
          Component={TouchableScale}
          friction={90}
          tension={100}
          activeScale={0.95}
          containerStyle={{
            backgroundColor: themeColors.transparent,
          }}>
          <ListItem.Content>
            <View style={styles.ratingWrapper}>
              {[1, 2, 3, 4, 5].map(i => (
                <Icon
                  key={i}
                  name="star"
                  type="feather"
                  solid
                  size={item.rating <= i - 1 ? s(16) : s(20)}
                  adjustsFontSizeToFit
                  color={
                    item.rating <= i - 1 ? themeColors.grey : themeColors.white
                  }
                />
              ))}
            </View>
            <ListItem.Subtitle style={styles.name}>
              - {item.customer.firstName} {item.customer.lastName}
            </ListItem.Subtitle>
            <ListItem.Subtitle
              style={{
                color: themeColors.white,
                textTransform: 'capitalize',
                fontSize: 14,
              }}>
              {item.comment}
            </ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      )}
    />
  );
}

const styles = StyleSheet.create({
  ratingWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '40%',
    marginBottom: 5,
  },
  name: {
    color: themeColors.white,
    textTransform: 'capitalize',
    fontSize: 10,
    marginBottom: 5,
    fontStyle: 'italic',
  },
});

export default VendorReviews;
