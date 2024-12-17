import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
};

try {
  const storedLoginStatus = JSON.parse(localStorage.getItem('isLoggedIn'));
  if (typeof storedLoginStatus === 'boolean') {
    initialState.isLoggedIn = storedLoginStatus;
  }
} catch (error) {
  console.error('Failed to parse login status from localStorage:', error);
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', JSON.stringify(state.isLoggedIn)); // Persist login status
    },
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem('isLoggedIn'); // Remove login status from localStorage
    },
    initializeAuth(state) {
      try {
        const storedLoginStatus = JSON.parse(localStorage.getItem('isLoggedIn'));
        if (typeof storedLoginStatus === 'boolean') {
          state.isLoggedIn = storedLoginStatus;
        }
      } catch (error) {
        console.error('Failed to initialize login state:', error);
        state.isLoggedIn = false;
      }
    },
  },
});

export const { login, logout, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
