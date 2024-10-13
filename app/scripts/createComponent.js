const { exec } = require('child_process')
const fs = require('fs')
const dotenv = require('dotenv')
const { getHelpText } = require('./generatorHelp')

dotenv.config()

const componentTypes = ['components', 'containers']

// Extract arguments
let typeOfComponent = process.argv[2]?.trim()
const componentName = process.argv[3]?.trim()
const category = process.argv[4]?.trim()

// Check arguments
if (componentName[0].toUpperCase() !== componentName[0]) {
  throw Error(
    'Component name must start with a capital letter' + `\n\n${getHelpText()}`,
  )
}
if (!componentTypes.includes(typeOfComponent)) {
  throw Error(
    'Component type must be one of: ' +
    componentTypes.map((x) => `'${x}'`).join(', ') +
    `\n\n${getHelpText()}`,
  )
}

const kebabize = (str) => {
  return str
    .split('')
    .map((letter, idx) => {
      return letter.toUpperCase() === letter
        ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
        : letter
    })
    .join('')
}

const folderName = kebabize(componentName)
const categoryName = category ? kebabize(category) : 'common'
const dir = `./src/${typeOfComponent}/${categoryName}/${folderName}`

if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

const componentPath = `${dir}/${componentName}.tsx`
const componentSnippet = `import { Box, Text } from '@chakra-ui/react'
import { FC } from 'react'

type Props = {
  param?: string
}

const ${componentName}: FC<Props> = () => {
  return (
    <Box>
      <Text>${componentName}</Text>
    </Box>
  )
}

export default ${componentName}
`

fs.writeFile(componentPath, componentSnippet, (err) => {
  if (err) {
    console.error(err)
    return
  }
  console.log('Created', componentName)
})

const componentExportSnippet = `export { default as ${componentName} } from '${dir.replace(
  `/src/${typeOfComponent}`,
  '',
)}/${componentName}'`

fs.appendFile(
  `./src/${typeOfComponent}/index.ts`,
  componentExportSnippet + '\n',
  function(err) {
    if (err) throw err
    console.log('Added component to index')
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
