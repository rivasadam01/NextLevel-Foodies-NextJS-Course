"use server"
import { saveMeal } from "./meals"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

function isInvalidInput(text) {
  return !text || text.trim() === ""
}

export async function shareMeal(prevState, formData) {
  const meal = {
    creator: formData.get("name"),
    creator_email: formData.get("email"),
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
  }
  if (
    isInvalidInput(meal.creator) ||
    isInvalidInput(meal.creator_email) ||
    isInvalidInput(meal.title) ||
    isInvalidInput(meal.summary) ||
    isInvalidInput(meal.instructions) ||
    !meal.creator_email.includes("@") ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return { message: "Invalid input", status: 422 }
  }
  await saveMeal(meal)
  revalidatePath("/meals", "layout")
  redirect("/meals")
}
