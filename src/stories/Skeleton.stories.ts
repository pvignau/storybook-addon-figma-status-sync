import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton'

const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    width: '200px',
    height: '20px',
  },
}

export const Circle: Story = {
  args: {
    width: '48px',
    height: '48px',
    variant: 'circle',
  },
}

export const Rectangle: Story = {
  args: {
    width: '300px',
    height: '100px',
    variant: 'rectangle',
  },
}
