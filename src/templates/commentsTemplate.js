import { html, nothing } from "../../node_modules/lit-html/lit-html.js";

export const commentsTemplate = (commentsInfo, movieId,  user, ctx,userEmail,addComment) => html`
<div class="comments">
    <ul>
        ${commentsInfo.comments.length > 0
        ? html`${commentsInfo.comments.map(comment => commentCard(comment))}`
        : html`<p id="no-comments">No comments yet..</p>`
        }
    </ul>
    ${pager(commentsInfo.page, commentsInfo.pages, movieId)}
</div>
${user
 ? commentForm(ctx,userEmail,addComment)
 : nothing
}
`;

const commentForm = (ctx,userEmail,addComment) => html`
<article class="new-comment">  
    <form id="commentForm" @submit = ${function(e){addComment(e, ctx, userEmail)}}>
        <textarea name="content" placeholder="Type comment"></textarea>
        <input id="commentBtn" type="submit" value="Add comment">
    </form>
</article>
`;

const commentCard = (comment) => html`
<li class="comment">
    <header>${comment.userEmail}</header>
    <p>${comment.content}</p>
</li>
`;

const pager = (page,totalPages, movieId) => html`
    ${page === 1
    ? nothing
    :html`<a class="pager-comment" href="/details/${movieId}?page=${page - 1}">&lt;Prev</a>`
    }
    ${totalPages > 0
    ? html`<span id="comments-page-indicator">${`Page ${page} of ${totalPages}`}</span>`
    : nothing
    }
    ${page + 1 > totalPages
      ? nothing
      : html`<a class="pager-comment" href="/details/${movieId}?page=${page + 1}">Next&gt;</a>` 
    }
`;