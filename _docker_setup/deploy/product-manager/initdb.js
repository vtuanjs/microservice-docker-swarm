db.createUser({
  user: "user",
  pwd: "1122asxcwaaaa",
  roles: [
    { role: "readWrite", db: "product" }
  ]
})