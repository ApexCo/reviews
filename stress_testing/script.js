import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1m', target: 100 },
    { duration: '2m', target: 200 },
    { duration: '5m', target: 500 },
    { duration: '2m', target: 1000 },
    { duration: '5m', target: 1500 },
    { duration: '2m', target: 1750 },
    { duration: '5m', target: 1000 },
    { duration: '2m', target: 500 },
    { duration: '5m', target: 100 },
  ],
};

var randHome = Math.floor((Math.random() * 1000000) + 1);
export default function () {
  let res = http.get(`http://localhost:3001/api/reviews/${randHome}/`);
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
