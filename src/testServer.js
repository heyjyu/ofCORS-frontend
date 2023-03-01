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

  rest.patch(`${baseUrl}/users/me`, async (req, res, ctx) => {
    const { displayName } = await req.json();
    if (displayName.length >= 3) {
      return res(ctx.status(204));
    }

    return res(ctx.status(400));
  }),

  rest.get(`${baseUrl}/users/1`, async (req, res, ctx) => res(ctx.json({
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

  rest.post(`${baseUrl}/session/trial`, async (req, res, ctx) => res(
    ctx.json({
      accessToken: 'ACCESS.TOKEN',
    }),
  )),

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
            scrapUserIds: [],
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
            scrapUserIds: [],
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
          scrapUserIds: [],
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
          scrapUserIds: [],
          selectedAnswerId: 2,
          hits: 3,
          createdAt: '2022-12-21T19:05:30.574542',
          updatedAt: '2022-12-21T19:05:30.574542',
          author: { id: 1, displayName: '홍길동' },
        },
      ],
    }));
  }),

  rest.get(`${baseUrl}/question-previews`, async (req, res, ctx) => {
    const userId = req.url.searchParams.get('userId');

    if (!userId) {
      return res(
        ctx.status(400),
      );
    }

    return res(ctx.json({
      questionPreviews: [
        {
          id: 3,
          status: 'closed',
          title: 'No \'Access-Control-Allow-Origin\'',
          body: '서버 배포 후 CORS에러가 발생합니다.',
          tags: [{ name: 'Web' }],
          points: 10,
          likeUserIds: [{ id: 11 }],
          scrapUserIds: [],
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
          scrapUserIds: [],
          selectedAnswerId: 2,
          hits: 3,
          createdAt: '2022-12-21T19:05:30.574542',
          updatedAt: '2022-12-21T19:05:30.574542',
          author: { id: 1, displayName: '홍길동' },
        },
      ],
    }));
  }),

  rest.get(`${baseUrl}/scrapped-questions`, async (req, res, ctx) => {
    const authorization = req.headers.get('Authorization');

    if (!authorization) {
      return res(
        ctx.status(400),
      );
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
          scrapUserIds: [{ id: 1 }],
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
          scrapUserIds: [{ id: 1 }],
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
    scrapUserIds: [],
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

  rest.patch(`${baseUrl}/questions/1/scrapUserIds`, async (req, res, ctx) => {
    const authorization = req.headers.get('Authorization');

    if (!authorization) {
      return res(
        ctx.status(400),
      );
    }

    return res(
      ctx.json({
        scrapUserIds: [{ id: 1 }],
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

  rest.get(`${baseUrl}/answer-previews`, async (req, res, ctx) => {
    const userId = req.url.searchParams.get('userId');

    if (!userId) {
      return res(
        ctx.status(400),
      );
    }

    return res(ctx.json({
      answerPreviews: [
        {
          id: 1,
          question: {
            id: 1,
            title: 'CORS에러가 발생합니다.',
          },
          likeUserIds: [{ id: 3 }],
          body: '헤더를 추가해보세요',
          author: { id: 2, displayName: '동길홍' },
          createdAt: '2022-12-21T19:05:30.574542',
          updatedAt: '2022-12-21T19:05:30.574542',
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

  rest.post('https://api.cloudinary.com/v1_1/ofcors-image-server/image/upload/', async (req, res, ctx) => res(ctx.json({
    url: 'image.url.com',
  }))),

  rest.post(`${baseUrl}/charges`, async (req, res, ctx) => {
    const {
      quantity,
    } = await req.json();

    if (quantity > 0) {
      return res(
        ctx.json('https://redirect.url.com'),
      );
    }

    return res(
      ctx.status(400),
    );
  }),

  rest.get(`${baseUrl}/charges/kakaoPaySuccess`, async (req, res, ctx) => res(
    ctx.json({
      quantity: 1,
      partner_order_id: 'id',
      approved_at: '2022-12-21T19:05:30.574542',
      amount: {
        total: 1000,
      },
    }),
  )),

  rest.post(`${baseUrl}/exchanges`, async (req, res, ctx) => {
    const {
      quantity, bank, accountNumber,
    } = await req.json();

    if (quantity < 500) {
      return res(
        ctx.status(400),
      );
    }

    if (!bank || !accountNumber) {
      return res(
        ctx.status(400),
      );
    }

    return res(
      ctx.json({
        id: 1,
      }),
    );
  }),

  rest.post(`${baseUrl}/account/verify`, async (req, res, ctx) => {
    const {
      bank, accountNumber,
    } = await req.json();

    if (!bank || !accountNumber) {
      return res(
        ctx.json({
          validated: false,
        }),
      );
    }

    return res(
      ctx.json({
        validated: true,
      }),
    );
  }),

  rest.get(`${baseUrl}/exchanges`, async (req, res, ctx) => {
    const authorization = req.headers.get('Authorization');

    if (!authorization) {
      return res(
        ctx.status(400),
      );
    }

    return res(
      ctx.json({
        exchanges: [
          {
            id: 1,
            createdAt: '2022-12-21T19:05:30.574542',
            quantity: 500,
            totalAmount: 30000,
            status: 'processing',
          },
          {
            id: 2,
            createdAt: '2022-12-21T19:05:30.574542',
            quantity: 500,
            totalAmount: 30000,
            status: 'processing',
          },
        ],
      }),
    );
  }),

  rest.patch(`${baseUrl}/users/me/name`, async (req, res, ctx) => {
    const {
      name,
    } = await req.json();

    if (!name) {
      return res(
        ctx.status(400),
      );
    }

    return res(
      ctx.status(204),
    );
  }),
);

export default server;
