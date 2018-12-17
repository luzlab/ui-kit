/* @jsx jsx */

import { jsx } from '@emotion/core';

import { StateDecorator, Store } from '@sambego/storybook-state';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean, number } from '@storybook/addon-knobs/react';
import { storiesOf, StoryDecorator } from '@storybook/react';

import { ITextarea, Textarea } from '../../Textarea';
import { boxKnobs } from '../Layout/Box';

const store = new Store({
  value: 'TextArea Text',
});

export const textareaKnobs = (tabName = 'Textarea'): ITextarea => ({
  ...boxKnobs<HTMLTextAreaElement>(),
  autosize: boolean('autosize', false, tabName),
  disabled: boolean('disabled', false, tabName),
});

export const textareaAutosizeKnobs = (tabName = 'Textarea'): ITextarea => ({
  ...textareaKnobs(tabName),
  minRows: number(
    'minRows',
    0,
    {
      min: 0,
      range: false,
      max: Infinity,
      step: 1,
    },
    tabName
  ),
  maxRows: number(
    'maxRows',
    10,
    {
      min: 1,
      range: false,
      max: Infinity,
      step: 1,
    },
    tabName
  ),
});

storiesOf('Forms:Textarea', module)
  .addDecorator(withKnobs)
  .add('uncontrolled', () => <Textarea {...textareaKnobs()} />)
  .add('autosize', () => <Textarea {...textareaAutosizeKnobs()} autosize />)
  .addDecorator(StateDecorator(store) as StoryDecorator)
  .add('controlled set', () => <Textarea {...textareaKnobs()} value="not-editable" />)
  .add('controlled store', () => (
    <Textarea
      {...textareaKnobs()}
      value={store.get('value')}
      onChange={event => store.set({ value: event.currentTarget.value })}
    />
  ));