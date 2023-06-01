import { test } from '@japa/runner'

test.group('Healths', () => {
  test('Endpoint working', async ({ client }) => {
    const response = await client.get('/health')

    response.assertStatus(2000)
  })
})
