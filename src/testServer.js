/* eslint-disable import/no-extraneous-dependencies */

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import config from './config';

const baseUrl = config.apiBaseUrl;

const server = setupServer(
  rest.get(`${baseUrl}/users`, async (req, res, ctx) => res(ctx.json({
    users: [
      {
        id: 1,
        displayName: 'hong',
        about: '저는 이런 사람입니다',
        points: 100,
        realName: '홍길동',
        imageUrl: 'https://www.google.com/image.jpg',
        countOfLikes: 20,
        tags: [{ name: 'Web' }],
      },
      {
        id: 2,
        displayName: 'hong2',
        about: '저는 이런 사람입니다',
        points: 100,
        realName: '홍길동',
        imageUrl: 'https://www.google.com/image.jpg',
        countOfLikes: 20,
        tags: [{ name: 'Web' }],
      },
    ],
  }))),

  rest.get(`${baseUrl}/users/count`, async (req, res, ctx) => {
    const email = req.url.searchParams.get('email');

    if (email === 'exist@email.com') {
      return res(ctx.json({
        count: 1,
      }));
    }

    return res(ctx.json({
      count: 0,
    }));
  }),

  rest.get(`${baseUrl}/users/me`, async (req, res, ctx) => res(ctx.json({
    id: 1,
    displayName: 'hong',
    about: '저는 이런 사람입니다',
    points: 100,
    realName: '홍길동',
    imageUrl: 'https://www.google.com/image.jpg',
    countOfLikes: 20,
    tags: [{ name: 'Web' }],
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
    const status = req.url.searchParams.get('status');

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
            likeUserIds: [],
            selectedAnswerId: null,
            hits: 3,
            createdAt: '2022-12-21T19:05:30.574542',
            updatedAt: '2022-12-21T19:05:30.574542',
            author: { id: 1, displayName: '홍길동' },
          },
          {
            id: 2,
            status: 'open',
            title: 'CORS 에러가 발생합니다.',
            body: '서버 배포 후 CORS에러가 발생합니다.',
            tags: [{ name: 'Web' }],
            points: 10,
            likeUserIds: [{ id: 11 }],
            selectedAnswerId: null,
            hits: 3,
            createdAt: '2022-12-21T19:05:30.574542',
            updatedAt: '2022-12-21T19:05:30.574542',
            author: { id: 1, displayName: '홍길동' },
          },
        ],
      }));
    }

    return res(ctx.json({
      questions: [
        {
          id: 3,
          status: 'closed',
          title: 'No \'Access-Control-Allow-Origin\'',
          body: '서버 배포 후 CORS에러가 발생합니다.',
          tags: [{ name: 'Web' }],
          points: 10,
          likeUserIds: [{ id: 11 }],
          selectedAnswerId: 1,
          hits: 3,
          createdAt: '2022-12-21T19:05:30.574542',
          updatedAt: '2022-12-21T19:05:30.574542',
          author: { id: 1, displayName: '홍길동' },
        },
        {
          id: 4,
          status: 'closed',
          title: 'CORS 에러가 발생합니다.',
          body: '서버 배포 후 CORS에러가 발생합니다.',
          tags: [{ name: 'Web' }],
          points: 10,
          likeUserIds: [{ id: 11 }],
          selectedAnswerId: 2,
          hits: 3,
          createdAt: '2022-12-21T19:05:30.574542',
          updatedAt: '2022-12-21T19:05:30.574542',
          author: { id: 1, displayName: '홍길동' },
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

  rest.get(`${baseUrl}/questions/1`, async (req, res, ctx) => res(ctx.json({
    id: 1,
    status: 'open',
    title: 'No \'Access-Control-Allow-Origin\'',
    body: '서버 배포 후 CORS에러가 발생합니다.',
    tags: [{ name: 'Web' }],
    points: 10,
    likeUserIds: [],
    selectedAnswerId: null,
    hits: 3,
    createdAt: '2022-12-21T19:05:30.574542',
    updatedAt: '2022-12-21T19:05:30.574542',
    author: { id: 1, displayName: '홍길동' },
  }))),

  rest.patch(`${baseUrl}/questions/1`, async (req, res, ctx) => {
    const {
      answerId,
    } = await req.json();

    if (!answerId) {
      return res(
        ctx.status(400),
      );
    }

    return res(
      ctx.status(204),
    );
  }),

  rest.put(`${baseUrl}/questions/1`, async (req, res, ctx) => {
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

  rest.delete(`${baseUrl}/questions/1`, async (req, res, ctx) => {
    const authorization = req.headers.get('Authorization');

    if (!authorization) {
      return res(
        ctx.status(400),
      );
    }

    return res();
  }),

  rest.patch(`${baseUrl}/questions/1/likeUserIds`, async (req, res, ctx) => {
    const authorization = req.headers.get('Authorization');

    if (!authorization) {
      return res(
        ctx.status(400),
      );
    }

    return res(
      ctx.json({
        likeUserIds: [{ id: 1 }],
      }),
    );
  }),

  rest.get(`${baseUrl}/answers`, async (req, res, ctx) => {
    const questionId = req.url.searchParams.get('questionId');

    if (!questionId) {
      return res(
        ctx.status(400),
      );
    }

    return res(ctx.json({
      answers: [
        {
          id: 1,
          body: '헤더를 추가해보세요',
          likeUserIds: [],
          createdAt: '2022-12-21T19:05:30.574542',
          updatedAt: '2022-12-21T19:05:30.574542',
          author: { id: 2, displayName: '동길홍' },
        },
      ],
    }));
  }),

  rest.get(`${baseUrl}/answers/1`, async (req, res, ctx) => res(ctx.json({
    id: 1,
    questionId: 1,
    body: '헤더를 추가해보세요',
    likeUserIds: [],
    createdAt: '2022-12-21T19:05:30.574542',
    updatedAt: '2022-12-21T19:05:30.574542',
    author: { id: 2, displayName: '동길홍' },
  }))),

  rest.get(`${baseUrl}/answers/2`, async (req, res, ctx) => res(ctx.json({
    id: 2,
    questionId: 2,
    body: '헤더를 추가해보세요',
    likeUserIds: [{ id: 11 }],
    createdAt: '2022-12-21T19:05:30.574542',
    updatedAt: '2022-12-21T19:05:30.574542',
    author: { id: 2, displayName: '동길홍' },
  }))),

  rest.post(`${baseUrl}/answers`, async (req, res, ctx) => {
    const {
      questionId, body,
    } = await req.json();

    if (questionId && body) {
      return res(ctx.json({
        id: 1,
      }));
    }

    return res(
      ctx.status(400),
    );
  }),

  rest.patch(`${baseUrl}/answers/1`, async (req, res, ctx) => {
    const { body } = await req.json();

    if (!body) {
      return res(
        ctx.status(400),
      );
    }

    return res(
      ctx.status(200),
    );
  }),

  rest.patch(`${baseUrl}/answers/1/likeUserIds`, async (req, res, ctx) => {
    const authorization = req.headers.get('Authorization');

    if (!authorization) {
      return res(
        ctx.status(400),
      );
    }

    return res(
      ctx.json({
        likeUserIds: [{ id: 1 }],
      }),
    );
  }),

  rest.post(`${baseUrl}/acknowledgements`, async (req, res, ctx) => {
    const {
      questionId, answerId, points,
    } = await req.json();

    if (questionId && answerId && points < 100) {
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
