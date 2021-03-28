import { name as appName } from '../package.json'

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
export const COOKIE_NAME = appName + '_id';
export const FORGET_PASSWORD_PREFIX = 'forget-password:';
