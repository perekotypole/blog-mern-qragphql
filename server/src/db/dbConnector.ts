const mongoose = require('mongoose')
const { environment } = require('../config/config')

const env = process.env.NODE_ENV || 'development'

const {
  publicationBanSchema,
  commentReactionSchema,
  commentSchema,
  publicationSchema,
  publicationReactionSchema,
  publicationReportSchema,
  topicSchema,

  userBanSchema,
  followingSchema,
  userReportSchema,
  savedPublicationSchema,
  userSchema,
} = require('./schema')

mongoose.connect(environment[env].dbString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

const db = mongoose.connection
db.on('error', () => {
  console.error('Error while connecting to DB')
})

export const user = mongoose.model('User', userSchema, 'users')
export const topic = mongoose.model('Topic', topicSchema, 'topics')
export const publication = mongoose.model('Publication', publicationSchema, 'publications')

export const userBan = mongoose.model('UserBan', userBanSchema, 'user_bans')
export const following = mongoose.model('Following', followingSchema, 'followings')
export const userReport = mongoose.model('UserReport', userReportSchema, 'user_reports')
export const savedPublication = mongoose.model('SavedPublication', savedPublicationSchema, 'saved')

export const comment = mongoose.model('Comment', commentSchema, 'comments')
export const commentReaction = mongoose.model('CommentReaction', commentReactionSchema, 'comment_reactions')
export const publicationBan = mongoose.model('PublicationBan', publicationBanSchema, 'publication_bans')
export const publicationReaction = mongoose.model('PublicationReaction', publicationReactionSchema, 'publication_ractions')
export const publicationReport = mongoose.model('PublicationReport', publicationReportSchema, 'publication_reports')
