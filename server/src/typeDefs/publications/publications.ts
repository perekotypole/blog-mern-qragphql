import { gql } from 'apollo-server-express'

const typeDefs = gql`
  enum Templates {
    paragraph,
    list,
    tabel,
    image,
    subtitle,
  }

  type Text {
    data: String
  }

  type List {
    list: [String]
  }

  type Images {
    image: String,
    description: String
  }

  union ContentData = Text | List | Images
  
  type Content {
    template: Templates,
    data: ContentData
  }

  type ShortPublication {
    _id: ID,
    title: String,
    user: User,
    text: String,
    image: Images,
    createdAt: String,
    views: Int,
    topic: Topic,
  }

  type Publication {
    _id: ID,
    title: String,
    user: User,
    content: [Content],
    createdAt: String,
    views: Int,
    topic: Topic,
  }
  
  extend type Query {
    latestPublications: [ShortPublication]
  }
`
export default typeDefs
