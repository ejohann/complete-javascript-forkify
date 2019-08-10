export default class Likes{
    constructor(){
        this.likes = [];
      }
    
    addLike(id, title, author, image){
        const like = {
            id,
            title,
            author,
            image
          };
        
          this.likes.push(like);

          //persist data to localstorage
          this.persistData();

          return like;
      }

    deleteLike(id) {
          const index = this.likes.findIndex(el => el.id === id);
          this.likes.splice(index, 1);

          //persist data to localstorage
          this.persistData();
      }

    isLiked(id){
        return this.likes.findIndex(el => el.id === id) !== -1;
      }

    getTotalLikes(){
        return this.likes.length;
      }

    persistData(){
        localStorage.setItem('likes', JSON.stringify(this.likes));
      }
}