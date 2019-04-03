// eslint-disable
// this is an auto generated file. This will be overwritten

export const addedCommentOnPost = `subscription AddedCommentOnPost($postId: String!) {
  addedCommentOnPost(postId: $postId) {
    id
    postId
    author
    content
    upvotes
    downvotes
  }
}
`;
export const addedCommentByAuthor = `subscription AddedCommentByAuthor($author: String!) {
  addedCommentByAuthor(author: $author) {
    id
    postId
    author
    content
    upvotes
    downvotes
  }
}
`;
export const addedPostByAuthor = `subscription AddedPostByAuthor($author: String!) {
  addedPostByAuthor(author: $author) {
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
