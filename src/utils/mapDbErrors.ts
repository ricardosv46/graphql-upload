import FieldError from '@src/models/FieldError'

export const mapDbErrors = (errorMessage: string): { errors: FieldError[] } => {
  console.log({ errorMessage })

  return { errors: [{ field: '*', message: 'Contacte con el administrador.' }] }
}
