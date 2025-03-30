import fs from 'node:fs'
import path from 'node:path'
import logger from '../logger'

/**
 * Copies an image from /public to /src/app so it can be optimised automatically
 * Writing files directly to /src/app is not allowed in Next.js
 */
export async function copyImageToApp(fileName: string): Promise<boolean> {
	const sourceFile = path.join(process.cwd(), 'public', 'images', 'wordpress', fileName)
	const targetFile = path.join(process.cwd(), 'src', 'app', 'images', 'wordpress', fileName)

	try {
		if (!fs.existsSync(sourceFile)) {
			logger.error(`Source file does not exist: ${sourceFile}`)
			return false
		}

		const fileContent = fs.readFileSync(sourceFile)

		const targetDir = path.dirname(targetFile)
		if (!fs.existsSync(targetDir)) {
			fs.mkdirSync(targetDir, { recursive: true })
		}

		fs.writeFileSync(targetFile, fileContent)
		return true
	} catch (error) {
		logger.error('Error moving file:', error)
		return false
	}
}
