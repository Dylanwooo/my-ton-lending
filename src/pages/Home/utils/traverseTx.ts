import { Transaction } from '@ton/core';
import { TonClient, CommonMessageInfoInternal } from '@ton/ton';

const findOutgoingTransactions = async (
  client: TonClient,
  transaction: Transaction
): Promise<Transaction[]> => {
  const outMessagesInfos = transaction.outMessages
    .values()
    .map(message => message.info)
    .filter((info): info is CommonMessageInfoInternal => info.type === 'internal');

  return Promise.all(
    outMessagesInfos.map(info =>
      client.tryLocateResultTx(info.src, info.dest, info.createdLt.toString())
    )
  );
};

export const traverseTx = async (client: TonClient, transaction: Transaction) => {
  const outTxs = await findOutgoingTransactions(client, transaction);

  const outResList = await Promise.all(outTxs.map(out => traverseTx(client, out)));
};
