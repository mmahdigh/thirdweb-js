import type { Meta, StoryObj } from "@storybook/react";
import {
  PastDueBannerUI,
  ServiceCutOffBannerUI,
} from "./BillingAlertBannersUI";

const meta = {
  title: "Banners/Billing Alerts",
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const PaymentAlerts: Story = {
  render: () => (
    <div className="space-y-10">
      <PastDueBannerUI
        teamSlug="foo"
        getBillingPortalUrl={() => Promise.resolve({ status: 200 })}
      />

      <ServiceCutOffBannerUI
        teamSlug="foo"
        getBillingPortalUrl={() => Promise.resolve({ status: 200 })}
      />
    </div>
  ),
};
