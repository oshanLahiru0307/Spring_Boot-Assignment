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
                //authStore.setUser(response.data);
                localStorage.setItem('token', JSON.stringify(response.data));
                console.log("Login successful:", response.data);
            } else {
                throw new Error('Login failed');
            }
            return response.data;
        }catch(error) {
            console.error('Login error:', error);
            throw error;
        }

    }

}


export default AuthService;
