import type { Meta, StoryObj } from '@storybook/react'
import { Rating } from './Rating'

const meta = {
  title: 'Data Display/Rating',
  component: Rating,
  tags: ['autodocs', 'version:1.1.0'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Rating>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 3,
    maxValue: 5,
  },
}

export const ReadOnly: Story = {
  args: {
    value: 4,
    maxValue: 5,
    readOnly: true,
  },
}

export const CustomMaxValue: Story = {
  args: {
    value: 7,
    maxValue: 10,
  },
}

export const Empty: Story = {
  args: {
    value: 0,
    maxValue: 5,
  },
}

export const Full: Story = {
  args: {
    value: 5,
    maxValue: 5,
  },
}
