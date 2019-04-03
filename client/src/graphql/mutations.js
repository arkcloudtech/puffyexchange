// eslint-disable
// this is an auto generated file. This will be overwritten

export const createComment = `mutation CreateComment($postId: String!, $author: String!, $content: String!) {
  createComment(postId: $postId, author: $author, content: $content) {
    id
    postId
    author
    content
    upvotes
    downvotes
  }
}
`;
export const upvoteComment = `mutation UpvoteComment($id: ID!) {
  upvoteComment(id: $id) {
    id
    postId
    author
    content
    upvotes
    downvotes
  }
}
`;
export const downvoteComment = `mutation DownvoteComment($id: ID!) {
  downvoteComment(id: $id) {
    id
    postId
    author
    content
    upvotes
    downvotes
  }
}
`;
export const createPost = `mutation CreatePost($author: String!, $content: String!) {
  createPost(author: $author, content: $content) {
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
export const incrementViewCount = `mutation IncrementViewCount($id: String!) {
  incrementViewCount(id: $id) {
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
