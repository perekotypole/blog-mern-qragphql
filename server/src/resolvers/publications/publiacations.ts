import { Publication, SavedPublication } from '../../database'
import { publicationModel, savedPublicationModel } from '../../models'

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
          const text = `${JSON.parse(el.content).blocks.find(element => element.type === 'unstyled' && element.text)?.text?.slice(0, 100)}...`
          const image = (Object.values(JSON.parse(el.content).entityMap).find(element => (element as any).type === 'IMAGE') as any)?.data?.src

          delete el.content
  
          return({
            ...el._doc,
            text,
            image,
          });
        }))
      })
    }).catch(err => console.error(`Error: ${err}`)),
    profilePublications: (root: any, { userID }) => new Promise((resolve, reject) => {
      if (userID) return reject()

      Publication.find(
        { user: userID },
        null,
        { sort: { 'createdAt' : -1 } },
      ).populate (['user', 'topic']).exec((err: any, res: any) => {
        if (err) return reject(err)
        
        const result = res
        
        resolve(result.map((el: any) => {
          const text = `${JSON.parse(el.content).blocks.find(element => element.type === 'unstyled' && element.text)?.text?.slice(0, 100)}...`
          const image = (Object.values(JSON.parse(el.content).entityMap).find(element => (element as any).type === 'IMAGE') as any)?.data?.src
  
          return({
            ...el._doc,
            text,
            image,
          });
        }))
      })
    }).catch(err => console.error(`Error: ${err}`)),
    publication: (root: any, { id }, { userID }) => new Promise((resolve, reject) => {
      Publication.findById(id).populate(['user', 'topec']).exec((err: any, res: any) => {
        if (err) return reject(err)

        if (userID)
          return SavedPublication.findOne({ user: userID, publication: res._id }, (_err, _res) => {
            if (!err && !_res) return resolve({ ...res._doc, saved: false })

            resolve({ ...res._doc, saved: true })
          })

        return resolve(res)
      })
    }).catch(err => console.error(`Error: ${err}`)),
  },
  Mutation: {
    publish: (root: any, { data }, { userID }) => new Promise((resolve, reject) => {
      if (!userID) return reject()
      
      const { ...rest } = data
      const newPublishing = new Publication({ ...rest, user: userID })

      newPublishing.save((err: any, res: publicationModel) => {
        if (err) return reject(err)
        
        resolve(newPublishing._id)
      })
    }).catch(err => console.error(`Error: ${err}`)),
    addViews: (root: any, { id }) => new Promise((resolve, reject) => {
      Publication.findByIdAndUpdate(
        {_id :id},
        {$inc : {'views' : 1}},
        {returnDocument: 'after'},
        (err, res) => {
          if (err) return reject(err)
          if (!res) return reject()
          
          resolve(res?.views)
        }
      )
    }).catch(err => console.error(`Error: ${err}`)),
  }
}
export default resolvers
