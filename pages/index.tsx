import { type NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import { api } from '@/libs/api'

const Home: NextPage = () => {
  const hello = api.db.hello.useQuery({ text: 'from tRPC' })

  return (
    <>
      <main>
        <p>hello world</p>
      </main>
    </>
  )
}

export default Home
