import { AuthError, PostgrestError } from '@supabase/supabase-js';

export function serializeAuthError(error: AuthError) {
  return {
    status: error.status,
    name: error.name,
    message: error.message,
  };
}

export function serializePostgrestError(error: PostgrestError) {
  return {
    code: error.code,
    message: error.message,
    details: error.details,
    hint: error.hint,
  };
}
