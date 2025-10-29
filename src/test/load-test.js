import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  scenarios: {
  /*  stateless_http1: {
      executor: 'ramping-vus',
      exec: 'postToStatelessHttp1',
      startVUs: 0,
      stages: [
        { duration: '20s', target: 50 },
        { duration: '40s', target: 200 },
        { duration: '1m', target: 500 },
      ],
    },*/
   /* stateful_http1: {
      executor: 'ramping-vus',
      exec: 'postToStatefulHttp1',
      startVUs: 0,
      stages: [
        { duration: '20s', target: 50 },
        { duration: '40s', target: 200 },
        { duration: '1m', target: 500 },
      ],
    },*/
  /*  stateless_http2: {
      executor: 'ramping-vus',
      exec: 'postToStatelessHttp2',
      startVUs: 0,
      stages: [
        { duration: '20s', target: 50 },
        { duration: '40s', target: 200 },
        { duration: '1m', target: 500 },
      ],
    },*/
   /* stateful_http2: {
      executor: 'ramping-vus',
      exec: 'postToStatefulHttp2',
      startVUs: 0,
      stages: [
        { duration: '20s', target: 50 },
        { duration: '40s', target: 200 },
        { duration: '1m', target: 500 },
      ],
    },*/
  },
  thresholds: {
    http_req_duration: ['p(95)<1000'],
    http_req_failed: ['rate<0.05'],
  },
};

const makePayload = () => JSON.stringify({
  serverId: `srv-${Math.floor(Math.random() * 10000)}`,
  cpu: Math.random() * 100,
  memory: Math.random() * 100,
  timestamp: new Date().toISOString(),
});

export function postToStatelessHttp1() {
  const url = 'http://localhost:3000/api/metrics'; // stateless_http1
  const res = http.post(url, makePayload(), { headers: { 'Content-Type': 'application/json' }});
  check(res, { 'status 2xx': (r) => r.status === 201 || r.status === 200 });
  sleep(0.2);
}

export function postToStatefulHttp1() {
  const url = 'http://localhost:3000/api/metrics'; // stateful_http1
  const res = http.post(url, makePayload(), { headers: { 'Content-Type': 'application/json' }});
  check(res, { 'status 2xx/202': (r) => r.status === 202 || r.status === 201 || r.status === 200 });
  sleep(0.2);
}

export function postToStatelessHttp2() {
  const url = 'https://localhost:7000/api/metrics'; // stateless http2 (https)
  const res = http.post(url, makePayload(), { headers: { 'Content-Type': 'application/json' }, tlsAuth: [{ domains: ['localhost'], insecureSkipTLSVerify: true }]});
  check(res, { 'status 2xx': (r) => r.status === 201 || r.status === 200 });
  sleep(0.2);
}

export function postToStatefulHttp2() {
  const url = 'https://localhost:7000/api/metrics'; // stateful http2 (https)
  const res = http.post(url, makePayload(), { headers: { 'Content-Type': 'application/json' }, tlsAuth: [{ domains: ['localhost'], insecureSkipTLSVerify: true }]});
  check(res, { 'status 2xx/202': (r) => r.status === 202 || r.status === 201 || r.status === 200 });
  sleep(0.2);
}
