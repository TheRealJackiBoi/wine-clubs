import { getAllUsers } from '@/lib/actions'

export async function GET() {
  const users = await getAllUsers()

  return Response.json(users)
}
