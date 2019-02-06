import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { Button } from '../../Button';
import { Dialog, IDialog } from '../../Dialog';
import { Heading } from '../../Heading';
import { boxKnobs } from '../Layout/Box';

export const dialogKnobs = (tabName = 'Dialog'): Partial<IDialog> => ({
  ...boxKnobs(),
  show: boolean('show', true, tabName),
});

storiesOf('Miscellaneous:Dialog', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <Dialog {...dialogKnobs()} onClickOutside={action('onClickOutside')}>
      <Heading py={4} px={5} textAlign="center">
        Remove file?
      </Heading>
      <Button width="50%">yes</Button>
      <Button width="50%">no</Button>
    </Dialog>
  ));