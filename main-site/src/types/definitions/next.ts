export type NextDynamic = 'auto' | 'force-dynamic' | 'error' | 'force-static'
export type NextDynamicParams = boolean
export type NextRevalidate = false | 0 | number
export type NextFetchCache =
	| 'auto'
	| 'default-cache'
	| 'only-cache'
	| 'force-cache'
	| 'force-no-store'
	| 'default-no-store'
	| 'only-no-store'
export type NextRuntime = 'nodejs' | 'edge'
export type NextPreferredRegion = 'auto' | 'global' | 'home' | string | string[]

export interface RouteSegmentConfig {
	experimental_ppr?: boolean
	dynamic?: NextDynamic
	dynamicParams?: NextDynamicParams
	revalidate?: NextRevalidate
	fetchCache?: NextFetchCache
	runtime?: NextRuntime
	preferredRegion?: NextPreferredRegion
	maxDuration?: number
}

export function routeSegmentConfig({
	dynamic = 'auto',
	dynamicParams = true,
	revalidate = false,
	fetchCache = 'auto',
	runtime = 'nodejs',
	preferredRegion = 'auto',
	...propertiesWithoutDefaults
}: RouteSegmentConfig = {}): RouteSegmentConfig {
	return {
		dynamic,
		dynamicParams,
		revalidate,
		fetchCache,
		runtime,
		preferredRegion,
		...propertiesWithoutDefaults,
	}
}
