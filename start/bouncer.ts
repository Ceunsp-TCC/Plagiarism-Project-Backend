import Bouncer from '@ioc:Adonis/Addons/Bouncer'

export const { actions } = Bouncer

// Bouncer.registerPolicies({
//   UserPolicy: () => import('App/Policies/User'),
//   PostPolicy: () => import('App/Policies/Post'),
// })

export const { policies } = Bouncer.registerPolicies({})
