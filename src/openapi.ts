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
    },
  },
  components: {
    schemas: {
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
