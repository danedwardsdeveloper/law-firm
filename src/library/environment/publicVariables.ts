import type { LogLevel } from '@/types'

export const isProduction = process.env.NODE_ENV === 'production'
export const isDevelopment = process.env.NODE_ENV === 'development'

export const wordpressRestApi = 'http://localhost:8000/wp-json/wp/v2'
export const wordpressMedia = 'http://localhost:8000/wp-content/uploads'

export const siteIsLaunched = false

export const bareDomain = 'archer-finch-legal.vercel.app'
export const productionBaseURL = `https://${bareDomain}`
export const developmentBaseURL = 'http://localhost:3000'
export const dynamicBaseURL = isProduction ? productionBaseURL : developmentBaseURL

export const serverLogLevel: LogLevel = 'level5debug'
export const browserLogLevel: LogLevel = isDevelopment ? 'level5debug' : 'level0none'
