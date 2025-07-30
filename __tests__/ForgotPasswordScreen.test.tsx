import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
// Import TouchableOpacity for findByType in tests
import { TouchableOpacity } from 'react-native';
// Import FontAwesomeIcon and faPencil for finding the edit button
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

import ForgotPasswordScreen from '../src/screens/authScreens/ForgotPasswordScreen'; // Adjust the path if necessary

// Mock useSafeAreaInsets
jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

// Mock toast utility functions
jest.mock('../src/utils/toast', () => ({
  showSuccessToast: jest.fn(),
  showWarningToast: jest.fn(),
  showErrorToast: jest.fn(),
}));

// Import the mocked toast functions to assert on them
import { showSuccessToast, showWarningToast, showErrorToast } from '../src/utils/toast';

describe('ForgotPasswordScreen', () => {
  // Clear mocks before each test to ensure isolation
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders initial elements correctly', () => {
    const { getByText, getByPlaceholderText, queryByText } = render(<ForgotPasswordScreen />);

    // Check for initial welcome texts
    expect(getByText('Update your')).toBeTruthy();
    expect(getByText('password in just')).toBeTruthy();
    expect(getByText('a few steps.')).toBeTruthy();

    // Check for email input and Send OTP button
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByText('Send OTP')).toBeTruthy();

    // Ensure OTP-related elements are NOT present initially
    expect(queryByText('Verification Code')).toBeNull();
    expect(queryByText('Confirm Verification Code')).toBeNull();
    expect(queryByText(/Resend OTP in \d+ second\(s\)/)).toBeNull();
    expect(queryByText('Resend OTP')).toBeNull();
  });

  it('allows user to type into the email field', () => {
    const { getByPlaceholderText } = render(<ForgotPasswordScreen />);
    const emailInput = getByPlaceholderText('Email');

    fireEvent.changeText(emailInput, 'newtest@example.com');
    expect(emailInput.props.value).toBe('newtest@example.com');
  });

  it('shows warning toast for empty email on Send OTP', () => {
    const { getByText, getByPlaceholderText } = render(<ForgotPasswordScreen />);
    const emailInput = getByPlaceholderText('Email');
    const sendOtpButton = getByText('Send OTP');

    // Clear the default email value
    fireEvent.changeText(emailInput, '');
    fireEvent.press(sendOtpButton);

    expect(showWarningToast).toHaveBeenCalledWith("Empty Email", "Please enter your email address.", 3000);
    // Ensure the screen does not transition to OTP state
    expect(showSuccessToast).not.toHaveBeenCalled();
    expect(getByPlaceholderText('Email')).toBeTruthy(); // Email input should still be visible
  });

  it('shows error toast for invalid email on Send OTP', () => {
    const { getByText, getByPlaceholderText } = render(<ForgotPasswordScreen />);
    const emailInput = getByPlaceholderText('Email');
    const sendOtpButton = getByText('Send OTP');

    fireEvent.changeText(emailInput, 'invalid-email'); // Missing @ and .
    fireEvent.press(sendOtpButton);

    expect(showErrorToast).toHaveBeenCalledWith("Invalid Email", "Please enter a valid email address.", 3000);
    // Ensure the screen does not transition to OTP state
    expect(showSuccessToast).not.toHaveBeenCalled();
    expect(getByPlaceholderText('Email')).toBeTruthy(); // Email input should still be visible
  });

  it('transitions to OTP input state and shows success toast on valid email', async () => {
    const { getByText, getByPlaceholderText, queryByPlaceholderText, queryByText } = render(<ForgotPasswordScreen />);
    const emailInput = getByPlaceholderText('Email');
    const sendOtpButton = getByText('Send OTP');

    fireEvent.changeText(emailInput, 'valid@example.com');
    fireEvent.press(sendOtpButton);

    // Wait for state updates and UI changes
    await waitFor(() => {
      expect(showSuccessToast).toHaveBeenCalledWith("OTP Sent", "Please check your email for the OTP.", 3000);
      // Verify email input and Send OTP button are gone
      expect(queryByPlaceholderText('Email')).toBeNull();
      expect(queryByText('Send OTP')).toBeNull();

      // Verify OTP-related elements are present
      expect(getByPlaceholderText('Verification Code')).toBeTruthy();
      expect(getByText('Confirm Verification Code')).toBeTruthy();
      expect(getByText(/Resend OTP in \d+ second\(s\)/)).toBeTruthy(); // Check for timer text
      expect(getByText('valid@example.com')).toBeTruthy(); // Displayed email
    });
  });

  it('allows typing into the OTP field and enables Confirm button (visually)', async () => {
    const { getByText, getByPlaceholderText } = render(<ForgotPasswordScreen />);
    const emailInput = getByPlaceholderText('Email');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.press(getByText('Send OTP'));

    // Wait for transition to OTP state
    await waitFor(() => getByPlaceholderText('Verification Code'));

    const otpInput = getByPlaceholderText('Verification Code');
    const confirmButton = getByText('Confirm Verification Code');

    fireEvent.changeText(otpInput, '12345'); // 5 digits
    expect(otpInput.props.value).toBe('12345');

    fireEvent.changeText(otpInput, '123456'); // 6 digits
    expect(otpInput.props.value).toBe('123456');
    // At this point, the button should be visually enabled due to `otp.length === 6` class.
    // We can't assert on `disabled` prop, but we can assert it's present and can be pressed.
    expect(confirmButton).toBeTruthy();
  });

  it('verifies OTP and shows success toast when Confirm button is pressed with 6 digits', async () => {
    const { getByText, getByPlaceholderText } = render(<ForgotPasswordScreen />);
    const emailInput = getByPlaceholderText('Email');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.press(getByText('Send OTP'));

    await waitFor(() => getByPlaceholderText('Verification Code'));

    const otpInput = getByPlaceholderText('Verification Code');
    const confirmButton = getByText('Confirm Verification Code');

    fireEvent.changeText(otpInput, '654321'); // Valid 6-digit OTP
    fireEvent.press(confirmButton);

    expect(showSuccessToast).toHaveBeenCalledWith("OTP Verified", "Your OTP has been verified successfully.", 3000);
  });

  it('reverts to email input state when Edit button is pressed', async () => {
    // Destructure UNSAFE_getByType here
    const { getByText, getByPlaceholderText, queryByText, UNSAFE_getByType } = render(<ForgotPasswordScreen />);
    const emailInput = getByPlaceholderText('Email');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.press(getByText('Send OTP'));

    await waitFor(() => getByText('Please check your email for the verification code.'));

    // Find the FontAwesomeIcon for the pencil.
    // UNSAFE_getByType is used because FontAwesomeIcon is a component, not a primitive element.
    const pencilIcon = UNSAFE_getByType(FontAwesomeIcon);

    // Get the parent of the icon, which should be the TouchableOpacity.
    const editButton = pencilIcon.parent;

    if (editButton) {
      fireEvent.press(editButton);
    }

    await waitFor(() => {
      // Verify email input and Send OTP button are back
      expect(getByPlaceholderText('Email')).toBeTruthy();
      expect(getByText('Send OTP')).toBeTruthy();
      // Verify OTP-related elements are gone
      expect(queryByText('Verification Code')).toBeNull();
      expect(queryByText('Confirm Verification Code')).toBeNull();
    });
  });

  it('shows Resend OTP button when timer is 0 (simulated)', async () => {
    jest.useFakeTimers(); // Use fake timers for this test

    const { getByText, getByPlaceholderText, queryByText } = render(<ForgotPasswordScreen />);
    const emailInput = getByPlaceholderText('Email');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.press(getByText('Send OTP'));

    await waitFor(() => getByText(/Resend OTP in \d+ second\(s\)/));

    // Wrap advanceTimersByTime in act because it causes state updates
    await act(async () => {
      jest.advanceTimersByTime(5000); // Advance by 5 seconds
    });


    await waitFor(() => {
      expect(queryByText(/Resend OTP in \d+ second\(s\)/)).toBeNull(); // Timer text should be gone
      expect(getByText('Resend OTP')).toBeTruthy(); // Resend button should appear
    });

    jest.useRealTimers(); // Restore real timers
  });

  it('calls handleOtpTrigger when Resend OTP button is pressed', async () => {
    jest.useFakeTimers(); // Use fake timers for this test

    const { getByText, getByPlaceholderText } = render(<ForgotPasswordScreen />);
    const emailInput = getByPlaceholderText('Email');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.press(getByText('Send OTP'));

    await waitFor(() => getByText(/Resend OTP in \d+ second\(s\)/));
    
    // Advance timers and wrap in act
    await act(async () => {
      jest.advanceTimersByTime(5000); // Advance by 5 seconds to show Resend OTP button
    });

    await waitFor(() => getByText('Resend OTP'));

    const resendOtpButton = getByText('Resend OTP');
    
    // Wrap the button press in act as it triggers state updates
    await act(async () => {
      fireEvent.press(resendOtpButton);
    });

    // Expect showSuccessToast to be called again, indicating OTP was re-triggered
    expect(showSuccessToast).toHaveBeenCalledWith("OTP Sent", "Please check your email for the OTP.", 3000);
    // The timer should restart, so the "Resend OTP in X seconds" text should reappear
    expect(getByText(/Resend OTP in \d+ second\(s\)/)).toBeTruthy();

    jest.useRealTimers(); // Restore real timers
  });
});