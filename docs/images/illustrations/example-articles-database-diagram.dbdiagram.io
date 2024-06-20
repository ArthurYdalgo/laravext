// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table users {
  id integer [primary key]
  name integer 
  privacy boolean
  theme varchar
  locale varchar
  email_verified_at timestamp
  created_at timestamp
  updated_at timestamp
}

Table articles {
  id integer [primary key]
  user_id integer 
  team_id integer
  name varchar
  description text
  created_at timestamp
  updated_at timestamp
}

Table comments {
  id integer [primary key]
  user_id integer
  article_id integer
  content text
  approved_at timestamp
  created_at timestamp
  updated_at timestamp
}

Table tags {
  id integer [primary key]
  slug varchar
  name json
}

Table article_tag {
  article_id integer
  tag_id integer
}


Ref: "articles"."id" < "comments"."article_id"

Ref: "users"."id" < "comments"."user_id"

Ref: "users"."id" < "articles"."user_id"

Ref: "articles"."id" < "article_tag"."article_id"

Ref: "tags"."id" < "article_tag"."tag_id"