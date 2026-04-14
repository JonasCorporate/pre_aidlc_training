// eslint-disable-next-line @typescript-eslint/no-explicit-any
const openApiSpec: Record<string, any> = {
  openapi: '3.0.3',
  info: {
    title: 'Shopping API',
    version: '1.0.0',
    description: 'Simple shopping orders REST API (pre AI-DLC training exercise)',
  },
  paths: {
    '/': {
      get: {
        summary: 'Health check',
        operationId: 'getRoot',
        tags: ['Health'],
        responses: {
          '200': {
            description: 'API is running',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HealthResponse' },
              },
            },
          },
        },
      },
    },
    '/health': {
      get: {
        summary: 'Health check',
        operationId: 'getHealth',
        tags: ['Health'],
        responses: {
          '200': {
            description: 'API is running',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HealthResponse' },
              },
            },
          },
        },
      },
    },
    '/orders': {
      get: {
        summary: 'List all orders',
        operationId: 'getAllOrders',
        tags: ['Orders'],
        responses: {
          '200': {
            description: 'A list of orders',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    orders: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/OrderSummary' },
                    },
                  },
                  required: ['orders'],
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create a new order',
        operationId: 'createOrder',
        tags: ['Orders'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/CreateOrderRequest' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Order created successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/OrderSummary' },
              },
            },
          },
        },
      },
    },
    '/orders/{id}': {
      get: {
        summary: 'Get order by ID',
        operationId: 'getOrderById',
        tags: ['Orders'],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          '200': {
            description: 'The requested order',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/OrderSummary' },
              },
            },
          },
          '404': {
            description: 'Order not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
      put: {
        summary: 'Update order status',
        operationId: 'updateOrderStatus',
        tags: ['Orders'],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/UpdateOrderStatusRequest' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Order updated successfully',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/OrderSummary' },
              },
            },
          },
          '404': {
            description: 'Order not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
      delete: {
        summary: 'Delete an order',
        operationId: 'deleteOrder',
        tags: ['Orders'],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' } },
        ],
        responses: {
          '204': { description: 'Order deleted successfully' },
          '404': {
            description: 'Order not found',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      CreateOrderRequest: {
        type: 'object',
        properties: {
          customer_name: { type: 'string', example: 'Jane Doe' },
          total_amount: { type: 'number', format: 'float', example: 59.99 },
        },
        required: ['customer_name', 'total_amount'],
      },
      UpdateOrderStatusRequest: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            enum: ['pending', 'shipped', 'completed'],
            example: 'shipped',
          },
        },
        required: ['status'],
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          error: { type: 'string', example: 'Order not found' },
        },
        required: ['error'],
      },
      HealthResponse: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'ok' },
          message: { type: 'string', example: 'Shopping API is running' },
        },
        required: ['status', 'message'],
      },
      OrderSummary: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          customer_name: { type: 'string', example: 'Alice Johnson' },
          status: {
            type: 'string',
            enum: ['pending', 'shipped', 'completed'],
            example: 'completed',
          },
          total_amount: { type: 'number', format: 'float', example: 49.99 },
          created_at: { type: 'string', example: '2024-01-10 09:00:00' },
        },
        required: ['id', 'customer_name', 'status', 'total_amount', 'created_at'],
      },
    },
  },
};

export default openApiSpec;
