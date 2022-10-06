import admin from 'firebase-admin'

import { AuthenticationError } from '@redwoodjs/graphql-server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const adminApp = admin.initializeApp({
  projectId: process.env.FIREBASE_PROJECT_ID,
})

interface DecodedJWTToken {
  picture: string
  iss: string
  aud: string
  auth_time: number
  user_id: string
  sub: string
  iat: number
  exp: number
  email: string
  email_verified: boolean
  firebase: {
    identities: {
      'google.com': string[]
      email: string[]
    }
    sign_in_provider: string
  }
}

export const getCurrentUser = async (decoded: DecodedJWTToken) => {
  return decoded
}

/**
 * The user is authenticated if there is a currentUser in the context
 *
 * @returns {boolean} - If the currentUser is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!context.currentUser
}

/**
 * Call requireAuth in your services, or use the @requireAuth directive to check that a user is logged in,
 * and raise an error if they're not.
 *
 * @returns - If the currentUser is authenticated
 *
 * @throws {@link AuthenticationError} - If the currentUser is not authenticated
 *
 * @see https://github.com/redwoodjs/redwood/tree/main/packages/auth for examples
 */
export const requireAuth = () => {
  if (!isAuthenticated()) {
    throw new AuthenticationError("You don't have permission to do that.")
  }

  // Custom RBAC implementation required for firebase
  // https://firebase.google.com/docs/auth/admin/custom-claims
}

export const authFilter = () => {
  return { where: { userId: context.currentUser.user_id } }
}

export const authProxy = async <T extends { userId: string }>(
  task: Promise<T>
) => {
  const res = await task
  return res.userId === context.currentUser.user_id ? res : undefined
}
