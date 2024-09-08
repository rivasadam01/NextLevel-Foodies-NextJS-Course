import sql from "better-sqlite3"
import slugify from "slugify"
import xss from "xss"
import { S3 } from "@aws-sdk/client-s3"

const s3 = new S3({
  region: "us-west-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

const db = sql("meals.db")

export async function getMeals() {
  const meals = db.prepare("SELECT * FROM meals").all()
  return meals
}

export function getMeal(slug) {
  const meal = db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug)
  return meal
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true, strict: true })
  meal.instructions = xss(meal.instructions)

  const extension = meal.image.name.split(".").pop()
  const filename = `${meal.slug}.${extension}`
  const buffer = await meal.image.arrayBuffer()

  s3.putObject({
    Bucket: "nextlevel-foodies-course",
    Key: filename,
    Body: Buffer.from(buffer),
    ContentType: meal.image.type,
  })

  meal.image = filename
  const stmt = db.prepare(
    "INSERT INTO meals (creator, creator_email, title, summary, instructions, image, slug) VALUES (?, ?, ?, ?, ?, ?, ?)"
  )
  stmt.run(
    meal.creator,
    meal.creator_email,
    meal.title,
    meal.summary,
    meal.instructions,
    meal.image,
    meal.slug
  )
}
