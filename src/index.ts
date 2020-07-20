import { cloneDeep, get, set } from 'lodash'

interface AnyObject {
  [key: string]: string | number | AnyObject | AnyObject[]
}

interface OneToOneOptions {
  sourceKey: string
  targetKey: string
  joinObject: AnyObject[]
  as: string
}

interface OneToManyOptions {
  sourceKey: string
  targetKey: string
  joinObject: AnyObject[]
  as: string
}

export default class AssociateBuilder {
  private data: AnyObject[] = []

  constructor(obj: AnyObject[]) {
    this.data = cloneDeep(obj)
  }

  private parseOptions(options: OneToOneOptions | OneToManyOptions) {
    const { sourceKey, targetKey, as } = options
    const joinObject = cloneDeep(options.joinObject)

    return {
      sourceKey,
      targetKey,
      as,
      joinObject
    }
  }

  hasOne(options: OneToOneOptions): AssociateBuilder {
    const { sourceKey, targetKey, as, joinObject } = this.parseOptions(options)

    this.data = this.data.map((item) => {
      const sourceValue = get(item, sourceKey)

      const match = joinObject.find((x) => {
        const targetValue = get(x, targetKey)
        return targetValue == sourceValue
      })

      set(item, as, match)
      return item
    })

    return this
  }

  hasMany(options: OneToManyOptions): AssociateBuilder {
    const { sourceKey, targetKey, as, joinObject } = this.parseOptions(options)

    this.data = this.data.map((item) => {
      const sourceValue = get(item, sourceKey)

      const match = joinObject.filter((x) => {
        const targetValue = get(x, targetKey)
        return targetValue == sourceValue
      })

      set(item, as, match)
      return item
    })

    return this
  }

  getData(): AnyObject[] {
    return this.data
  }
}
