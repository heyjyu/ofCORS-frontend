/* eslint-disable import/no-extraneous-dependencies */

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import config from './config';

const baseUrl = config.apiBaseUrl;

const server = setupServer(
  rest.get(`${baseUrl}/users`, async (req, res, ctx) => {
    const countOnly = req.url.searchParams.get('countOnly');
    const email = req.url.searchParams.get('email');

    if (countOnly && email === 'exist@email.com') {
      return res(ctx.json({
        count: 1,
      }));
    }

    return res(ctx.json({
      count: 0,
    }));
  }),

  rest.post(`${baseUrl}/users`, async (req, res, ctx) => {
    const {
      displayName, email, password,
    } = await req.json();

    if (displayName === 'joo'
    && email === 'test@example.com'
    && password === 'Abcdef1!') {
      return res(
        ctx.json({
          id: 1,
          displayName: 'joo',
        }),
      );
    }

    return res(
      ctx.status(400),
    );
  }),
);

export default server;
