import 'react-native';
import React from 'react';
import App from '../App'; // Adjust path if necessary

// Note: If you're importing global.css in your actual App.tsx,
// ensure your jest.config.js has moduleNameMapper configured for CSS files:
// moduleNameMapper: { "\\.(css|less|scss|sass)$": "identity-obj-proxy" }
// This was addressed in previous steps, but mentioning it again for context.

// Import ReactTestRenderer for the act wrapper
import renderer from 'react-test-renderer';

// Mock react-native-date-picker to prevent NativeEventEmitter error
// This replaces the actual DatePicker component with a simple string 'DatePicker'
// during tests, preventing it from trying to access native modules.
jest.mock('react-native-date-picker', () => 'DatePicker');

// Mock react-native-bootsplash to prevent TurboModuleRegistry error
// This replaces the native module with a mock object for testing purposes.
jest.mock('react-native-bootsplash', () => ({
  hide: jest.fn(),
  addListener: jest.fn(),
  // Add other methods if your App.tsx uses them, e.g., show, fadeOut
}));

test('renders correctly', async () => {
  // Use ReactTestRenderer.act to ensure all state updates are flushed
  await renderer.act(async () => {
    renderer.create(<App />);
  });
});
