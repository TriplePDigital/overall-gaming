import { ApiError } from '@supabase/supabase-js';

export interface LoginReturn {
    error? : LoginError
}

export interface LoginError extends ApiError {
    error_description?: string
    message?: string
}
