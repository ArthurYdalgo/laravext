// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table users {
  id integer [primary key]
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

Table followers {
  id integer [primary key]
  followee_id integer
  follower_id integer
  started_at timestamp
  ended_at timestamp
  created_at timestamp
  updated_at timestamp
}

Table reactions {
  id integer [primary key]
  reactable_id integer
  reactable_type varchar
  user_id integer
  reaction integer
  created_at timestamp
  updated_at timestamp
}

Table articles {
  id integer [primary key]
  user_id integer
  banner_url integer
  title varchar
  subtitle varchar
  content mediumtext
  language varchar
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
  deleted_at timestamp
  created_at timestamp
  updated_at timestamp
}

Table article_tag {
  article_id integer
  tag_id integer
}

Table bookmarks {
  id integer
  article_id integer
  user_id integer
  created_at timestamp
  updated_at timestamp
}

Table reads {
  id integer
  article_id integer
  user_id integer
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

Ref: "users"."id" < "followers"."followee_id"

Ref: "users"."id" < "followers"."follower_id"

Ref: "users"."id" < "reactions"."user_id"

Ref: "articles"."id" < "article_media"."article_id"

Ref: "media"."id" < "article_media"."media_id"

Ref: "users"."id" < "media"."user_id"

Ref: "articles"."id" < "reads"."article_id"

Ref: "users"."id" < "reads"."user_id"

Ref: "articles"."id" < "bookmarks"."article_id"

Ref: "users"."id" < "bookmarks"."user_id"

Ref: "users"."id" < "tags"."user_id"