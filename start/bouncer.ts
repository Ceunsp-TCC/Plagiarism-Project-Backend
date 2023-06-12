import Bouncer from '@ioc:Adonis/Addons/Bouncer'

export const { actions } = Bouncer

export const { policies } = Bouncer.registerPolicies({
  RolePolicy: () => import('App/Policies/RolePolicy'),
  PermissionPolicy: () => import('App/Policies/PermissionPolicy'),
})
