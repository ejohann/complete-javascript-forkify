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
          return like;
      }

}