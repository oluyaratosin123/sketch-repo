const counter = (allBokumon) => allBokumon.length;

const commentCounter = (comments, title, list) => {
    if(comments.length >= 1) {
        title.innerHTML = `Comments (${comments.length})`;
    }else{
        title.innerHTML = 'Comments (0)';
        list.innerHTML = 'No comments yet!...';
    }
};
export { counter, commentCounter };