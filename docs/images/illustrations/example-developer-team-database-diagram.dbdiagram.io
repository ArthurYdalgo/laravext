// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table users {
  id integer [primary key]
  name integer 
  privacy boolean
  locale string
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

Ref: "companies"."id" < "projects"."company_id"

Ref: "teams"."id" < "developers"."team_id"

Ref: "teams"."id" < "projects"."team_id"