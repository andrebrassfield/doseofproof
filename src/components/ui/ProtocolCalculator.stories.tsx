import type { Meta, StoryObj } from "@storybook/react";
import { ProtocolCalculator } from "./ProtocolCalculator";

const meta: Meta<typeof ProtocolCalculator> = {
  title: "Interactive/ProtocolCalculator",
  component: ProtocolCalculator,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "5-question biological entry-point calculator. Maps user answers to one of three result layers: Structure (CCI/upper cervical), Environmental (mold/biotoxin), or Autonomic (vagal/MCAS). Result includes a recommended diagnostic test and a deep link to the relevant hub. Client-side only — no backend, no PII. **Audit finding (5.2):** the `histamine` and `autonomic` answer flags are unused (code-side lint warnings) — the routing logic should be more nuanced.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProtocolCalculator>;

export const Initial: Story = {
  decorators: [(Story) => <div className="p-8"><Story /></div>],
};

export const AnsweredStructure: Story = {
  play: async ({ canvas, userEvent }) => {
    const start = await canvas.findByRole("button", { name: /start questionnaire/i });
    await userEvent.click(start);
    // Q1: structure (yes)
    await userEvent.click(await canvas.findByRole("button", { name: /yes, matches my pattern/i }));
    // Q2-Q5: pick "no" four times
    for (let i = 0; i < 4; i++) {
      await userEvent.click(await canvas.findByRole("button", { name: /no, does not match/i }));
    }
  },
};

export const AnsweredEnvironment: Story = {
  play: async ({ canvas, userEvent }) => {
    const start = await canvas.findByRole("button", { name: /start questionnaire/i });
    await userEvent.click(start);
    // Q1: no (structure), Q2: no (histamine), Q3: yes (environment)
    await userEvent.click(await canvas.findByRole("button", { name: /no, does not match/i }));
    await userEvent.click(await canvas.findByRole("button", { name: /no, does not match/i }));
    await userEvent.click(await canvas.findByRole("button", { name: /yes, matches my pattern/i }));
    // Q4-Q5: no, no
    await userEvent.click(await canvas.findByRole("button", { name: /no, does not match/i }));
    await userEvent.click(await canvas.findByRole("button", { name: /no, does not match/i }));
  },
};

export const AnsweredAutonomic: Story = {
  play: async ({ canvas, userEvent }) => {
    const start = await canvas.findByRole("button", { name: /start questionnaire/i });
    await userEvent.click(start);
    for (let i = 0; i < 5; i++) {
      await userEvent.click(await canvas.findByRole("button", { name: /no, does not match/i }));
    }
  },
};
