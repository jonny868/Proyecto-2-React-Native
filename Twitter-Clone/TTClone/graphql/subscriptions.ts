/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      username
      email
      name
      image
      tweets {
        items {
          id
          content
          userID
          image
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      username
      email
      name
      image
      tweets {
        items {
          id
          content
          userID
          image
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      username
      email
      name
      image
      tweets {
        items {
          id
          content
          userID
          image
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTweet = /* GraphQL */ `
  subscription OnCreateTweet {
    onCreateTweet {
      id
      content
      userID
      image
      user {
        id
        username
        email
        name
        image
        tweets {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTweet = /* GraphQL */ `
  subscription OnUpdateTweet {
    onUpdateTweet {
      id
      content
      userID
      image
      user {
        id
        username
        email
        name
        image
        tweets {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTweet = /* GraphQL */ `
  subscription OnDeleteTweet {
    onDeleteTweet {
      id
      content
      userID
      image
      user {
        id
        username
        email
        name
        image
        tweets {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
