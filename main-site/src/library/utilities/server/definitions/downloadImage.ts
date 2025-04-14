import fs from 'node:fs'
import path from 'node:path'
import { payloadCmsBase, wordpressMedia } from '@/library/environment/publicVariables'
import logger from '@/library/logger'
import axios from 'axios'
import urlJoin from 'proper-url-join'

export async function downloadImage({
	imageFileName,
	cms,
	subFolder,
}: { imageFileName: string; cms: 'wordpress' | 'payload'; subFolder: string }) {
	const relativeFolderPath = path.join('public', 'images', cms, subFolder)
	const publicDir = path.join(process.cwd(), relativeFolderPath)

	const publicPath = path.join(publicDir, imageFileName)

	const publicExists = fs.existsSync(publicPath)

	if (publicExists) return

	const isWordPress = cms === 'wordpress'
	const downloadPath = isWordPress ? urlJoin(wordpressMedia, imageFileName) : urlJoin(payloadCmsBase, 'api/media/file', imageFileName)

	try {
		const response = await axios({
			url: downloadPath,
			responseType: 'arraybuffer',
		})

		const imageBuffer = Buffer.from(response.data, 'binary')

		if (!fs.existsSync(publicDir)) {
			fs.mkdirSync(publicDir, { recursive: true })
		}

		fs.writeFileSync(publicPath, imageBuffer)

		const relativeFilePath = path.join(relativeFolderPath, imageFileName)

		logger.success(`Downloaded ${imageFileName}: ${relativeFilePath}`)
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : `Error downloading image ${imageFileName}:`
		logger.error('Error downloading image: ', imageFileName, errorMessage)
		throw error
	}
}
