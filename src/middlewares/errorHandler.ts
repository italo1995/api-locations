/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Request, Response, NextFunction } from 'express'
import { ValidateError } from 'tsoa'
import { ValidationError } from 'sequelize'

export function errorHandler(
  err: { menssage: string; stack: string; status: number },
  req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ValidateError) {
    let validationErrors: any
    if (err?.fields?.requestBody?.message.includes('Could not match the intersection against every type. Issues: ')) {
      validationErrors = err?.fields?.requestBody?.message.replace(
        'Could not match the intersection against every type. Issues: ',
        ''
      )
      console.log('validationErrors 1:>>', validationErrors)
    } else if (err?.fields?.requestBody?.message.includes('Could not match intersection against any of the possible combinations: ')) {
      validationErrors = err?.fields?.requestBody?.message.replace(
        'Could not match intersection against any of the possible combinations: ',
        ''
      )
    } else {
      validationErrors = err?.fields
    }
    console.log('validationErrors :>> ', validationErrors);
    validationErrors = validationErrors && typeof validationErrors ===  'string' ? JSON.parse(validationErrors) : [{}]
    let keys
    if (validationErrors.length) {
      keys = Object.keys(validationErrors[0])
    } else {
      keys = Object.keys(validationErrors)
    }
    console.log('keys :>> ', keys);
    const errors = []
    for (const key of keys) {
      const element = validationErrors[0][key]
      const messages = element.message
      const startQuoteIndex = messages.indexOf("'")
      const endQuoteIndex = messages.lastIndexOf("'")

      if (startQuoteIndex !== -1 && endQuoteIndex !== -1) {
        const field = messages.slice(startQuoteIndex + 1, endQuoteIndex)
        const message = messages.slice(endQuoteIndex + 2) // Agregamos 2 para saltar el espacio y el texto "is required"
        errors.push({
          field,
          message: message,
        })
      } else {
        errors.push({
          field: '',
          message: 'Ocurrio un error inesperado',
        })
      }
    }
    res.status(422).json({
      success: false,
      type: 'validation',
      message: errors,
    })
  } else if (err instanceof ValidationError) {
    const errors: any[] = []
    for (const itemError of err.errors) {
      if (itemError?.path && itemError?.validatorKey) {
        errors.push({
          field: itemError.path,
          message: itemError.message,
        })
      } else {
        errors.push({
          field: null,
          message: 'error',
        })
      }
    }
    res.status(400).json({ success: false, type: 'validation', message: errors })
  } else {
    const errorDetails = {
      message: err?.menssage || 'Error interno del servidor',
      stack: err.stack,
      path: req.path,
      method: req.method,
      request: req.body,
      time: new Date().toISOString(),
    }
    if (err?.status === 401) {
      res.status(err?.status).json({ message: 'Invalid token' })
    } else {
      res
        .status(err?.status || 500)
        .json({ message: errorDetails?.message || 'Error interno del servidor' })
    }
  }
}
