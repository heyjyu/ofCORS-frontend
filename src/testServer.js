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

  rest.get(`${baseUrl}/users/me`, async (req, res, ctx) => res(ctx.json({
    displayName: 'hong',
    about: '저는 이런 사람입니다',
    points: 100,
    realName: '홍길동',
    imageUrl: 'https://www.google.com/image.jpg',
  }))),

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

  rest.post(`${baseUrl}/session`, async (req, res, ctx) => {
    const {
      email, password,
    } = await req.json();

    if (email === 'test@example.com'
    && password === 'Abcdef1!') {
      return res(
        ctx.json({
          accessToken: 'ACCESS.TOKEN',
        }),
      );
    }

    return res(
      ctx.status(400),
    );
  }),

  rest.get(`${baseUrl}/questions`, async (req, res, ctx) => {
    const { status } = req.params;

    if (status === 'open') {
      return res(ctx.json({
        questions: [
          {
            id: 1,
            status: 'open',
            title: 'No \'Access-Control-Allow-Origin\'',
            body: '서버 배포 후 CORS에러가 발생합니다.',
            tags: [{ name: 'Web' }],
            points: 10,
            likeUserIds: [11],
            hits: 3,
            createdAt: '2022-12-21T19:05:30.574542',
            updatedAt: '2022-12-21T19:05:30.574542',
            authorId: 1,
          },
          {
            id: 2,
            status: 'open',
            title: 'CORS 에러가 발생합니다.',
            body: '서버 배포 후 CORS에러가 발생합니다.',
            tags: [{ name: 'Web' }],
            points: 10,
            likeUserIds: [11],
            hits: 3,
            createdAt: '2022-12-21T19:05:30.574542',
            updatedAt: '2022-12-21T19:05:30.574542',
            authorId: 1,
          },
        ],
      }));
    }

    return res(ctx.json({
      questions: [
        {
          id: 1,
          status: 'closed',
          title: 'No \'Access-Control-Allow-Origin\'',
          body: '서버 배포 후 CORS에러가 발생합니다.',
          tags: [{ name: 'Web' }],
          points: 10,
          likeUserIds: [11],
          hits: 3,
          createdAt: '2022-12-21T19:05:30.574542',
          updatedAt: '2022-12-21T19:05:30.574542',
          authorId: 1,
        },
        {
          id: 2,
          status: 'closed',
          title: 'CORS 에러가 발생합니다.',
          body: '서버 배포 후 CORS에러가 발생합니다.',
          tags: [{ name: 'Web' }],
          points: 10,
          likeUserIds: [11],
          hits: 3,
          createdAt: '2022-12-21T19:05:30.574542',
          updatedAt: '2022-12-21T19:05:30.574542',
          authorId: 1,
        },
      ],
    }));
  }),

  rest.post(`${baseUrl}/questions`, async (req, res, ctx) => {
    const {
      title, body,
    } = await req.json();

    if (title && body) {
      return res(ctx.json({
        id: 1,
      }));
    }

    return res(
      ctx.status(400),
    );
  }),
);

export default server;
