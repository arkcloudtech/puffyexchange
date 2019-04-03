// eslint-disable
// this is an auto generated file. This will be overwritten

export const getCommentsOnPost = `query GetCommentsOnPost($postId: String!) {
  getCommentsOnPost(postId: $postId) {
    id
    postId
    author
    content
    upvotes
    downvotes
  }
}
`;
export const getNumberOfCommentsOnPost = `query GetNumberOfCommentsOnPost($postId: String!) {
  getNumberOfCommentsOnPost(postId: $postId)
}
`;
export const getCommentsByAuthor = `query GetCommentsByAuthor($author: String!) {
  getCommentsByAuthor(author: $author) {
    id
    postId
    author
    content
    upvotes
    downvotes
  }
}
`;
export const getPost = `query GetPost($id: String!) {
  getPost(id: $id) {
    id
    author
    content
    views
    comments {
      id
      postId
      author
      content
      upvotes
      downvotes
    }
  }
}
`;
export const getPostsByAuthor = `query GetPostsByAuthor($author: String!) {
  getPostsByAuthor(author: $author) {
    id
    author
    content
    views
    comments {
      id
      postId
      author
      content
      upvotes
      downvotes
    }
  }
}
`;
