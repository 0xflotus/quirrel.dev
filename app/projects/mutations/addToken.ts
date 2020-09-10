import { SessionContext } from "blitz"
import * as TokensRepo from "../tokens-repo"

export default async function addToken(
  { projectSlug, name }: { projectSlug: string; name: string },
  ctx: { session?: SessionContext } = {}
) {
  ctx.session?.authorize()

  return await TokensRepo.add(projectSlug, name, ctx.session?.userId)
}
