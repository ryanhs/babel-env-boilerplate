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
    blobStorageBoostrap(),
  ]);

  httpListener.listen();
}

bootstrap()
  .then(() => log.info(global.configs, 'App open: ' + timeGuard()))
  .catch(error => log.error("fatal error!", error))
