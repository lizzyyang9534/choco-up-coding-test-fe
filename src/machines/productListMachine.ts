import { createMachine, assign } from 'xstate';
import { Product } from '../types/product';
import * as R from 'ramda';
import { OVERVIEW } from '../constants/productList';

const DEFAULT_PAGE_SIZE = 20;

enum STATE {
  LOADING = 'LOADING',
  IDLE = 'IDLE',
}

enum EVENT {}

type ProductListContext = {
  products: Product[];
  productsByDepartment: { [department: string]: Product[] };
  departments: string[];
};

const productListMachine = createMachine<ProductListContext>(
  {
    initial: STATE.LOADING,
    states: {
      [STATE.LOADING]: {
        invoke: {
          src: 'fetchCommerceData',
          onDone: {
            target: STATE.IDLE,
            actions: ['assignProducts', 'assignDepartments'],
          },
        },
      },
      [STATE.IDLE]: {},
    },
  },
  {
    actions: {
      assignProducts: assign({
        products: (_, event) => event.data,
        productsByDepartment: (_, event) =>
          R.groupBy(R.prop('department'), event.data),
      }),
      assignDepartments: assign({
        departments: ({ productsByDepartment }) => [
          OVERVIEW,
          ...Object.keys(productsByDepartment),
        ],
      }),
    },
    services: {
      fetchCommerceData: () =>
        fetch(
          `https://random-data-api.com/api/commerce/random_commerce?size=${DEFAULT_PAGE_SIZE}`
        ).then((res) => res.json()),
    },
  }
);
export {
  productListMachine,
  STATE as PRODUCT_LIST_STATE,
  EVENT as PRODUCT_LIST_EVENT,
};
