import { Publication } from '../../database'
import { publicationModel } from '../../models'

const resolvers = {
  ContentData: {
    __resolveType(obj, context, info){
      if(obj.list){
        return 'List';
      }
      if(obj.image){
        return 'Images';
      }
      if(obj.data){
        return 'Text';
      }
      return null;
    },
  },
  Query: {
    latestPublications: (root: any) => new Promise((resolve, reject) => {
      Publication.find(
        null,
        null,
        { sort: { 'createdAt' : -1 } },
      ).populate (['user', 'topic']).exec((err: any, res: any) => {
        if (err) return reject(err)
        
        const result = res
        
        resolve(result.map((el: any) => {
          let text = null
          let image = null

          el.content.forEach((element: any) => {
            
            if (!text && element.template === 'paragraph') {
              text = `${element?.data.data.slice(0, 120)}...`
            } 
            if (!image && element.template === 'image') {
              image = element.data
            } 
            
            if (text && image) return
          });

          delete el.content
  
          return({
            ...el._doc,
            text,
            image,
          });
        }))
      })
    }),
  },
}
export default resolvers
