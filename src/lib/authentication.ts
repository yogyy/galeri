"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { user } from "@/db/schema"
import { eq } from "drizzle-orm"
import { generateId } from "lucia"
import { Argon2id } from "oslo/password"

import { lucia, validateRequest } from "@/lib/lucia-auth"

import { authentication } from "./validation"

export async function login(username: string, password: string) {
  const { success } = authentication.safeParse({ username, password })

  if (!success) return { error: "Validation Error" }

  const [existingUser] = await db
    .select()
    .from(user)
    .where(eq(user.username, username))

  if (!existingUser) {
    return {
      error: "user not found",
    }
  }

  const validPassword = await new Argon2id().verify(
    existingUser.password,
    password
  )
  if (!validPassword) {
    return {
      error: "Incorrect username or password",
    }
  }

  const session = await lucia.createSession(existingUser.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )
  return redirect("/manage")
}

export async function register(username: string, password: string) {
  const { success } = authentication.safeParse({ username, password })

  if (!success) return { error: "Validation Error" }

  const hashedPassword = await new Argon2id().hash(password)
  const userId = generateId(15)

  // TODO: check if username is already used

  await db
    .insert(user)
    .values({
      id: userId,
      username: username,
      password: hashedPassword,
      role: "user",
    })
    .returning()

  const session = await lucia.createSession(userId, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )
  return redirect("/signin")
}

export async function logout() {
  const { session } = await validateRequest()
  if (!session) {
    return {
      error: "Unauthorized",
    }
  }

  await lucia.invalidateSession(session.id)

  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )
  return redirect("/")
}
