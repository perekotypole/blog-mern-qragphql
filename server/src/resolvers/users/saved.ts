import { SavedPublication } from '../../database'
import { savedPublicationModel } from '../../models'

const resolvers = {
  Query: {
    saved: (root: any, data, { userID }) => new Promise((resolve, reject) => {
      if (!userID) return reject()

      try {
        SavedPublication.find({ user: userID }).populate({
          path : 'publication',
          populate : {
            path : 'user'
          }
        }).populate('user').exec((err, res) => {
          try {
            if (err) return reject(err)
            
            return resolve(res.map(el => {
              const result = el.publication
    
              const text = `${JSON.parse(result.content).blocks.find(element => element.type === 'unstyled' && element.text)?.text?.slice(0, 100)}...`
              const image = (Object.values(JSON.parse(result.content).entityMap).find(element => (element as any).type === 'IMAGE') as any)?.data?.src
    
              delete result.content
      
              return({ ...result._doc, image, text })
            }))
          } catch (error) {
            reject(error)
          }
        })
              
      } catch (error) {
        reject(error)
      }
  
    })
  },

  Mutation: {
    toggleSaved: (root: any, { publicationID }, { userID }) => new Promise((resolve, reject) => {
      try {
        SavedPublication.findOne({ user: userID, publication: publicationID }, (err, res: savedPublicationModel) => {
          try {
            if (err) return reject()
            
            if (res) {
              SavedPublication.findOneAndDelete({ user: userID, publication: publicationID }, (_err, _res) => {
                try {
                  if (_err) return reject()
                  return resolve (false)
              
                } catch (error) {
                  reject(error)
                }
              })
            } else {
              SavedPublication.create({ user: userID, publication: publicationID }, (_err, _res: savedPublicationModel) => {
                try {
                  if (_err) return reject()
                  return resolve (true)
              
                } catch (error) {
                  reject(error)
                }
              })
            }
              
          } catch (error) {
            reject(error)
          }
        })
              
      } catch (error) {
        reject(error)
      }
      if (!userID) return reject()

    })
  },
}
export default resolvers
