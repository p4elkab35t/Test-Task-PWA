import type { Schema, Struct } from '@strapi/strapi';

export interface ProductsCart extends Struct.ComponentSchema {
  collectionName: 'components_products_carts';
  info: {
    displayName: 'Cart';
  };
  attributes: {
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'products.cart': ProductsCart;
    }
  }
}
