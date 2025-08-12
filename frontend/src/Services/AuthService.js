import axios from 'axios';

const base_uri = 'http://localhost:3001/auth'

class AuthService {

static async  registerUser(userData) {
        try {
        const response = await axios.post(`${base_uri}/register`, userData);
        if (!response) {
            throw new Error('No response from server');
        }
    } catch (error) {
        console.error('Registration error:', error);
        throw error
    }
}

static async loginUser(credentials) {
        try {
            const response = await axios.post(`${base_uri}/login`, credentials)
            if (response) {
                const { token, user } = response.data;
                
                // Store token and user separately
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                
                console.log("Login successful:", response.data);
                console.log("Token:", response.data.token);
                console.log("User:", response.data.username);
            } else {
                throw new Error('Login failed');
            }
            return response.data;
        }catch(error) {
            console.error('Login error:', error);
            throw error;
        }

    }

    // Helper methods to get stored data
    static getToken() {
        return localStorage.getItem('token');
    }

    static getUser() {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }

    static isAuthenticated() {
        return !!this.getToken();
    }

    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

}


export default AuthService;
