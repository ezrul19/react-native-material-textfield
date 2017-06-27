import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Counter from '.';

/* eslint-env jest */

const props = {
  baseColor: 'blue',
  errorColor: 'red',
};

it('renders null when limit is not set', () => {
  let counter = renderer
    .create(<Counter count={1} {...props} />)
    .toJSON();

  expect(counter)
    .toBeNull();
});

it('renders when limit is set', () => {
  let counter = renderer
    .create(<Counter count={1} limit={1} {...props} />)
    .toJSON();

  let text = counter.children[0];

  expect(text.type).toBe('Text');
  expect(text.props.style[1].color).toBe(props.baseColor);
  expect(text.children).toEqual(['1', ' / ', '1']);

  expect(counter)
    .toMatchSnapshot();
});

it('renders when limit is exceeded', () => {
  let counter = renderer
    .create(<Counter count={2} limit={1} {...props} />)
    .toJSON();

  let text = counter.children[0];

  expect(text.type).toBe('Text');
  expect(text.props.style[1].color).toBe(props.errorColor);
  expect(text.children).toEqual(['2', ' / ', '1']);

  expect(counter)
    .toMatchSnapshot();
});