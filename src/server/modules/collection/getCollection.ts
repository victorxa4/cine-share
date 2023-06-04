import { prisma } from 'core/prisma';
import { ResponsesGetCollectionUseCase } from 'types/server/collection';

export async function getCollectionUseCase(
  collectionId: string,
): Promise<ResponsesGetCollectionUseCase | null> {
  const collectionFound = await prisma.collection.findFirst({
    where: {
      id: collectionId,
    },
    select: {
      _count: {
        select: {
          media: true,
        },
      },
      id: true,
      name: true,
      description: true,
      user: {
        select: {
          name: true,
          id: true,
        },
      },
      media: {
        select: {
          id: true,
          tmdb_id: true,
          collectionId: true,
        },
      },
    },
  });

  return collectionFound;
}
