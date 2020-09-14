import db from "db"
import { SessionContext } from "blitz"

export default async function getProject(
  { slug }: { slug: string },
  ctx: { session?: SessionContext } = {}
) {
  ctx.session?.authorize()

  const project = await db.project.findOne({
    where: {
      ownerId_slug: {
        ownerId: ctx.session?.userId,
        slug,
      },
    },
    include: {
      tokens: {
        select: {
          name: true,
        },
        where: {
          isActive: true,
        },
      },
    },
  })
  if (!project?.isActive) {
    return null
  }

  return project
}
