import fs from 'node:fs'
import path from 'node:path'
import axios from 'axios'
import { oxford } from 'humanize-plus'
import urlJoin from 'proper-url-join'
import { wordpressMedia } from '../environment/publicVariables'
import logger from '../logger'
import { copyImageToApp } from './copyImageToApp'

interface DownloadImageOptions {
	imageFileName: string
	saveToPublic?: boolean
	saveToApp?: boolean
}

export async function downloadImage({ imageFileName, saveToPublic = false, saveToApp = true }: DownloadImageOptions) {
	const publicDir = path.join(process.cwd(), 'public', 'images')
	const appDir = path.join(process.cwd(), 'src', 'app')

	const publicPath = path.join(publicDir, imageFileName)
	const appPath = path.join(appDir, imageFileName)

	const publicExists = saveToPublic && fs.existsSync(publicPath)
	const appExists = saveToApp && fs.existsSync(appPath)

	if ((saveToPublic && publicExists) || (saveToApp && appExists)) {
		return {
			publicPath: saveToPublic ? `/images/${imageFileName}` : null,
			appPath: saveToApp ? `/images/${imageFileName}` : null,
		}
	}

	try {
		const response = await axios({
			url: urlJoin(wordpressMedia, imageFileName),
			method: 'GET',
			responseType: 'arraybuffer',
		})

		const imageBuffer = Buffer.from(response.data, 'binary')

		// First write the file to public
		if (!fs.existsSync(publicDir)) {
			fs.mkdirSync(publicDir, { recursive: true })
		}

		fs.writeFileSync(publicPath, imageBuffer)

		// Then save to app if needed
		if (saveToApp) copyImageToApp(imageFileName)

		// Then delete the public file if not needed
		if (!saveToPublic) {
			try {
				fs.unlinkSync(publicPath)
			} catch (deleteError) {
				logger.warn(`Failed to delete temporary file from public: ${publicPath}`, deleteError)
			}
		}
		logger.success(`Downloaded ${imageFileName} to ${oxford([saveToPublic ? 'public' : null, saveToApp ? 'app' : null].filter(Boolean))}`)
	} catch (error) {
		logger.error(`Error downloading image ${imageFileName}:`, error)
		throw error
	}
}
