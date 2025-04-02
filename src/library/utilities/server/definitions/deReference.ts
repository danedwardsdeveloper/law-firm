/**
 * Utility for dealing with Payload's inconsistent types
 */
export function deReference<T extends { url?: string | null }>(value: T | number | null | undefined): T & { url: string } {
	if (typeof value === 'number') {
		throw new Error('Relationship not populated - deReference used on ID reference')
	}
	if (value === null || value === undefined) {
		throw new Error('Relationship is null or undefined')
	}
	if (!value.url) {
		throw new Error('Media object has no URL property')
	}
	return value as T & { url: string }
}
