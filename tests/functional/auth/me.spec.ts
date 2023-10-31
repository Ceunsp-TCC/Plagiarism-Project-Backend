import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import { basicCredentials, mockTeacherCredentials, mockStudentCredentials } from '../../helpers'

const url = '/v1/auth/me'
const urlLogin = '/v1/auth/login'

test.group('Me', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Should be is returned user school informations', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json({
        email: 'schoolCompleted@gmail.com',
        password: 'schoolCompleted@school',
        deviceName: 'browser',
      })

    const sut = await client.get(url).bearerToken(login.response.body.content.accessToken.token)
    sut.assertStatus(200)
    sut.assertBodyContains({ message: 'User information successfully returned' })
    sut.assertBodyContains({
      content: {
        permissions: [
          'teachers',
          'createTeacher',
          'getTeachers',
          'students',
          'createStudent',
          'getStudents',
          'courses',
          'createCourse',
          'getCourses',
          'getCourse',
          'createSemester',
          'createLesson',
          'classes',
          'createClass',
          'getClasses',
          'getClass',
          'getStudentsByClass',
          'linkTeacherAndLessonInClass',
        ],
      },
    })
    sut.assertBodyContains({
      content: {
        roleName: 'SCHOOL',
      },
    })
  })
  test('Should be is returned user teacher informations', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockTeacherCredentials)

    const sut = await client.get(url).bearerToken(login.response.body.content.accessToken.token)
    sut.assertStatus(200)
    sut.assertBodyContains({ message: 'User information successfully returned' })
    sut.assertBodyContains({
      content: {
        permissions: [
          'lessons',
          'getLessonsByTeacher',
          'activities',
          'createActivity',
          'getActivity',
          'getActivities',
          'getAcademicPaper',
          'plagiarismAnalyse',
          'sendNoteForAcademicPaper',
        ],
      },
    })
    sut.assertBodyContains({
      content: {
        roleName: 'TEACHER',
      },
    })
  })
  test('Should be is returned user student informations', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json(mockStudentCredentials)

    const sut = await client.get(url).bearerToken(login.response.body.content.accessToken.token)
    sut.assertStatus(200)
    sut.assertBodyContains({ message: 'User information successfully returned' })
    sut.assertBodyContains({
      content: {
        permissions: [
          'lessons',
          'getLessonsByStudent',
          'activities',
          'getActivity',
          'getActivities',
          'ortographyCorrections',
          'createNewOrtographyCorrection',
          'viewOrtographyCorrections',
          'viewOneOrtographyCorrection',
        ],
      },
    })
    sut.assertBodyContains({
      content: {
        roleName: 'STUDENT',
      },
    })
  })
  test('Should be is returned user admin informations', async ({ client }) => {
    const login = await client
      .post(urlLogin)
      .basicAuth(basicCredentials.username, basicCredentials.password)
      .json({
        email: 'admin@gmail.com',
        password: 'Admin@12',
        deviceName: 'browser',
      })

    const sut = await client.get(url).bearerToken(login.response.body.content.accessToken.token)
    sut.assertStatus(200)
    sut.assertBodyContains({ message: 'User information successfully returned' })
    sut.assertBodyContains({
      content: {
        permissions: [
          'createPermission',
          'deletePermission',
          'updatePermission',
          'viewPermission',
          'createRole',
          'updateRole',
          'viewRole',
          'deleteRole',
          'syncRolesPermissions',
        ],
      },
    })
    sut.assertBodyContains({
      content: {
        roleName: 'ADMIN',
      },
    })
  })
  test('Should be is unathorized', async ({ client }) => {
    const sut = await client.get(url)

    sut.assertStatus(401)
    sut.assertBodyContains({ message: 'Unauthorized' })
  })
})
