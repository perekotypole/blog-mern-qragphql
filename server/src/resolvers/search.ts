import { Publication, User } from '../database'
import { publicationModel, userModel } from '../models'

const resolvers = {
  Query: {
    search: async (root: any, { query }) => {
      try {
        const resultPublications = (await Publication.find(
          { $text: { $search: query }},
          { score : { $meta: "textScore" } }
        )
        .sort({ score : { $meta : 'textScore' } })
        .populate (['user', 'topic']))
        .map((el) => {
          const text = `${JSON.parse(el.content).blocks.find(element => element.type === 'unstyled' && element.text)?.text?.slice(0, 100)}...`
          const image = (Object.values(JSON.parse(el.content).entityMap).find(element => (element as any).type === 'IMAGE') as any)?.data?.src
  
          delete el.content
  
          return({
            ...el._doc,
            text,
            image,
          });
        })
        
        const resultUsers = await User.aggregate([
          { $match: { username: { $regex: `${query}`}}},
          { $project: {
            username: true,
            role: true,
            image: true,
            bio: true,
            regex_match: { $eq: ['$username', `${query}`]}
          }},
          { $sort: { regex_match: -1} }
        ])
  
        return {
          publications: resultPublications,
          users: resultUsers,
        }
      } catch (err) {
        console.error(`Error: ${err}`)
      }
    }
  },
}
export default resolvers
