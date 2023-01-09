import { createMachine, assign } from 'xstate';
import { Product } from '../types/product';
import * as R from 'ramda';
import { OVERVIEW } from '../constants/productList';

const DEFAULT_PAGE_SIZE = 20;

enum STATE {
  LOADING = 'LOADING',
  IDLE = 'IDLE',
  LOADING_MORE = 'LOADING_MORE',
}

enum EVENT {
  LOAD_MORE = 'LOAD_MORE',
}

type ProductListContext = {
  products: Product[];
  productsByDepartment: { [department: string]: Product[] };
  departments: string[];
};

const productListMachine = createMachine<ProductListContext>(
  {
    context: {
      products: [],
      productsByDepartment: {},
      departments: [OVERVIEW],
    },
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
      [STATE.IDLE]: {
        on: {
          [EVENT.LOAD_MORE]: {
            target: STATE.LOADING_MORE,
          },
        },
      },
      [STATE.LOADING_MORE]: {
        invoke: {
          src: 'fetchCommerceData',
          onDone: {
            target: STATE.IDLE,
            actions: ['concatProducts', 'assignDepartments'],
          },
        },
      },
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
        departments: ({ productsByDepartment }) =>
          [OVERVIEW].concat(Object.keys(productsByDepartment)),
      }),
      concatProducts: assign({
        products: ({ products }, event) => products.concat(event.data),
        productsByDepartment: ({ productsByDepartment }, event) =>
          R.mergeWith(
            R.concat,
            productsByDepartment,
            R.groupBy(R.prop<string>('department'), event.data)
          ),
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
