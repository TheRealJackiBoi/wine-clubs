const { exec } = require('child_process')
const fs = require('fs')
const dotenv = require('dotenv')
const { getHelpText } = require('./generatorHelp')

dotenv.config()

const pathRegex = /^\/?(\[?[A-z0-9-]+]?\/?)+$/
const fileNameRegex = /(\[?[A-z0-9-]+]?)+\.tsx$/

const camelize = (s) => s.replace(/-./g, (x) => x[1].toUpperCase())
const pascalize = (s) => s[0].toUpperCase() + camelize(s.slice(1))

const input = process.argv[2]?.trim()

// Check arguments
if (input.toLocaleLowerCase() !== input) {
  throw Error(
    'Name included a capital letter. Name must be kebab-case (e.g. new-page)' +
      `\n\n${getHelpText()}`,
  )
}

// initial cleanup of path arg
let path = input
  ?.trim()
  // remove index or index.tsx since we'll add back later
  .replace(/index(.tsx)?/, '')
  // remove preceding and trailing slashes
  .replace(/\/$/, '')
  .replace(/^\//, '')

// with auth?
let withAuth = process.argv[3]?.trim()

if (withAuth && withAuth !== 'auth') {
  throw Error(
    'second argument must be the string: auth' + `\n\n${getHelpText()}`,
  )
}

path = 'src/pages/' + path

let dir
let fileName
let name

if (fileNameRegex.test(path)) {
  // if a file name (not index.tsx) is specified
  // eg. foo/bar/baz.tsx
  // we split   ^ here so we get
  //
  //  "foo/bar"   and   "baz.tsx"
  //
  const splitPoint = path.lastIndexOf('/')
  dir = path.slice(0, splitPoint)
  fileName = path.slice(splitPoint + 1)
  name = pascalize(fileName.replace('.tsx', '').replace(/\[]/, ''))
} else {
  // no file name specified
  // eg. foo/bar
  dir = path
  fileName = 'index.tsx'
  name = pascalize(path.slice(path.lastIndexOf('/') + 1).replace(/\[]/, ''))
}

if (!pathRegex.test(dir)) {
  throw Error('path must be a valid format.' + `\n\n${getHelpText()}`)
}

while (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

const componentPath = `${dir}/${fileName}`
const componentSnippet = `import Layout from 'layouts/layout/Layout'
import { NextPage } from 'next'
import { FC } from 'react'

const ${name}: FC<NextPage> = () => {
  return (
    <Layout pageTitle='PAGE TITLE HERE'>
      <p>content here</p>
    </Layout>
  )
}

export default ${name}
`

const componentSnippetAuth = `import { FC } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import AuthenticatedLayout from 'layouts/authenticated-layout/AuthenticatedLayout'
import { useSession, getSession } from 'next-auth/react'

const ${name}: FC<NextPage> = () => {
  const { data: session } = useSession()

  return (
    <AuthenticatedLayout session={session} pageTitle='PAGE TITLE HERE'>
      <p>Logged in with user id: {session?.user?.id}</p>
    </AuthenticatedLayout>
  )
}

export default ${name}
`

fs.writeFile(
  componentPath,
  withAuth ? componentSnippetAuth : componentSnippet,
  (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('Created page', name)
  },
)

// so people who like other IDEs, like webstorm, can use those instead
const ideCmd = process.env.IDE_CMD ?? 'code'

exec(`${ideCmd} ${componentPath}`, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`)
    return
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`)
    return
  }
  console.log(`stdout: ${stdout}`)
})
