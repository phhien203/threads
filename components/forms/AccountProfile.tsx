'use client'

export default function AccountProfile({
  user,
  btnTitle,
}: {
  user: {
    id: string
    objectId: string
    username: string
    name: string
    bio: string
    image: string
  }
  btnTitle: string
}) {
  return <div>Account Profile</div>
}
