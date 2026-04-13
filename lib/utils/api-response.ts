/**
 * Standard API Response Format
 * Ensures consistent error handling and response structure
 */

export interface ApiResponse<T = null> {
  status: 'success' | 'error'
  data?: T
  message?: string
  errors?: Record<string, string[]>
  timestamp?: string
}

/**
 * Success Response
 * @param data The response data
 * @returns Formatted success response
 */
export function success<T>(data: T): ApiResponse<T> {
  return {
    status: 'success',
    data,
    timestamp: new Date().toISOString(),
  }
}

/**
 * Error Response
 * @param message Error message
 * @param errors Field-level validation errors
 * @returns Formatted error response
 */
export function error(message: string, errors?: Record<string, string[]>): ApiResponse<null> {
  return {
    status: 'error',
    message,
    errors,
    timestamp: new Date().toISOString(),
  }
}

/**
 * Validation Error Response
 * @param errors Field-level errors
 * @returns Formatted validation error response
 */
export function validationError(errors: Record<string, string[]>): ApiResponse<null> {
  return {
    status: 'error',
    message: 'Validation failed',
    errors,
    timestamp: new Date().toISOString(),
  }
}

/**
 * Unauthorized Response
 * @returns Formatted unauthorized response
 */
export function unauthorized(): ApiResponse<null> {
  return {
    status: 'error',
    message: 'Unauthorized',
    timestamp: new Date().toISOString(),
  }
}

/**
 * Not Found Response
 * @param resource Resource name
 * @returns Formatted not found response
 */
export function notFound(resource: string): ApiResponse<null> {
  return {
    status: 'error',
    message: `${resource} not found`,
    timestamp: new Date().toISOString(),
  }
}

/**
 * Server Error Response
 * @param error Error object or message
 * @returns Formatted server error response
 */
export function serverError(error: Error | string): ApiResponse<null> {
  const message = error instanceof Error ? error.message : error
  return {
    status: 'error',
    message: 'Internal server error',
    timestamp: new Date().toISOString(),
  }
}
