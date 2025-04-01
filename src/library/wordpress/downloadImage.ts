import fs from 'node:fs'
import path from 'node:path'
import axios from 'axios'
import urlJoin from 'proper-url-join'
import { wordpressMedia } from '../../environment/publicVariables'
import logger from '../../logger'

export async function downloadImage({ imageFileName, subFolder }: { imageFileName: string; subFolder: string }) {
	const relativeFolderPath = path.join('public', 'images', 'wordpress', subFolder)
	const publicDir = path.join(process.cwd(), relativeFolderPath)

	const publicPath = path.join(publicDir, imageFileName)

	const publicExists = fs.existsSync(publicPath)

	if (publicExists) return

	try {
		const response = await axios({
			url: urlJoin(wordpressMedia, imageFileName),
			method: 'GET',
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
		logger.error(`Error downloading image ${imageFileName}:`, error)
		throw error
	}
}
