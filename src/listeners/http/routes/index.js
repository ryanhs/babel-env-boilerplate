import log from 'utils/Log';

// middlewares

// endpoints
import ping from './ping'
import test_redis from './test_redis'

const routes = (app) => {
    app.get('/api/ping', ping)
    app.get('/api/test_redis', test_redis)
}

export default routes
