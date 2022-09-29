import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const AuthPage = () => {
  return (
    <>
      <MetaTags title="Auth" description="Auth page" />

      <h1>AuthPage</h1>
      <p>
        Find me in <code>./web/src/pages/AuthPage/AuthPage.tsx</code>
      </p>
      <p>
        My default route is named <code>auth</code>, link to me with `
        <Link to={routes.auth()}>Auth</Link>`
      </p>
    </>
  )
}

export default AuthPage
