import prisma from '@/lib/prisma'
import { supabaseServer } from '@/lib/supabaseClient'
export const dynamic = 'force-dynamic'

export const POST = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const userId = params.id
  const body = await request.json()
  const img = body.img
  const fileName = body.fileName as string

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    return Response.json(
      {
        success: false,
        message: `User not found`,
      },
      { status: 404 },
    )
  }

  const base64Data = img.includes('base64,') ? img.split('base64,')[1] : img
  const buffer = Buffer.from(base64Data, 'base64')

  const filePath = `${user.id}/${Date.now()}_${fileName}.webp`

  const { data, error } = await supabaseServer.storage
    .from('avatars')
    .upload(filePath, buffer, { contentType: 'image/webp' })

  if (error || !data || !data.fullPath) {
    console.error(`Failed to upload image with name ${fileName}`, error || '')
    return Response.json(
      {
        success: false,
        message: `Failed to upload image with name ${fileName}`,
      },
      { status: 403 },
    )
  }

  const { data: urlData } = supabaseServer.storage
    .from('avatars')
    .getPublicUrl(data.path)

  if (!urlData || !urlData.publicUrl) {
    console.error(`Failed to upload image with name ${fileName}`, error || '')
    return Response.json(
      {
        success: false,
        message: `Failed to upload image with name ${fileName}`,
      },
      { status: 500 },
    )
  }
  console.log(urlData.publicUrl)

  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        avatar: urlData.publicUrl,
      },
    })
    return Response.json(
      {
        success: true,
        message: `Avatar added to user ${user.name}`,
        url: urlData.publicUrl,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Failed to rate wine:', error)
    return Response.json(
      { success: false, message: `Failed to add avatar to user ${user.name}` },
      { status: 500 },
    )
  }
}
