sequelize_blog_lab
------------------

- git clone git@github.com:wdi-sf-fall/sequelize_blog_lab.git
- npm init
- npm install --save express ejs sequelize sequelize-cli pg
- sqlize init
- sqlize help
- sqlize help:model:create
- sqlize model:create --name Author --attributes name:string
- sqlize model:create --name Post --attributes title:string,content:text,AuthorId:integer
- sqlize db:migrate
- db.Author.hasMany(db.Post)
- db.Post.belongsTo(db.Author)

sequelize_blog_lab_with_tags
----------------------------

- sqlize model:create --name Tag --attributes name:string
- Post.hasMany(models.Tag) & Tag.hasMany(models.Post)
- sqlize model:create --name PostsTags --attributes PostId:integer,TagId:integer
- form for creating new post submits tags
- /posts index page includes tags
- add a /tags/:id page
- add a /posts/:id page
