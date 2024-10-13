const { exec } = require('child_process')
const assert = require('assert')
require('dotenv').config()

const ENV_VARIABLES_TO_IGNORE = ['NODE_ENV']

const splitTextIntoArrayOfLines = (text) => {
  assert(typeof text === 'string')
  const arrayOfLines = text.split(/\r?\n/)
  assert(Array.isArray(arrayOfLines))
  return arrayOfLines.map((line) => line.trim())
}

const removeEmptyAndCommentedEnvVars = (arrayOfEnvVars) => {
  assert(Array.isArray(arrayOfEnvVars))
  const envVars = arrayOfEnvVars.filter(
    (value) => value !== '' && value[0] !== '#',
  )
  assert(!envVars.includes(''))
  assert(!envVars.find((envVar) => envVar.startsWith('#')))
  return envVars
}

// finds every environment variable used in /src folder
exec(
  "grep -rEoh 'process.env.[A-Z]+(_[A-Z]+)*' src/* | sort | uniq",
  async (error, stdout, stderr) => {
    if (error) {
      console.error(`error: ${error.message}`)
      return process.exit(1)
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`)
      return process.exit(1)
    }

    assert(stdout)

    // parse lines of grep
    const arrayOfGrepParams = splitTextIntoArrayOfLines(stdout)

    const envVariableNames = removeEmptyAndCommentedEnvVars(
      arrayOfGrepParams,
    ).map((envVariable) => envVariable.replace('process.env.', ''))

    const undefinedEnvVariables = envVariableNames.filter(
      (envVariable) =>
        !ENV_VARIABLES_TO_IGNORE.includes(envVariable) &&
        !process.env[envVariable],
    )

    if (undefinedEnvVariables.length > 0) {
      console.error(
        `Env. variables ${undefinedEnvVariables.join(', ')} are not defined.`,
      )
      return process.exit(1)
    }

    console.log('All environment variables are included.\n', envVariableNames)
    return process.exit(0)
  },
)
