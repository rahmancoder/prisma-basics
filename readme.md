# Prisma ORM

It's can be comapare as a translator between Typescript or Javascript to Database language.
As JS/TS talks a different language than database language , Sometimes rather writing the raw
database SQL query rather we can use a translator like Prisma, which is known as Object Relational Mapping (ORM) to translate automatically for us. Like: Tables as Schema, Migrate those schema to database , then as a client do the query task like: Create, Read, Update, Delete. (CRUD). So Client will generate the Query from the CLient and will get response for that. Its becomes as easy as translator can help why not use the translator to do the task right?!

# Prisma Setup (Follow the documentation step by step)

1. Understand the Project Folder Structure 
2. Install all the Dev or local Dependency for the Prisma






# Prisma Model as previously known as Table in Raw SQL


## Database Schema (Prisma Models)

 It establishes a **One-to-Many (1:N)** relationship between a `User` and their `Post`.

```js
model User { 
  id    Int     @id @default(autoincrement()) 
  email String  @unique
  name  String?
  posts Post[]
} 

model Post { 
  id        Int     @id @default(autoincrement()) 
  title     String
  content   String?
  published Boolean @default(false) 
  author    User    @relation(fields: [authorId], references: [id]) 
  authorId  Int
}

```



# Prisma ORM Models: User & Post Relationship

This Prisma schema defines a **one-to-many relationship** between `User` and `Post`.

- One **User** can create many **Posts**
- Each **Post** belongs to exactly one **User**

---

## User Model

```prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}
```

### Fields Explanation

| Field | Type | Description |
|---------|---------|---------|
| `id` | `Int` | Primary Key |
| `@id` | Attribute | Marks `id` as the Primary Key |
| `@default(autoincrement())` | Attribute | Automatically generates incrementing IDs (1, 2, 3, ...) |
| `email` | `String` | User email |
| `@unique` | Attribute | No duplicate emails allowed |
| `name` | `String?` | Optional name (`?` means nullable) |
| `posts` | `Post[]` | One user can have multiple posts |

### Example User Record

```json
{
  "id": 1,
  "email": "john@example.com",
  "name": "John Doe"
}
```

---

## Post Model

```prisma
model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)

  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}
```

### Fields Explanation

| Field | Type | Description |
|---------|---------|---------|
| `id` | `Int` | Primary Key |
| `title` | `String` | Post title |
| `content` | `String?` | Optional content |
| `published` | `Boolean` | Published status |
| `@default(false)` | Attribute | New posts are unpublished by default |
| `author` | `User` | Relation field |
| `authorId` | `Int` | Foreign Key |
| `@relation()` | Attribute | Defines relationship with User |

---

## Understanding the Relation

```prisma
author User @relation(
  fields: [authorId],
  references: [id]
)

authorId Int
```

### What This Means

```text
Post.authorId
      │
      ▼
User.id
```

Prisma creates a foreign key relationship:

```sql
FOREIGN KEY (authorId)
REFERENCES User(id)
```

---

## Database Representation

### Users Table

| id | email | name |
|----|--------|--------|
| 1 | john@example.com | John |
| 2 | alice@example.com | Alice |

### Posts Table

| id | title | authorId |
|----|--------|----------|
| 1 | Prisma Basics | 1 |
| 2 | Node.js Guide | 1 |
| 3 | PostgreSQL Intro | 2 |

---

## Relationship Visualization

```text
User (1)
│
├── Post 1
├── Post 2
└── Post 3

One User
    ↓
Many Posts
```

Example:

```text
John
 ├── Prisma Basics
 ├── Node.js Guide
 └── Express Tutorial
```

---

## Creating a User

```ts
const user = await prisma.user.create({
  data: {
    email: "john@example.com",
    name: "John Doe"
  }
});
```

### Output

```json
{
  "id": 1,
  "email": "john@example.com",
  "name": "John Doe"
}
```

---

## Creating a Post

```ts
const post = await prisma.post.create({
  data: {
    title: "Prisma ORM Basics",
    content: "Learning Prisma Relations",
    authorId: 1
  }
});
```

### Output

```json
{
  "id": 1,
  "title": "Prisma ORM Basics",
  "content": "Learning Prisma Relations",
  "published": false,
  "authorId": 1
}
```

---

## Fetch User with Posts

```ts
const user = await prisma.user.findUnique({
  where: {
    id: 1
  },
  include: {
    posts: true
  }
});
```

### Output

```json
{
  "id": 1,
  "email": "john@example.com",
  "name": "John Doe",
  "posts": [
    {
      "id": 1,
      "title": "Prisma ORM Basics"
    },
    {
      "id": 2,
      "title": "Node.js Guide"
    }
  ]
}
```

---

## Fetch Post with Author

```ts
const post = await prisma.post.findUnique({
  where: {
    id: 1
  },
  include: {
    author: true
  }
});
```

### Output

```json
{
  "id": 1,
  "title": "Prisma ORM Basics",
  "author": {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

---

## SQL Equivalent

### User Table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255)
);
```

### Post Table

```sql
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  published BOOLEAN DEFAULT FALSE,
  authorId INT NOT NULL,

  FOREIGN KEY (authorId)
  REFERENCES users(id)
);
```

---

## Key Prisma Concepts Used

| Prisma Attribute | Purpose |
|------------------|----------|
| `@id` | Primary Key |
| `@default()` | Default value |
| `@unique` | Unique constraint |
| `?` | Nullable field |
| `[]` | Array / Many records |
| `@relation()` | Relationship definition |
| `references` | Referenced primary key |
| `fields` | Foreign key column |

---

## Summary

```text
User
 ├── id (Primary Key)
 ├── email (Unique)
 ├── name (Optional)
 └── posts (One-to-Many)

Post
 ├── id (Primary Key)
 ├── title
 ├── content (Optional)
 ├── published (Default: false)
 ├── authorId (Foreign Key)
 └── author (Belongs to User)
```

1. One User → Many Posts  
2. One Post → One User  
3. `authorId` acts as the Foreign Key  
4. Prisma automatically manages relational queries using `include` and `@relation`


