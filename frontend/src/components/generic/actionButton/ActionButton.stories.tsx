import type { Meta, StoryObj } from '@storybook/react';

import ActionButton from './ActionButton';

const meta = {
  component: ActionButton,
} satisfies Meta<typeof ActionButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: {}
  }
};