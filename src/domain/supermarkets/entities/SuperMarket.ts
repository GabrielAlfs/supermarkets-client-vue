export type TSuperMarketLocation = {
  street: string;
  number: string;
  district: string;
  zip: string;
  country: string;
  city: string;
  state: string;
};

export interface SuperMarketEntity {
  id: string;
  superMarketName: string;
  superMarketMainImage: string;
  superMarketAdditionalImages: Array<string>;
  superMarketLocation: TSuperMarketLocation;
  superMarketDescription: string;
  superMarketPhone: string;
  createdAt: string;
  updatedAt: string;
}
