import fs from 'node:fs'
import path from 'node:path'
import logger from '../logger'

/**
 * @deprecated Not needed, as Next.js does actually optimise images in the /public folder. I thought they had to be inside /app for some reason
 * Copies an image from /public to /src/app so it can be optimised automatically
 * Writing files directly to /src/app is not allowed in Next.js
 */
export async function copyImageToApp(fileName: string, subFolder: string): Promise<boolean> {
	const functionSignature = 'copyImageToApp'
	const sourceFile = path.join(process.cwd(), 'public', 'images', 'wordpress', subFolder, fileName)
	const targetFile = path.join(process.cwd(), 'src', 'app', 'images', 'wordpress', subFolder, fileName)

	try {
		if (!fs.existsSync(sourceFile)) {
			logger.error(functionSignature, `Source file does not exist: ${sourceFile}`)
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
		logger.error(functionSignature, 'Error moving file:', error)
		return false
	}
}
