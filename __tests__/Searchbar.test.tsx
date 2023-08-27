import React from 'react';
import {SearchBar} from '../src/lib/components/searchBar';
import renderer from 'react-test-renderer';

const props = {
  onSearch: (query: string) => console.log('-', query),
  debounceTime: 100,
  onCancel: () => console.log('-'),
};

test('Renders Searchbar snapshot as expected', () => {
  const tree = renderer.create(<SearchBar {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
