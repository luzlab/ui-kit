/* @jsx jsx */

import { jsx } from '@emotion/core';

import { action } from '@storybook/addon-actions';
import { withKnobs } from '@storybook/addon-knobs';
import { boolean } from '@storybook/addon-knobs/react';
import { storiesOf } from '@storybook/react';

import { ContextMenu } from '../../ContextMenu';

export const contextMenuKnobs = (tabName = 'ContextMenu') => {
  return {
    hideOnLeave: boolean('hideOnLeave', false, tabName),
  };
};

storiesOf('Menus:Context Menu', module)
  .addDecorator(withKnobs)
  .add('with defaults', () => (
    <ContextMenu
      id="defaultContextMenu"
      renderTrigger={() => 'trigger'}
      menuItems={[
        { title: 'Menu Item 1' },
        { title: 'Menu Item 2' },
        { title: 'Menu Item 3' },
        { divider: true },
        { title: 'Disabled Menu Item', disabled: true },
      ]}
    />
  ))
  .add('custom items', () => (
    <ContextMenu
      id="defaultContextMenu"
      renderTrigger={() => 'Right Click Me!'}
      menuItems={[
        { title: 'Menu Item 1', color: 'success', onClick: action('onClick') },
        { title: 'Menu Item 2', color: 'warning' },
        { title: 'Menu Item 3', color: 'error' },
        { divider: true, borderColor: 'fg' },
        {
          title: 'Disabled Menu Item',
          disabled: true,
          fontStyle: 'italic',
        },
      ]}
    />
  ))
  .add('sub menu', () => (
    <ContextMenu
      id="defaultContextMenu"
      renderTrigger={() => 'Right Click Me!'}
      menuItems={[
        { title: 'Menu Item 1', color: 'success', onClick: action('onClick') },
        {
          title: 'SubMenu Item',
          color: 'warning',
          menuItems: [
            { title: 'SubMenu Item 1', color: 'success', onClick: action('onClick') },
            {
              title: 'Nested SubMenu Item 2',
              color: 'warning',
              menuItems: [
                { title: 'SubMenu Item 1', color: 'success', onClick: action('onClick') },
                { title: 'SubMenu Item 2', color: 'warning' },
                { title: 'SubMenu Item 3', color: 'error' },
                { divider: true, borderColor: 'fg' },
                {
                  title: 'Disabled SubMenu Item',
                  disabled: true,
                  fontStyle: 'italic',
                },
              ],
            },
            { title: 'SubMenu Item 3', color: 'error' },
            {
              title: 'Nested SubMenu Item 4',
              color: 'warning',
              menuItems: [
                { title: 'SubMenu Item 1', color: 'success', onClick: action('onClick') },
                { title: 'SubMenu Item 2', color: 'warning' },
                { title: 'SubMenu Item 3', color: 'error' },
                { divider: true, borderColor: 'fg' },
                {
                  title: 'Disabled SubMenu Item',
                  disabled: true,
                  fontStyle: 'italic',
                },
              ],
            },
            { divider: true, borderColor: 'fg' },
            {
              title: 'Disabled SubMenu Item',
              disabled: true,
              fontStyle: 'italic',
            },
          ],
        },
        { title: 'Menu Item 3', color: 'error' },
        { divider: true, borderColor: 'fg' },
        {
          title: 'Disabled Menu Item',
          disabled: true,
          fontStyle: 'italic',
        },
      ]}
    />
  ));
