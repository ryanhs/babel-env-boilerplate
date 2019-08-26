import Promise from 'bluebird';
import superagent from 'superagent';
import log from 'utils/Log';

// listeners
import httpListener from 'listeners/http';

// data
import { bootstrap as dataBootstrap } from 'data/index';
import { bootstrap as blobStorageBoostrap } from 'data/blobStorage';

// guards
import { timeGuard } from 'guards/time';

// bootstrap
const bootstrap = async () => {
  await Promise.all([
    dataBootstrap(),
    process.env.APP_ACTIVE_AZURE == true ? blobStorageBoostrap() : log.info('Blob Storage Offline'),
  ]);

  httpListener.listen();
}

bootstrap()
  // .then(() => log.info('App open: ' + timeGuard()))
  .catch(error => log.error("fatal error!", error))
