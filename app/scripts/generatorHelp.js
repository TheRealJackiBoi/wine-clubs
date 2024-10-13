const {
  colorFgCyan,
  colorFgYellow,
  colorReset,
  colorFgGreen,
  colorBgWhite,
  colorFgBlack
} = require('./colors')

const bgWhite = (x) => `${colorBgWhite}${colorFgBlack}${x}${colorReset}`
const cyan = (x) => `${colorFgCyan}# ${x}${colorReset}`
const format = (a, b) =>
  `yarn ${colorFgGreen}${a}${colorReset} ${colorFgYellow}${b.join(
    `${colorReset} ${colorFgYellow}`
  )}${colorReset}`

const getHelpText = () => `
${bgWhite('============ HELP ============')}

${cyan('NEW COMPONENT (PURE)')}
  ${format('gen:component', ['<component_name>', '<category (optional)>'])}

  Example:
    - ${format('gen:component', ['PhotoUpload', 'photos'])}

${cyan('NEW CONTAINER (SIDE EFFECTS)')}
    - ${format('gen:container', ['<container_name>', '<category (optional)>'])}

  If your component will interact with outside resources (for example GraphQL),
  you should create a container instead of a component:

  Example:
    - ${format('gen:container', ['MyContainer'])}

${cyan('NEW NEXT.JS PAGE')}
  ${format('gen:page', ['<path>', '<auth (optional)>'])}
    
  Example:
    - ${format('gen:page', ['/users/[id]'])}
    - ${format('gen:page', ['/users/[id]/index'])}
    - ${format('gen:page', ['/users/[id]/index.tsx'])}
    - ${format('gen:page', ['/foo-bar/hello.tsx'])}
    - ${format('gen:page', ['/foo-bar'])}
    
  Authenticated page:
    - ${format('gen:page', ['/users/[id]', 'auth'])}

${bgWhite('============ HELP END ============')}
`

module.exports = {
  getHelpText
}
