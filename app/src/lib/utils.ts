export const signInUrlWithReturnParam = (returnEndpoint?: string) =>
  `/sign-in${
    returnEndpoint ? `?back=${encodeURIComponent(returnEndpoint)}` : ''
  }`
