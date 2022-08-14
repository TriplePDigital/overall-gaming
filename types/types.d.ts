import { ApiError } from '@supabase/supabase-js'

export interface LoginError extends ApiError {
	error_description?: string
	message?: string
}

export interface LoginReturn {
	error?: LoginError
}
