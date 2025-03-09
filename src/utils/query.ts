import { Op, type FindOptions } from 'sequelize'
import sequelize from '@db/index'

export enum EOrderQuery {
  MASNUEVOS = 1,
  NOMBRE = 2,
  MASVIEJOS = 3,
}
export const fxOrderNameId = (pParam: any, pWhereStatement: FindOptions) => {
  if (Number(pParam?.orden) === EOrderQuery.NOMBRE) {
    pWhereStatement.order =
      pWhereStatement.order instanceof Array
        ? [...pWhereStatement.order, ['name', 'ASC']]
        : [['name', 'ASC']]
  } else if (Number(pParam?.orden) === EOrderQuery.MASVIEJOS) {
    pWhereStatement.order =
      pWhereStatement.order instanceof Array
        ? [...pWhereStatement.order, ['createdAt', 'ASC']]
        : [['createdAt', 'ASC']]
  } else {
    pWhereStatement.order =
      pWhereStatement.order instanceof Array
        ? [...pWhereStatement.order, ['createdAt', 'DESC']]
        : [['createdAt', 'DESC']]
  }
  return pWhereStatement.order
}

const fxSearchILikeQuery = (
  pParam: any,
  pWhereStatement: FindOptions,
  pName: string,
  pAttibutesPermisse: string | string[]
) => {
  const vName = pName.trim()
  const search = pParam?.search || pParam?.name || ''
  if (pAttibutesPermisse.includes(vName)) {
    if (search.includes(',')) {
      const searchs: string[] = search.split(',')
      const searchsParse = searchs.map((search: string) => `%${search}%`)
      pWhereStatement.where = {
        ...pWhereStatement.where,
        [vName]: {
          [Op.or]: searchsParse.map((search) => ({ [Op.like]: search })),
        },
      }
    } else {
      pWhereStatement.where = {
        ...pWhereStatement.where,
        [vName]: { [Op.like]: `%${search}%` },
      }
    }
  }
  return pWhereStatement.where || {}
}

export const fxSearchILike = (
  pParam: any,
  pWhereStatement: FindOptions,
  pName: string = 'name',
  pModelName: string
) => {
  const vModelAttributes: any = sequelize.models[pModelName].getAttributes()
  const vAttibutesPermisse = Object.keys(vModelAttributes).filter(
    (key) =>
      vModelAttributes[key].type.key === 'STRING' || vModelAttributes[key].type.key === 'TEXT'
  )
  if (pParam?.search || pParam?.name) {
    if (pParam?.typeSearch && pParam.typeSearch.includes(',')) {
      const vTypeSearchs = pParam.typeSearch.split(',')
      for (const typeSearch of vTypeSearchs) {
        const where = fxSearchILikeQuery(pParam, pWhereStatement, typeSearch, vAttibutesPermisse)
        pWhereStatement.where = { ...pWhereStatement.where, ...where }
      }
    } else {
      pWhereStatement.where = fxSearchILikeQuery(pParam, pWhereStatement, pName, vAttibutesPermisse)
    }
  }
  return pWhereStatement.where || {}
}

// export const fxFilterDate = (pParam: any, pWhereStatement: FindOptions) => {
//   if (pParam?.initDate) {
//     const vDate = new Date(pParam?.initDate)
//     const where = {
//       createdAt: {
//         [Op.gte]: vDate.toISOString().split('T')[0]
//       },
//     }
//     pWhereStatement.where = { ...pWhereStatement.where, ...where }
//   }
//   return pWhereStatement.where || {}
// }

export const fxFilterDate = (pParam: any, pWhereStatement: FindOptions) => {
  pWhereStatement.where = pWhereStatement.where || {}
  const initFilter = pParam?.type === 'suspension' ? 'init' : 'createdAt'
  const endFilter = pParam?.type === 'suspension' ? 'end' : 'createdAt'
  if (pParam?.initDate) {
    const [year, day, month] = pParam.initDate.split('/')
    const vDate = new Date(`${year}/${month}/${day}`)
    const where = {
      [initFilter]: {
        [Op.gt]: `${vDate.toISOString().split('T')[0]} 00:00:00.000 +00:00`,
      },
    }
    pWhereStatement.where = { ...pWhereStatement.where, ...where }
  }

  if (pParam?.endDate) {
    const [year, day, month] = pParam.endDate.split('/')
    const vDate = new Date(`${year}/${month}/${day}`)
    let where = {}
    if (pWhereStatement?.where && 'createdAt' in pWhereStatement.where) {
      where = {
        [endFilter]: {
          ...pWhereStatement.where.createdAt,
          [Op.lt]: `${vDate.toISOString().split('T')[0]} 24:00:00.000 +00:00`,
        },
      }
    } else {
      where = {
        [endFilter]: {
          [Op.lt]: `${vDate.toISOString().split('T')[0]} 24:00:00.000 +00:00`,
        },
      }
    }
    pWhereStatement.where = { ...pWhereStatement.where, ...where }
  }

  return pWhereStatement.where || {}
}

export const fxFilterDateUTC = (pParam: any, pWhereStatement: FindOptions) => {
  pWhereStatement.where = pWhereStatement.where || {}
  if (pParam?.initDate) {
    const vDate = pParam.initDate
    const where = {
      createdAt: {
        [Op.gte]: vDate.toISOString().split('T')[0] + 'Z',
      },
    }
    pWhereStatement.where = { ...pWhereStatement.where, ...where }
  }

  if (pParam?.endDate) {
    const vDate = pParam.endDate
    let where = {}
    if (pWhereStatement?.where && 'createdAt' in pWhereStatement.where) {
      where = {
        createdAt: {
          ...pWhereStatement.where.createdAt,
          [Op.lte]: vDate.toISOString().split('T')[0] + 'Z',
        },
      }
    } else {
      where = {
        createdAt: {
          [Op.lte]: vDate.toISOString().split('T')[0] + 'Z',
        },
      }
    }
    pWhereStatement.where = { ...pWhereStatement.where, ...where }
  }

  return pWhereStatement.where || {}
}

export const fxPaginate = (pParam: any, pWhereStatement: FindOptions) => {
  if (Number(pParam?.pag)) {
    const limit = Number(pParam?.limit) || 10 // Define cuantos registros por pagina quieres mostrar
    pWhereStatement.limit = limit
    pWhereStatement.offset = (pParam.pag - 1) * limit
  }
  return pWhereStatement
}

export const fxReponseServices = async (
  pParam: any,
  pWhereStatement: FindOptions,
  pModelName: string,
  vResponse: any
) => {
  const vLimit = Number(pParam?.limit) || 10
  const vCount = await sequelize.models[pModelName].count({
    ...pWhereStatement,
    distinct: true,
    col: 'id',
  })
  const vResponsePaginate: any = {
    data: vResponse,
    meta: {
      totalPage: Math.ceil(vCount / vLimit),
      total: vCount,
      actualPage: Number(pParam.pag),
    }
  }
  return vResponsePaginate
}
