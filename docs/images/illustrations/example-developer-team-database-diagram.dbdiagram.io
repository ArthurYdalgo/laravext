// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table users {
  id integer [primary key]
  name integer 
  privacy boolean
  theme varchar
  locale varchar
  created_at timestamp
  updated_at timestamp
}

Table developers {
  id integer [primary key]
  team_id integer 
  username varchar
  email varchar
  name varchar
  role varchar
  created_at timestamp
  updated_at timestamp
}

Table projects {
  id integer [primary key]
  company_id integer 
  team_id integer
  name varchar
  description text
  created_at timestamp
  updated_at timestamp
}

Table companies {
  id integer [primary key]
  name varchar
  email varchar
  created_at timestamp
  updated_at timestamp
}

Table teams {
  id integer [primary key]
  name varchar
  created_at timestamp
  updated_at timestamp
}

Table comments {
  id integer [primary key]
  user_id integer
  project_id integer
  content text
  created_at timestamp
  updated_at timestamp
}

Table contact_requests {
  id integer [primary key]
  replier_id integer
  name varchar
  email varchar
  message text
  reply text
  replied_at text
  created_at timestamp
  updated_at timestamp
}

Ref: "companies"."id" < "projects"."company_id"

Ref: "teams"."id" < "developers"."team_id"

Ref: "teams"."id" < "projects"."team_id"

Ref: "projects"."id" < "comments"."project_id"

Ref: "users"."id" < "comments"."user_id"

Ref: "users"."id" < "contact_requests"."replier_id"