import {Models} from '@rematch/core';
import authModel from './authModel';
import cartModel from './cartModel';
import generalModel from './generalModel';
import vendorModel from './vendorModel';
import userModel from './userModel';
import businessModel from './businessModel';

export interface RootModel extends Models<RootModel> {
  cartModel: typeof cartModel;
  vendorModel: typeof vendorModel;
  generalModel: typeof generalModel;
  authModel: typeof authModel;
  userModel: typeof userModel;
  businessModel: typeof businessModel;
}

export const models: RootModel = {
  cartModel,
  vendorModel,
  generalModel,
  authModel,
  userModel,
  businessModel,
};
