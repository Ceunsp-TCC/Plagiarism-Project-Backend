export interface Links {
  idPermission: number
  idRole?: number
}

export default interface RolesPermissionsRepositoryInterface {
  create(links: Links[]): Promise<boolean>
}
