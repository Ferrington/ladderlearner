export function authError(message: string) {
  if (message === 'Unable to validate email address: invalid format') {
    return 'Invalid email format.';
  } else if (
    message === 'User already registered' ||
    message === 'A user with this email address has already been registered'
  ) {
    return 'An account with this email already exists.';
  } else if (message === 'Password should be at least 6 characters.') {
    return 'Password must be at least 6 characters.';
  } else {
    return 'Something went wrong. Please try again.';
  }
}
