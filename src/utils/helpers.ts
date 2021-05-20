import { logger } from './logger'

export function getSomething(): string {
    logger.info('call getSomething at src/utils/helpers.ts')
    return 'something...'
}