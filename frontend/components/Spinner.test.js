import React from "react"

import Spinner from "./Spinner.js";
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
// Import the Spinner component into this file and test
// that it renders what it should for the different props it can take.
test('spinner on', () => {
  render(< Spinner on={true}/>)
  expect(screen.getByText(/Please wait.../i)).toBeInTheDocument();
})

test('spinner off', () => {
  render(< Spinner on={false}/>)
  expect(screen.queryByText(/Please wait.../i)).not.toBeInTheDocument();
})
