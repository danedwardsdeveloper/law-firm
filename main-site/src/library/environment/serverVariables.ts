import { requireVariable } from './requireVariable'

export const payloadCmsSecret = requireVariable('PAYLOAD_CMS_SECRET')

export const awsAccessKeyId = requireVariable('AWS_ACCESS_KEY_ID')
export const awsSecretAccessKey = requireVariable('AWS_SECRET_ACCESS_KEY')
export const myPersonalEmail = requireVariable('MY_PERSONAL_EMAIL')
