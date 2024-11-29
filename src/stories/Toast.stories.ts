import type { Meta, StoryObj } from '@storybook/react'
import { Toast } from './Toast'

const meta = {
  title: 'Feedback/Toast',
  component: Toast,
  tags: ['autodocs', 'version:2.1.0'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
  args: {
    type: 'success',
    message: 'Operation completed successfully!',
    isVisible: true,
    onClose: () => console.log('Toast closed'),
  },
}

export const Error: Story = {
  args: {
    type: 'error',
    message: 'An error occurred. Please try again.',
    isVisible: true,
    onClose: () => console.log('Toast closed'),
  },
}

export const Info: Story = {
  args: {
    type: 'info',
    message: 'New updates are available',
    isVisible: true,
    onClose: () => console.log('Toast closed'),
  },
}

export const Warning: Story = {
  args: {
    type: 'warning',
    message: 'Please save your changes before leaving',
    isVisible: true,
    onClose: () => console.log('Toast closed'),
  },
}
