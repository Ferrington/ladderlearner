import { AuthError } from '@supabase/supabase-js';

export function serializeError(error: AuthError) {
  return {
    status: error.status,
    name: error.name,
    message: error.message,
  };
}
