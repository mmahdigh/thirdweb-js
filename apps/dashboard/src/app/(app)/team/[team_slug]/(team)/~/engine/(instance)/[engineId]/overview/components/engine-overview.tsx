"use client";
import { SingleNetworkSelector } from "@/components/blocks/NetworkSelectors";
import { UnderlineLink } from "@/components/ui/UnderlineLink";
import { TrackedUnderlineLink } from "@/components/ui/tracked-link";
import { useThirdwebClient } from "@/constants/thirdweb.client";
import {
  type EngineInstance,
  useEngineBackendWallets,
  useEngineWalletConfig,
} from "@3rdweb-sdk/react/hooks/useEngine";
import { useState } from "react";
import type { ThirdwebClient } from "thirdweb";
import { useActiveWalletChain } from "thirdweb/react";
import { BackendWalletsTable } from "./backend-wallets-table";
import { CreateBackendWalletButton } from "./create-backend-wallet-button";
import { ImportBackendWalletButton } from "./import-backend-wallet-button";
import { TransactionCharts, TransactionsTable } from "./transactions-table";

interface EngineOverviewProps {
  instance: EngineInstance;
  teamSlug: string;
  authToken: string;
}

export const EngineOverview: React.FC<EngineOverviewProps> = ({
  instance,
  teamSlug,
  authToken,
}) => {
  const client = useThirdwebClient();

  return (
    <div>
      <BackendWalletsSection
        instance={instance}
        teamSlug={teamSlug}
        authToken={authToken}
        client={client}
      />
      <div className="h-10" />
      <TransactionCharts instanceUrl={instance.url} authToken={authToken} />
      <div className="h-10" />
      <TransactionsTable
        instanceUrl={instance.url}
        authToken={authToken}
        client={client}
      />
    </div>
  );
};

function BackendWalletsSection(props: {
  instance: EngineInstance;
  teamSlug: string;
  authToken: string;
  client: ThirdwebClient;
}) {
  const { instance, teamSlug, authToken } = props;
  const activeWalletChain = useActiveWalletChain();
  const [_chainId, setChainId] = useState<number>();
  const chainId = _chainId || activeWalletChain?.id || 1;

  const backendWallets = useEngineBackendWallets({
    instanceUrl: instance.url,
    authToken,
  });
  const { data: walletConfig } = useEngineWalletConfig({
    instanceUrl: instance.url,
    authToken,
  });

  return (
    <section className="rounded-lg border border-border bg-card">
      <div className="flex flex-col gap-5 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="mb-1 font-semibold text-xl tracking-tight">
              Backend Wallets
            </h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Engine sends blockchain transactions from backend wallets you own
            and manage.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Set up other wallet types from the{" "}
            <UnderlineLink
              href={`/team/${teamSlug}/~/engine/${instance.id}/configuration`}
            >
              Configuration
            </UnderlineLink>{" "}
            tab, or{" "}
            <TrackedUnderlineLink
              href="https://portal.thirdweb.com/infrastructure/engine/features/backend-wallets"
              target="_blank"
              label="learn-more"
              category="engine"
            >
              learn more about backend wallets.
            </TrackedUnderlineLink>
          </p>
        </div>

        <div className="flex flex-col items-end gap-4 border-border max-md:w-full max-md:border-t max-md:pt-6">
          {walletConfig && (
            <div className="flex flex-row justify-end gap-3 max-md:w-full">
              <ImportBackendWalletButton
                instance={instance}
                walletConfig={walletConfig}
                teamSlug={teamSlug}
                authToken={authToken}
              />
              <CreateBackendWalletButton
                instance={instance}
                walletConfig={walletConfig}
                teamSlug={teamSlug}
                authToken={authToken}
              />
            </div>
          )}

          <div className="flex justify-end">
            <div className="flex items-center gap-2">
              <span className="text-sm">Show balance for</span>
              <div className="flex flex-row">
                <SingleNetworkSelector
                  chainId={chainId}
                  onChange={setChainId}
                  className="min-w-40 max-w-52 lg:max-w-60"
                  popoverContentClassName="!w-[80vw] md:!w-[500px]"
                  align="end"
                  client={props.client}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <BackendWalletsTable
        instanceUrl={instance.url}
        wallets={backendWallets.data ?? []}
        isPending={backendWallets.isPending}
        isFetched={backendWallets.isFetched}
        authToken={authToken}
        chainId={chainId}
        client={props.client}
      />
    </section>
  );
}
