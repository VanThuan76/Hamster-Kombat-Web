import {
    Avatar,
    Cell,
    List,
    Navigation,
    Section,
    Title,
} from '@telegram-apps/telegram-ui';

import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';

import { DisplayData } from './DisplayData';

const { useUtils } = require('@telegram-apps/sdk-react')

const InfoWalletTON = () => {
    const wallet = useTonWallet();
    const utils = useUtils();

    if (!wallet) {
        return (
            <TonConnectButton />
        );
    }

    const {
        account: { chain, publicKey, address },
        device: {
            appName,
            appVersion,
            maxProtocolVersion,
            platform,
            features,
        },
    } = wallet;
    return (
        <List>
            {'imageUrl' in wallet && (
                <>
                    <Section>
                        <Cell
                            before={
                                <Avatar src={wallet.imageUrl} alt='Provider logo' width={60} height={60} />
                            }
                            after={<Navigation>About wallet</Navigation>}
                            subtitle={wallet.appName}
                            onClick={(e) => {
                                e.preventDefault();
                                utils.openLink(wallet.aboutUrl);
                            }}
                        >
                            <Title level='3'>{wallet.name}</Title>
                        </Cell>
                    </Section>
                    <TonConnectButton />
                </>
            )}
            <DisplayData
                header='Account'
                rows={[
                    { title: 'Address', value: address },
                    { title: 'Chain', value: chain },
                    { title: 'Public Key', value: publicKey },
                ]}
            />
            <DisplayData
                header='Device'
                rows={[
                    { title: 'App Name', value: appName },
                    { title: 'App Version', value: appVersion },
                    { title: 'Max Protocol Version', value: maxProtocolVersion },
                    { title: 'Platform', value: platform },
                    {
                        title: 'Features',
                        value: features
                            .map(f => typeof f === 'object' ? f.name : undefined)
                            .filter(v => v)
                            .join(', '),
                    },
                ]}
            />
        </List>
    );
}

export default InfoWalletTON;