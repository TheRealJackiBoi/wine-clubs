import { signInUrlWithReturnParam } from './utils'

describe('name', () => {
  it('must return url without back param', async () => {
    expect(signInUrlWithReturnParam()).to.equal('/sign-in')
  })

  it('must return url with back param', async () => {
    expect(signInUrlWithReturnParam('this')).to.equal('/sign-in?back=this')
  })
})
