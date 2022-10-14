import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Button from '.';

describe('button', () => {
  test('render without props', () => {
    const text = 'hello' as string;
    render(
      <Button>
        { text }
      </Button>
    );
  
    const btn = screen.getByText(text);
  
    expect(btn).toHaveTextContent(text);
    expect(btn).not.toBeDisabled();
    expect(btn).toHaveClass('button-common button-common_primary button-common_m');
  });

  test('render with props', () => {
    const text = 'hello' as string;
    render(
      <Button
        size="s"
        type="secondary"
        classes="lol kek"
      >
        { text }
      </Button>
    );
  
    const btn = screen.getByText(text);
  
    expect(btn).toHaveTextContent(text);
    expect(btn).not.toBeDisabled();
    expect(btn).toHaveClass('button-common button-common_secondary button-common_s lol kek');
  });
});