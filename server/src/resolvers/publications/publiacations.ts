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
      try {
        Publication.find(
          null,
          null,
          { sort: { 'createdAt' : -1 } },
        ).populate (['user', 'topic']).exec((err: any, res: any) => {
          try {
            if (err) return reject(err)
  
            const result = res
       
            return resolve(result.map((el: any) => {
              let content = JSON.parse(el?.content)
              if (content && typeof content === 'string') content = JSON.parse(content)

              const text = `${content?.blocks?.find(element => element.type === 'unstyled' && element.text)?.text?.slice(0, 100) || ''}...`
              const image = (Object.values(content?.entityMap || []).find(element => (element as any).type === 'IMAGE') as any)?.data?.src
              
              delete el.content
      
              return({
                ...el._doc,
                text,
                image,
              });
            }))
          } catch (error) {
            reject(error)
          }
        })
      } catch (error) {
        reject(error)
      }
    }),

    profilePublications: (root: any, { userID }) => new Promise((resolve, reject) => {
      if (!userID) return reject()

      try {
        Publication.find(
          { user: userID },
          null,
          { sort: { 'createdAt' : -1 } },
        ).populate (['user', 'topic']).exec((err: any, res: any) => {
          if (err) return reject(err)    

          try {
            const result = res
  
            return resolve(result.map((el: any) => {    
              let content = JSON.parse(el?.content)
              if (content && typeof content === 'string') content = JSON.parse(content)

              const text = `${content?.blocks?.find(element => element.type === 'unstyled' && element.text)?.text?.slice(0, 100) || ''}...`
              const image = (Object.values(content?.entityMap || []).find(element => (element as any).type === 'IMAGE') as any)?.data?.src
      
              return({
                ...el._doc,
                text,
                image,
              });
            }))
          } catch (error) {
            reject(error)
          }
        })
      } catch (error) {
        reject(error)
      }
    }),

    publication: (root: any, { id }, { userID }) => new Promise((resolve, reject) => {
      try {
        Publication.findById(id).populate(['user', 'topic']).exec((err: any, res: any) => {
          if (err) return reject(err)

          let content = JSON.parse(res?.content)
          if (content && typeof content === 'string') content = JSON.parse(content)

          const result = {
            ...res._doc,
            content: JSON.stringify(content)
          }

          try {
            if (userID)
              return SavedPublication.findOne({ user: userID, publication: res._id }, (_err, _res) => {
                try {
                  if (!err && !_res) return resolve({ ...result, saved: false })
      
                  return resolve({ ...result, saved: true })
                } catch (error) {
                  reject(error)
                }
              })
    
            return resolve(result)
          } catch (error) {
            reject(error)
          }
        })
      } catch (error) {
        reject(error)
      }
    }),
  },

  Mutation: {
    publish: (root: any, { data }, { userID }) => new Promise((resolve, reject) => {
      if (!userID) return reject()

      try {
        const { ...rest } = data
        const newPublishing = new Publication({ ...rest, user: userID })
  
        newPublishing.save((err: any, res: publicationModel) => {
          try {
            if (err) return reject(err)
            return resolve(newPublishing._id)
          } catch (error) {
            reject(error)
          }
        })
      } catch (error) {
        reject(error)
      }
    }),

    updatePublish: (root: any, { id, data }, { userID }) => new Promise((resolve, reject) => {
      if (!userID) return reject()

      try {
const { ...rest } = data
const user = data.user && userID

Publication.updateOne(
  { _id: id },
  { ...rest, user },
  (err: any, res: publicationModel) => {
    try {
      if (err) return reject(err)
      return resolve(true)
    } catch (error) {
      reject(error)
    }
  }
)
      } catch (error) {
        reject(error)
      }
    }),

    addViews: (root: any, { id }) => new Promise((resolve, reject) => {
      try {
        Publication.findByIdAndUpdate(
          {_id :id},
          {$inc : {'views' : 1}},
          {returnDocument: 'after'},
          (err, res) => {
            try {
              if (err) return reject(err)
              if (!res) return reject()
              
              return resolve(res?.views)
            } catch (error) {
              reject(error)
            }
          }
        )
      } catch (error) {
        reject(error)
      }
    }),

    removePublication: (root: any, { id }, { userID }) => new Promise((resolve, reject) => {
      try {
        Publication.findByIdAndDelete(id,
          (err, res) => {
            try {
              if (err) return reject(err)
              return resolve(true)
            } catch (error) {
              reject(error)
            }
          }
        )
      } catch (error) {
        reject(error)
      }
    }),
  }
}
export default resolvers
