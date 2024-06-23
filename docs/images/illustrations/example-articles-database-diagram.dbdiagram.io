// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table users {
  id integer [primary key]
  username varchar
  name integer 
  privacy boolean
  theme varchar
  locale varchar
  biography text
  links json
  email_verified_at timestamp
  deleted_at timestamp
  created_at timestamp
  updated_at timestamp
}

Table follows {
  followee_id integer
  follower_id integer
  started_at timestamp
  ended_at timestamp
  created_at timestamp
  updated_at timestamp

  indexes {
    (followee_id, follower_id) [pk] // composite primary key
  }
}

Table reactions {
  id integer [primary key]
  reactionable_id integer
  reactionable_type varchar
  user_id integer
  reaction integer
  created_at timestamp
  updated_at timestamp
}

Table abuse_reports {
  id integer [primary key]
  reportable_id integer
  reportable_type varchar
  user_id integer
  ip_address string
  type string
  message text
  reply text
  replied_at timestamp
  created_at timestamp
  updated_at timestamp
}

Table articles {
  id integer [primary key]
  user_id integer
  short_link_code varchar
  slug varchar
  banner_url integer
  title varchar
  subtitle varchar
  content mediumtext
  language varchar
  reading_time integer
  keywords json
  published_at timestamp
  deleted_at timestamp
  created_at timestamp
  updated_at timestamp
}

Table media {
  id integer [primary key]
  user_id integer
  disk string
  url string
  path string
  created_at timestamp
  updated_at timestamp
}

Table comments {
  id integer [primary key]
  comment_id integer
  user_id integer
  article_id integer
  content text
  approved_at timestamp
  deleted_at timestamp
  created_at timestamp
  updated_at timestamp
}

Table tags {
  id integer [primary key]
  user_id integer
  slug varchar
  articles_count integer
  deleted_at timestamp
  created_at timestamp
  updated_at timestamp
}

Table article_tag {
  article_id integer
  tag_id integer
}

Table bookmarks {
  article_id integer
  user_id integer
  created_at timestamp
}

Table reads {
  id integer
  article_id integer
  user_id integer
  share_id integer
  ip_address string
  created_at timestamp
  updated_at timestamp
}

Table shares {
  id integer
  article_id integer
  user_id integer
  medium integer
  ip_address string
  created_at timestamp
  updated_at timestamp
}

Table article_media {
  article_id integer
  media_id integer
}


Ref: "articles"."id" < "comments"."article_id"

Ref: "users"."id" < "comments"."user_id"

Ref: "users"."id" < "articles"."user_id"

Ref: "articles"."id" < "article_tag"."article_id"

Ref: "tags"."id" < "article_tag"."tag_id"

Ref: "users"."id" < "follows"."followee_id"

Ref: "users"."id" < "follows"."follower_id"

Ref: "users"."id" < "reactions"."user_id"

Ref: "articles"."id" < "article_media"."article_id"

Ref: "media"."id" < "article_media"."media_id"

Ref: "users"."id" < "media"."user_id"

Ref: "articles"."id" < "reads"."article_id"

Ref: "users"."id" < "reads"."user_id"

Ref: "articles"."id" < "bookmarks"."article_id"

Ref: "users"."id" < "bookmarks"."user_id"

Ref: "users"."id" < "tags"."user_id"

Ref: "users"."id" < "abuse_reports"."user_id"

Ref: "users"."id" < "shares"."user_id"

Ref: "articles"."id" < "shares"."article_id"