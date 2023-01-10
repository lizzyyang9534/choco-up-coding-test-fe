import { createMachine, assign } from 'xstate';
import { Product } from '../types/product';
import * as R from 'ramda';
import { OVERVIEW } from '../constants/productList';

const DEFAULT_PAGE_SIZE = 21;

enum State {
  LOADING = 'LOADING',
  IDLE = 'IDLE',
  LOADING_MORE = 'LOADING_MORE',
}

enum Event {
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
    initial: State.LOADING,
    states: {
      [State.LOADING]: {
        invoke: {
          src: 'fetchCommerceData',
          onDone: {
            target: State.IDLE,
            actions: ['assignProducts', 'assignDepartments'],
          },
        },
      },
      [State.IDLE]: {
        on: {
          [Event.LOAD_MORE]: {
            target: State.LOADING_MORE,
          },
        },
      },
      [State.LOADING_MORE]: {
        invoke: {
          src: 'fetchCommerceData',
          onDone: {
            target: State.IDLE,
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
          [OVERVIEW].concat(
            R.sortBy(R.toLower, Object.keys(productsByDepartment))
          ),
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
  State as PRODUCT_LIST_STATE,
  Event as PRODUCT_LIST_EVENT,
};
