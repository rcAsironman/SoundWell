import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import LoginScreen from '../src/screens/authScreens/LoginScreen';

describe('LoginScreen', () => {
  it('renders welcome texts and inputs', () => {
    const { getByText, getByPlaceholderText } = render(<LoginScreen />);

    expect(getByText('Welcome to,')).toBeTruthy();
    expect(getByText('SoundWell')).toBeTruthy();
    expect(getByText('SignIn')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Forgot password?')).toBeTruthy();
    expect(getByText("Don't have an account?")).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy(); // login button
  });

  it('allows user to type into email and password fields', () => {
    const { getByPlaceholderText } = render(<LoginScreen />);

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'secret123');

    // Because inputs are controlled via state, we expect the updated values
    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('secret123');
  });

  it('renders the login button with correct text', () => {
    const { getByText } = render(<LoginScreen />);
    const loginButton = getByText('Login');
    expect(loginButton).toBeTruthy();
  });
});