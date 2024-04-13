const BASE_URL = "http://127.0.0.1:5000/api";

export const LOGIN_URL = `${BASE_URL}/auth/login`;
export const REGISTER_URL = `${BASE_URL}/auth/register`;
export const VERIFY_OTP_URL = `${BASE_URL}/auth/register/verify`;

export const CREATOR_SONGS_URL = `${BASE_URL}/admin/song/my-songs`;
export const NEW_SONG_URL = `${BASE_URL}/admin/song/create`;

export const ALL_GENRES = `${BASE_URL}/public/genre`;
export const ALL_LANGUAGES = `${BASE_URL}/public/language`;

export const PROFILE_URL = `${BASE_URL}/user/profile`;
export const REGISTER_AS_CREATOR_URL = `${BASE_URL}/user/i-wanna-be-creator`;
export const SONG_URL_PREFIX = `${BASE_URL}/user/song`;

