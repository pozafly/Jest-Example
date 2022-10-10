const ProductService = require('../product_service_no_di.js');
const ProductClient = require('../product_client.js');

// jest에게 product_client를 mock 할 것이라고 명시
jest.mock('../product_client.js');

describe('ProductService', () => {
  // fetchItems라는 mock 함수는
  // 비동기로 list를 return 한다.
  const fetchItems = jest.fn(async () => [
    { item: '🥛', available: true },
    { item: '🍌', available: false },
  ]);
  ProductClient.mockImplementation(() => {
    return {
      fetchItems,
    };
  });

  let productService;

  beforeEach(() => {
    productService = new ProductService();
  });

  it('should filter out only available items', async () => {
    const items = await productService.fetchAvailableItems();
    expect(items.length).toBe(1);
    expect(items).toEqual([{ item: '🥛', available: true }]);
  });

  it('test', async () => {
    const items = await productService.fetchAvailableItems();
    expect(fetchItems).toHaveBeenCalledTimes(1);
  });
});
