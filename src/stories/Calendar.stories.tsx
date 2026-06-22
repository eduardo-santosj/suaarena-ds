import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Calendar } from '../components/ui/calendar';

const meta: Meta<typeof Calendar> = {
  title: 'UI/Calendar',
  component: Calendar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    );
  },
};

export const Range: Story = {
  name: 'Seleção de intervalo',
  render: () => {
    const [range, setRange] = useState<{ from?: Date; to?: Date }>({});
    return (
      <Calendar
        mode="range"
        selected={range as { from: Date; to?: Date }}
        onSelect={(r) => setRange(r ?? {})}
        className="rounded-md border"
      />
    );
  },
};
