import AssociateBuilder from '../src'

const users = [
  {
    id: 1,
    name: 'roca',
    sex: 'male',
    companyId: 1
  },
  {
    id: 2,
    name: 'taro',
    sex: 'male',
    companyId: 3
  },
  {
    id: 3,
    name: 'hanako',
    sex: 'female',
    companyId: 1
  }
]

const companies = [
  {
    id: 1,
    name: 'honda'
  },
  {
    id: 2,
    name: 'san-ryu'
  },
  {
    id: 3,
    name: 'toyota'
  }
]

const companiesContract = [
  {
    id: 1,
    total: 1000
  },
  {
    id: 2,
    total: 2000
  },
  {
    id: 3,
    total: 3000
  }
]

describe('hasOne', () => {
  test('Joinが1個', () => {
    const result = new AssociateBuilder(users)
      .hasOne({
        sourceKey: 'companyId',
        targetKey: 'id',
        joinObject: companies,
        as: 'company'
      })
      .getData()

    expect(result).toMatchObject([
      {
        id: 1,
        name: 'roca',
        sex: 'male',
        companyId: 1,
        company: {
          id: 1,
          name: 'honda'
        }
      },
      {
        id: 2,
        name: 'taro',
        sex: 'male',
        companyId: 3,
        company: {
          id: 3,
          name: 'toyota'
        }
      },
      {
        id: 3,
        name: 'hanako',
        sex: 'female',
        companyId: 1,
        company: {
          id: 1,
          name: 'honda'
        }
      }
    ])
  })

  test('Joinが2個', () => {
    const result = new AssociateBuilder(users)
      .hasOne({
        sourceKey: 'companyId',
        targetKey: 'id',
        joinObject: companies,
        as: 'company.profile'
      })
      .hasOne({
        sourceKey: 'companyId',
        targetKey: 'id',
        joinObject: companiesContract,
        as: 'company.contract'
      })
      .getData()

    expect(result).toMatchObject([
      {
        id: 1,
        name: 'roca',
        sex: 'male',
        companyId: 1,
        company: {
          profile: {
            id: 1,
            name: 'honda'
          },
          contract: {
            id: 1,
            total: 1000
          }
        }
      },
      {
        id: 2,
        name: 'taro',
        sex: 'male',
        companyId: 3,
        company: {
          profile: {
            id: 3,
            name: 'toyota'
          },
          contract: {
            id: 3,
            total: 3000
          }
        }
      },
      {
        id: 3,
        name: 'hanako',
        sex: 'female',
        companyId: 1,
        company: {
          profile: {
            id: 1,
            name: 'honda'
          },
          contract: {
            id: 1,
            total: 1000
          }
        }
      }
    ])
  })
})

describe('hasMany', () => {
  test('Joinが1個', () => {
    const result = new AssociateBuilder(companies)
      .hasMany({
        sourceKey: 'id',
        targetKey: 'companyId',
        joinObject: users,
        as: 'users'
      })
      .getData()

    expect(result).toMatchObject([
      {
        id: 1,
        name: 'honda',
        users: [
          {
            id: 1,
            name: 'roca',
            sex: 'male',
            companyId: 1
          },
          {
            id: 3,
            name: 'hanako',
            sex: 'female',
            companyId: 1
          }
        ]
      },
      {
        id: 2,
        name: 'san-ryu',
        users: []
      },
      {
        id: 3,
        name: 'toyota',
        users: [
          {
            id: 2,
            name: 'taro',
            sex: 'male',
            companyId: 3
          }
        ]
      }
    ])
  })
})
