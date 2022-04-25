import { SavedPublication } from '../../database'
import { savedPublicationModel } from '../../models'

const resolvers = {
  Query: {
    saved: (root: any, data, { userID }) => new Promise((resolve, reject) => {
      if (!userID) return reject()
  
      SavedPublication.find({ user: userID }).populate({
        path : 'publication',
        populate : {
          path : 'user'
        }
      }).populate('user').exec((err, res) => {
        if (err) return reject(err)
        
        resolve(res.map(el => {
          const result = el.publication

          const text = `${JSON.parse(result.content).blocks.find(element => element.type === 'unstyled' && element.text)?.text?.slice(0, 100)}...`
          const image = (Object.values(JSON.parse(result.content).entityMap).find(element => (element as any).type === 'IMAGE') as any)?.data?.src

          delete result.content
  
          return({ ...result._doc, image, text })
        }))
      })
    }).catch(err => console.error(`Error: ${err}`))
  },
  Mutation: {
    toggleSaved: (root: any, { publicationID }, { userID }) => new Promise((resolve, reject) => {
      if (!userID) return reject()

      SavedPublication.findOne({ user: userID, publication: publicationID }, (err, res: savedPublicationModel) => {
        if (err) return reject()
        
        if (res) {
          SavedPublication.findOneAndDelete({ user: userID, publication: publicationID }, (_err, _res) => {
            if (_err) return reject()
            resolve (false)
          })
        } else {
          SavedPublication.create({ user: userID, publication: publicationID }, (_err, _res: savedPublicationModel) => {
            if (_err) return reject()
            resolve (true)
          })
        }
      })
    }).catch(err => console.error(`Error: ${err}`))
  },
}
export default resolvers
