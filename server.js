// express 라이브러리로부터 express 함수 임포트
const express = require("express");
// graphql 라이브러리로부터 buildSchema 함수 임포트
// buildSchema 함수를 활용하여 GprahQL 스키마를 생성
// 문자열 형태의 스키마를 정의하여 GraphQWL 스키마 객체로 변환
const { buildSchema } = require("graphql");
// express-graphql 라이브러리로부터 graphqlHTTP 함수 임포트
// graphqlHTTP 함수를 활용하여 express 서버에 GraphQL 기능을 추가 (express 서버에서 graphql 요청을 처리하기 위한 미들웨어)
const { graphqlHTTP } = require("express-graphql");

// express 함수 호출로 app 객체 생성
const app = express();
const port = 4000;

// buildSchema 함수를 사용하여 문자열 형태의 스키마 정의 및 GraphQL 스키마 객체로 변환
// 형식 정의에 들어가는 "!"는 필수값을 의미
const schema = buildSchema(`
  type Query {
    posts: [Post]
    comments: [Comment]
  }

  type Post {
    id: ID!
    title: String!
    description: String!
    comments: [Comment]
  }

  type Comment {
    id: ID!
    text: String!
    likes: Int
  }
`);

// 리졸버 객체 정의
// 리졸버(resolver) : GraphQL 쿼리를 처리하여 데이터를 반환하는 함수
const root = {
  posts: [
    {
      id: "post1",
      title: "It is a first post",
      description: "It is a first post description",
      comments: [
        {
          id: "comment1",
          text: "It is a first comment",
          likes: 1,
        },
      ],
    },
    {
      id: "posts2",
      title: "It is a second post",
      description: "It is a second post description",
      comments: [],
    },
  ],
  comments: [
    {
      id: "comment1",
      text: "It is a first comment",
      likes: 1,
    },
  ],
};

// use 메서드로 미들웨어 함수를 등록
// graphqlHTTP 미들웨어를 사용하여 GraphQL 스키마 및 리졸버 설정
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // graphiql : GraphQL API를 테스트할 수 있는 웹 기반의 툴
  })
);

// listen 메서드로 서버 실행
app.listen(port, () => {
  console.log(`${port}번 포트에서 서버 실행중`);
});
