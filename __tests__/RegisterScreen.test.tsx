import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RegisterScreen from '../src/screens/authScreens/RegisterScreen'; // Adjust the path if necessary

describe('RegisterScreen', () => {
  it('renders welcome texts, inputs, and links', () => {
    const { getByText, getByPlaceholderText } = render(<RegisterScreen />);

    // Check for welcome texts
    expect(getByText('Welcome to,')).toBeTruthy();
    expect(getByText('SoundWell')).toBeTruthy();
    expect(getByText('SignUp')).toBeTruthy();

    // Check for input placeholders
    expect(getByPlaceholderText('First Name')).toBeTruthy();
    expect(getByPlaceholderText('Last Name(optional)')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();

    // Check for existing account link
    expect(getByText('Already have an account?')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();

    // Check for the Register button
    expect(getByText('Register')).toBeTruthy();
  });

  it('allows user to type into all input fields', () => {
    const { getByPlaceholderText } = render(<RegisterScreen />);

    const firstNameInput = getByPlaceholderText('First Name');
    const lastNameInput = getByPlaceholderText('Last Name(optional)');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    // Simulate typing into each input field
    fireEvent.changeText(firstNameInput, 'John');
    fireEvent.changeText(lastNameInput, 'Doe');
    fireEvent.changeText(emailInput, 'john.doe@example.com');
    fireEvent.changeText(passwordInput, 'securePassword123');

    // Verify that the input values have been updated in the component's state
    expect(firstNameInput.props.value).toBe('John');
    expect(lastNameInput.props.value).toBe('Doe');
    expect(emailInput.props.value).toBe('john.doe@example.com');
    expect(passwordInput.props.value).toBe('securePassword123');
  });

  it('renders the Register button with correct text', () => {
    const { getByText } = render(<RegisterScreen />);
    const registerButton = getByText('Register');
    expect(registerButton).toBeTruthy();
  });

  it('calls handleRegister and logs user inputs when the Register button is pressed', () => {
    // Spy on console.log to check what it receives
    const consoleSpy = jest.spyOn(console, 'log');
    const { getByText, getByPlaceholderText } = render(<RegisterScreen />);

    const firstNameInput = getByPlaceholderText('First Name');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');

    // Populate the input fields
    fireEvent.changeText(firstNameInput, 'TestUser');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    // Press the Register button
    fireEvent.press(getByText('Register'));

    // Assert that console.log was called with the expected message and user inputs
    expect(consoleSpy).toHaveBeenCalledWith('User Inputs:', {
      firstName: 'TestUser',
      lastName: '', // Expect lastName to be empty as it wasn't typed
      email: 'test@example.com',
      password: 'password123',
    });

    // Restore the original console.log function after the test
    consoleSpy.mockRestore();
  });
});
