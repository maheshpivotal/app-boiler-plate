import { apiClient } from './client';
import { 
  LoginCredentials, 
  RegisterCredentials, 
  ResetPasswordRequest, 
  ResetPasswordConfirm, 
  User, 
  ApiResponse 
} from '../../types';

interface AuthResponse {
  user: User;
  token: string;
  token_type?: string; // Laravel includes this
  refreshToken?: string;
}

interface LaravelRegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface LaravelLoginRequest {
  email: string;
  password: string;
}

interface LaravelForgotPasswordRequest {
  email: string;
}

interface LaravelResetPasswordRequest {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export class AuthService {
  /**
   * Register a new user
   */
  static async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const requestData: LaravelRegisterRequest = {
      name: `${credentials.firstName} ${credentials.lastName}`,
      email: credentials.email,
      password: credentials.password,
      password_confirmation: credentials.passwordConfirmation,
    };


    try {
      // apiClient.post already returns response.data, so this IS the authData
      const authData = await apiClient.post<AuthResponse>('/register', requestData);
      
      // Transform Laravel user response to our User interface
      if (authData && authData.user) {
        const userName = authData.user.name || '';
        const [firstName, ...lastNameParts] = userName.split(' ');
        authData.user = {
          ...authData.user,
          firstName: firstName || '',
          lastName: lastNameParts.join(' ') || '',
        };
      }
      
      return authData;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Login user
   */
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const requestData: LaravelLoginRequest = {
      email: credentials.email,
      password: credentials.password,
    };

    // apiClient.post already returns response.data, so this IS the authData
    const authData = await apiClient.post<AuthResponse>('/login', requestData);
    
    // Transform Laravel user response to our User interface
    if (authData && authData.user) {
      const userName = authData.user.name || '';
      const [firstName, ...lastNameParts] = userName.split(' ');
      authData.user = {
        ...authData.user,
        firstName: firstName || '',
        lastName: lastNameParts.join(' ') || '',
      };
    }
    
    return authData;
  }

  /**
   * Send forgot password email
   */
  static async forgotPassword(request: ResetPasswordRequest): Promise<ApiResponse<{ message: string }>> {
    const requestData: LaravelForgotPasswordRequest = {
      email: request.email,
    };

    return await apiClient.post<{ message: string }>('/forgot-password', requestData);
  }

  /**
   * Reset password with token
   */
  static async resetPassword(request: ResetPasswordConfirm): Promise<ApiResponse<{ message: string }>> {
    const requestData: LaravelResetPasswordRequest = {
      token: request.token,
      email: request.email,
      password: request.password,
      password_confirmation: request.passwordConfirmation,
    };

    return await apiClient.post<{ message: string }>('/reset-password', requestData);
  }

  /**
   * Logout user (when protected routes are implemented)
   */
  static async logout(): Promise<ApiResponse<{ message: string }>> {
    return await apiClient.post<{ message: string }>('/auth/logout');
  }

  /**
   * Refresh authentication token (when implemented)
   */
  static async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    return await apiClient.post<{ token: string }>('/auth/refresh');
  }
}
