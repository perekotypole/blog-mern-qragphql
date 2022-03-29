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

export const User = mongoose.model('User', userSchema, 'users')
export const Topic = mongoose.model('Topic', topicSchema, 'topics')
export const Publication = mongoose.model('Publication', publicationSchema, 'publications')

export const UserBan = mongoose.model('UserBan', userBanSchema, 'user_bans')
export const Following = mongoose.model('Following', followingSchema, 'followings')
export const UserReport = mongoose.model('UserReport', userReportSchema, 'user_reports')
export const SavedPublication = mongoose.model('SavedPublication', savedPublicationSchema, 'saved')

export const Comment = mongoose.model('Comment', commentSchema, 'comments')
export const CommentReaction = mongoose.model('CommentReaction', commentReactionSchema, 'comment_reactions')
export const PublicationBan = mongoose.model('PublicationBan', publicationBanSchema, 'publication_bans')
export const PublicationReaction = mongoose.model('PublicationReaction', publicationReactionSchema, 'publication_ractions')
export const PublicationReport = mongoose.model('PublicationReport', publicationReportSchema, 'publication_reports')
